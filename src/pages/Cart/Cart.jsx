import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import EmptyState from '../../components/EmptyState/EmptyState';
import './Cart.css';

export default function Cart() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const tax = cartTotal * 0.08;
  const shipping = 0;
  const total = cartTotal + tax + shipping;

  return (
    <motion.div
      className="cart-page container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="cart-page__header">
        <div>
          <h1 className="cart-page__title">Shopping Cart</h1>
          <p className="cart-page__subtitle">
            {cartCount === 0
              ? 'Your cart is empty'
              : `${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        {cartCount > 0 && (
          <button
            className="cart-page__clear-all"
            onClick={clearCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <motion.div
          className="cart-page__empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <EmptyState
            icon={
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </motion.svg>
            }
            title="Your cart is empty"
            message="Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!"
            action={
              <Link to="/" className="btn btn--primary btn--lg cart-page__shop-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Start Shopping
              </Link>
            }
          />
          
          <div className="cart-page__empty-features">
            <div className="cart-page__empty-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span>Free shipping on $50+</span>
            </div>
            <div className="cart-page__empty-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L24 16" />
              </svg>
              <span>30-day returns</span>
            </div>
            <div className="cart-page__empty-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h12M10 12h8M10 16h8" />
              </svg>
              <span>Secure checkout</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="cart-page__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="cart-page__items">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0, margin: 0, padding: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.aside
            className="cart-page__summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="cart-page__summary-title">Order Summary</h2>

            <div className="cart-page__summary-rows">
              <div className="cart-page__summary-row">
                <span>Subtotal ({cartCount} item{cartCount !== 1 ? 's' : ''})</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-page__summary-row">
                <span>Shipping</span>
                <span className="cart-page__free">
                  {shipping === 0 ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Free
                    </>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {cartTotal >= 50 && (
                <motion.div
                  className="cart-page__summary-row cart-page__summary-row--highlight"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Free shipping applied
                  </span>
                  <span className="cart-page__free">−$${shipping.toFixed(2)}</span>
                </motion.div>
              )}
              <div className="cart-page__summary-row">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-page__summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="cart-page__summary-actions">
              <button className="btn btn--primary btn--lg cart-page__checkout-btn" disabled={cart.length === 0}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h12M10 12h8M10 16h8" />
                </svg>
                Proceed to Checkout
              </button>

              <button
                className="btn btn--ghost cart-page__clear-btn"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Clear Cart
              </button>
            </div>

            <div className="cart-page__secure">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Secure checkout powered by Stripe</span>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </motion.div>
  );
}