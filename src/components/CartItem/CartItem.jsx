import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      className="cart-item"
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="cart-item__image-wrapper">
        <img src={item.image} alt={item.name} className="cart-item__image" />
      </div>

      <div className="cart-item__details">
        <h3 className="cart-item__name">{item.name}</h3>
        <span className="cart-item__category">{item.category}</span>
        <span className="cart-item__price">${item.price.toFixed(2)}</span>
      </div>

      <div className="cart-item__controls">
        <div className="cart-item__quantity">
          <button
            className="cart-item__qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="cart-item__qty-value">{item.quantity}</span>
          <button
            className="cart-item__qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="cart-item__subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      <button
        className="cart-item__remove"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        ✕
      </button>
    </motion.div>
  );
}
