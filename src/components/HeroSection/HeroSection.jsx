import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HeroSection.css';

export default function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg-layer" aria-hidden="true">
        <div className="hero__gradient-mesh">
          <div className="hero__mesh-blob hero__mesh-blob--1" />
          <div className="hero__mesh-blob hero__mesh-blob--2" />
          <div className="hero__mesh-blob hero__mesh-blob--3" />
        </div>
        <div className="hero__noise-overlay" />
        <div className="hero__grid-pattern" />
      </div>

      <div className="hero__content container">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            New Collection
          </span>
          <h1 id="hero-title" className="hero__title">
            Objects That <br />
            <span className="hero__highlight">Elevate</span> Space.
          </h1>
          <p className="hero__subtitle">
            Curated premium products designed with intention. Discover a collection of electronics, fashion, and home goods built to inspire.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary btn--lg hero__cta" onClick={scrollToProducts}>
              Shop Collection
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <Link to="/cart" className="btn btn--secondary btn--lg hero__cta">
              View Cart
            </Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">200+</span>
              <span className="hero__stat-label">Products</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">50+</span>
              <span className="hero__stat-label">Brands</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">4.8★</span>
              <span className="hero__stat-label">Avg Rating</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">Free</span>
              <span className="hero__stat-label">Shipping</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__collage">
            <div className="hero__collage-item hero__collage-item--1">
              <img 
                src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" 
                alt="Sony WH-1000XM5 Headphones"
                loading="eager"
              />
              <div className="hero__collage-badge hero__collage-badge--top">
                <span>★ 4.8</span>
              </div>
            </div>
            <div className="hero__collage-item hero__collage-item--2">
              <img 
                src="https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" 
                alt="Keychron Q1 Pro Keyboard"
                loading="lazy"
              />
              <div className="hero__collage-badge hero__collage-badge--corner">
                <span>Best Seller</span>
              </div>
            </div>
            <div className="hero__collage-item hero__collage-item--3">
              <img 
                src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80" 
                alt="Logitech MX Master 3S Mouse"
                loading="lazy"
              />
            </div>
            <div className="hero__collage-item hero__collage-item--4">
              <img 
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80" 
                alt="MacBook Pro 14 M3"
                loading="lazy"
              />
              <div className="hero__collage-badge hero__collage-badge--corner hero__collage-badge--new">
                <span>New</span>
              </div>
            </div>
          </div>
          <div className="hero__floating-elements" aria-hidden="true">
            <motion.div className="hero__float-item hero__float-item--1" animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </motion.div>
            <motion.div className="hero__float-item hero__float-item--2" animate={{ y: [10, -10, 10], x: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </motion.div>
            <motion.div className="hero__float-item hero__float-item--3" animate={{ y: [-15, 15, -15], x: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.div>
            <motion.div className="hero__float-item hero__float-item--4" animate={{ y: [10, -10, 10] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ y: 4 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}