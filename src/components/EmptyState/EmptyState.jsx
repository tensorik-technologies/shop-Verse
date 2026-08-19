import { motion } from 'framer-motion';
import './EmptyState.css';

export default function EmptyState({ icon = '🔍', title, message, action }) {
  const isStringIcon = typeof icon === 'string';

  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isStringIcon && (
        <div className="empty-state__watermark" aria-hidden="true">
          {icon}
        </div>
      )}
      
      <div className="empty-state__content">
        <span className="empty-state__icon">{icon}</span>
        <h3 className="empty-state__title">{title}</h3>
        <p className="empty-state__message">{message}</p>
        {action && (
          <div className="empty-state__action">{action}</div>
        )}
      </div>
    </motion.div>
  );
}