import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import SearchBar from '../SearchBar/SearchBar';
import ScrollProgress from '../ScrollProgress/ScrollProgress';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cart', label: 'Cart' },
    { to: '/wishlist', label: 'Wishlist' },
  ];

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <ScrollProgress />
      
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo" aria-label="ShopVerse Home">
            <span className="navbar__logo-icon" aria-hidden="true">◆</span>
            <span className="navbar__logo-text">ShopVerse</span>
          </Link>

          <div className="navbar__center">
            <div className="navbar__desktop-links">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`navbar__link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={`navbar__search-wrapper ${searchOpen ? 'open' : ''}`}>
              <SearchBar ref={searchRef} onClose={handleSearchClose} />
            </div>
          </div>

          <div className="navbar__actions">
            <button
              className={`navbar__search-btn ${searchOpen ? 'active' : ''}`}
              onClick={handleSearchToggle}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <DarkModeToggle />

            <Link to="/wishlist" className="navbar__icon-btn" aria-label={`Wishlist${wishlist.length > 0 ? `, ${wishlist.length} items` : ''}`}>
              <span className="navbar__icon" aria-hidden="true">♡</span>
              {wishlist.length > 0 && (
                <motion.span
                  className="navbar__badge navbar__badge--wishlist"
                  key={wishlist.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {wishlist.length}
                </motion.span>
              )}
            </Link>

            <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
              <span className="navbar__icon" aria-hidden="true">🛒</span>
              {cartCount > 0 && (
                <motion.span
                  className="navbar__badge"
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <button
              className={`navbar__hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="navbar__search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSearchClose}
            role="button"
            tabIndex={-1}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="navbar__mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="navbar__mobile-header">
                <span className="navbar__logo-text">ShopVerse</span>
                <button
                  className="navbar__mobile-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div className="navbar__mobile-search">
                <SearchBar onClose={handleSearchClose} />
              </div>
              <div className="navbar__mobile-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className={`navbar__mobile-link ${location.pathname === link.to ? 'active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="navbar__mobile-footer">
                <DarkModeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}