import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import EmptyState from '../EmptyState/EmptyState';
import './ProductGrid.css';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <motion.div
        className="product-grid__empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <EmptyState
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
          title="No products found"
          message="Try adjusting your search or filters to find what you're looking for."
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="product-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => {
          const isSpotlight = false;
          return (
            <ProductCard
              key={product.id}
              product={product}
              isSpotlight={isSpotlight}
              index={index}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}