import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import productsData from '../../data/products.json';
import ProductCard from '../../components/ProductCard/ProductCard';
import StarRating from '../../components/StarRating/StarRating';
import './ProductDetails.css';

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const product = productsData.find((p) => p.id === parseInt(id));
  const galleryImages = [...new Set([product?.image, ...PLACEHOLDER_IMAGES.slice(0, 3)])].filter(Boolean);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setImageLoaded(false);
    setSelectedImage(0);
  }, [id]);

  if (!product) {
    return (
      <motion.div
        className="product-details-page container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="product-details__not-found">
          <motion.div
            className="product-details__not-found-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </motion.div>
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn--primary product-details__back-btn">
            ← Back to Shop
          </Link>
        </div>
      </motion.div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const inStock = product.stock > 0;
  const categoryClass = product.category.toLowerCase().replace(/ & | /g, '-');

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    addToast(`${quantity}x ${product.name} added to cart!`, 'success');
    setTimeout(() => setIsAdding(false), 600);
  };

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const renderStars = (rating) => <StarRating rating={rating} size="lg" />;

  return (
    <motion.div
      className="product-details-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <motion.button
          className="product-details__back"
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Back to previous page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back</span>
        </motion.button>

        <div className="product-details">
          <motion.div
            className="product-details__image-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="product-details__gallery">
              <div className="product-details__main-image-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    className="product-details__main-image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {!imageLoaded && selectedImage === 0 && (
                      <div className="product-details__image-skeleton" />
                    )}
                    <img
                      src={galleryImages[selectedImage]}
                      alt={`${product.name} - View ${selectedImage + 1}`}
                      className={`product-details__image ${imageLoaded ? 'loaded' : ''}`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {product.badge && (
                      <span className={`product-details__badge product-details__badge--${product.badge.toLowerCase().replace(' ', '-')}`}>
                        {product.badge}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>

                {galleryImages.length > 1 && (
                  <motion.button
                    className="product-details__zoom-btn"
                    onClick={() => setShowLightbox(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View fullscreen"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </motion.button>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="product-details__thumbnails" role="list" aria-label="Product images">
                  {galleryImages.map((img, index) => (
                    <motion.button
                      key={img}
                      className={`product-details__thumbnail ${index === selectedImage ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`View image ${index + 1}`}
                      aria-current={index === selectedImage ? 'true' : 'false'}
                      role="listitem"
                    >
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="product-details__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="product-details__category">{product.category}</span>
            <h1 className="product-details__name">{product.name}</h1>

            <div className="product-details__rating">
              <div className="product-details__stars">{renderStars(product.rating)}</div>
              <span className="product-details__rating-text">
                {product.rating} / 5.0
              </span>
            </div>

            <p className="product-details__price">${product.price.toFixed(2)}</p>

            <div className="product-details__description-block">
              <h3 className="product-details__desc-title">Description</h3>
              <p className="product-details__description">{product.description}</p>
            </div>

            <div className="product-details__stock">
              <span className={`product-details__stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    In Stock ({product.stock} left)
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Out of Stock
                  </>
                )}
              </span>
            </div>

            <div className="product-details__features">
              <h3 className="product-details__features-title">Features</h3>
              <ul className="product-details__features-list">
                <li>Premium quality materials</li>
                <li>Designed for durability</li>
                <li>Eco-friendly packaging</li>
                <li>Free shipping on orders $50+</li>
                <li>30-day return policy</li>
              </ul>
            </div>

            <div className="product-details__actions">
              <div className="product-details__quantity">
                <motion.button
                  className="product-details__qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!inStock || quantity <= 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Decrease quantity"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.button>
                <span className="product-details__qty-value" aria-live="polite">{quantity}</span>
                <motion.button
                  className="product-details__qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={!inStock || quantity >= product.stock}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Increase quantity"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.button>
              </div>

              <motion.button
                className={`btn btn--primary btn--lg product-details__add-btn ${inCart ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                whileHover={inStock && !isAdding ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
                disabled={!inStock}
                style={{ minWidth: '200px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {!inStock ? 'Out of Stock' : inCart ? 'Add More to Cart' : 'Add to Cart'}
              </motion.button>

              <motion.button
                className={`product-details__wishlist-btn ${wishlisted ? 'active' : ''}`}
                onClick={() => {
                  toggleWishlist(product);
                  addToast(
                    wishlisted ? 'Removed from wishlist' : 'Added to wishlist!',
                    wishlisted ? 'info' : 'success'
                  );
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wishlisted}
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
            </div>

            <div className="product-details__meta">
              <div className="product-details__meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>Free shipping on orders $50+</span>
              </div>
              <div className="product-details__meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L24 16" />
                </svg>
                <span>30-day easy returns</span>
              </div>
              <div className="product-details__meta-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h12M10 12h8M10 16h8" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <motion.section
            className="product-details__related"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-details__related-header">
              <h2 className="product-details__related-title">You May Also Like</h2>
              <Link to={`/?category=${categoryClass}`} className="product-details__view-all">
                View all {product.category} →
              </Link>
            </div>
            <div className="product-details__related-grid">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              className="product-details__lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowLightbox(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Image gallery"
            >
              <motion.div
                className="product-details__lightbox-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="product-details__lightbox-close"
                  onClick={() => setShowLightbox(false)}
                  aria-label="Close lightbox"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
                <motion.button
                  className="product-details__lightbox-nav product-details__lightbox-nav--prev"
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  aria-label="Previous image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </motion.button>
                <img
                  src={galleryImages[selectedImage]}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  className="product-details__lightbox-image"
                />
                <motion.button
                  className="product-details__lightbox-nav product-details__lightbox-nav--next"
                  onClick={() => setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  aria-label="Next image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </motion.button>
                <div className="product-details__lightbox-counter">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}