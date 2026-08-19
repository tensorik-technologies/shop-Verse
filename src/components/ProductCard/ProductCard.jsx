import { memo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import StarRating from '../StarRating/StarRating';
import './ProductCard.css';

function ProductCard({ product, isSpotlight = false, index = 0 }) {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const handleNavigate = (e) => {
    // Don't navigate if clicking on interactive elements
    if (e.target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    const card = cardRef.current;
    const image = card?.querySelector('.product-card__image');
    const cartIcon = document.querySelector('.navbar__cart-btn');

    if (image && cartIcon) {
      const imgRect = image.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      
      const clone = image.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.top = `${imgRect.top}px`;
      clone.style.left = `${imgRect.left}px`;
      clone.style.width = `${imgRect.width}px`;
      clone.style.height = `${imgRect.height}px`;
      clone.style.borderRadius = 'var(--radius-lg)';
      clone.style.zIndex = '9999';
      clone.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      clone.style.pointerEvents = 'none';
      clone.style.boxShadow = 'var(--shadow-xl)';
      
      document.body.appendChild(clone);
      
      requestAnimationFrame(() => {
        clone.style.top = `${cartRect.top + 10}px`;
        clone.style.left = `${cartRect.left + 10}px`;
        clone.style.width = '20px';
        clone.style.height = '20px';
        clone.style.opacity = '0.2';
        clone.style.borderRadius = '50%';
      });
      
      setTimeout(() => {
        clone.remove();
        cartIcon.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.25)' },
          { transform: 'scale(1)' }
        ], { duration: 400, easing: 'ease-out' });
      }, 600);
    }

    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      wishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist!`,
      wishlisted ? 'info' : 'success'
    );
  };

  const renderStars = (rating) => {
    return <StarRating rating={rating} />;
  };

  const categoryClass = product.category.toLowerCase().replace(/ & | /g, '-');

  return (
    <motion.div
      ref={cardRef}
      className={`product-card ${isSpotlight ? 'product-card--spotlight' : ''} ${hovered ? 'product-card--hovered' : ''}`}
      data-category={categoryClass}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.04,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNavigate}
      style={{ willChange: 'transform, box-shadow', cursor: 'pointer' }}
      role="article"
      aria-label={`View ${product.name}`}
    >
      <div className="product-card__image-wrapper">
        <AnimatePresence mode="wait">
          {!imageLoaded && (
            <motion.div
              className="product-card__image-placeholder"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <motion.img
          src={product.image}
          alt={product.name}
          className={`product-card__image ${imageLoaded ? 'loaded' : ''}`}
          loading={index < 4 ? 'eager' : 'lazy'}
          onLoad={() => setImageLoaded(true)}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'center center', pointerEvents: 'none' }}
        />
        {product.badge && (
          <motion.span
            className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ', '-')}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.3 }}
          >
            {product.badge}
          </motion.span>
        )}
        <motion.button
          className={`product-card__wishlist ${wishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wishlisted ? 'filled' : 'empty'}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              {wishlisted ? '❤️' : '🤍'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="product-card__quick-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span>Quick View</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="product-card__body">
        <motion.span
          className="product-card__category"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {product.category}
        </motion.span>
        <motion.h3
          className="product-card__name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {product.name}
        </motion.h3>
        <motion.div
          className="product-card__rating"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="product-card__stars">{renderStars(product.rating)}</div>
          <span className="product-card__rating-value">{product.rating}</span>
        </motion.div>
        <motion.div
          className="product-card__footer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <motion.button
            className={`product-card__cart-btn ${inCart ? 'in-cart' : ''} ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            whileHover={!isAdding && !inCart && product.stock > 0 ? { scale: 1.02 } : {}}
            whileTap={{ scale: 0.96 }}
            disabled={product.stock === 0 || isAdding}
            aria-label={
              product.stock === 0
                ? `${product.name} is out of stock`
                : isAdding
                  ? 'Adding to cart...'
                  : inCart
                    ? `Add more ${product.name} to cart`
                    : `Add ${product.name} to cart`
            }
          >
            {product.stock === 0
              ? 'Out of Stock'
              : isAdding
                ? <span><span aria-hidden="true">✓</span> Added!</span>
                : inCart
                  ? 'Add More'
                  : <span className="btn-text">Add to Cart</span>}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default memo(ProductCard);