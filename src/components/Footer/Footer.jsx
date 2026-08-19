import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import './Footer.css';

const SOCIAL_LINKS = [
  { name: 'Twitter', href: 'https://twitter.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
  )},
  { name: 'Instagram', href: 'https://instagram.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { name: 'GitHub', href: 'https://github.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
  )},
  { name: 'Discord', href: 'https://discord.com', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.38-.428.764-.643 1.15a18.27 18.27 0 0 0-5.423 0 12.64 12.64 0 0 0-.644-1.15.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 4.885 1.515.078.078 0 0 0 .079-.037c.21-.38.428-.764.643-1.15a18.37 18.37 0 0 0 2.697-4.921.077.077 0 0 1 .126-.018 13.107 13.107 0 0 0 .326.133c.226.092.453.184.68.275a.075.075 0 0 0 .079.008c.262-.12.517-.248.764-.373a13.063 13.063 0 0 0 .326-.133.077.077 0 0 1 .127.018 18.34 18.34 0 0 0 2.697 4.921.077.077 0 0 0 .079.037c.214.385.432.769.644 1.15a19.8 19.8 0 0 0 4.885 1.515.074.074 0 0 0 .079-.037.074.074 0 0 0 .03-.057c.418-4.477-1.49-8.983-4.67-13.62a.061.061 0 0 0-.031-.027zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418z"/></svg>
  )},
];

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Products', href: '/' },
    { label: 'Electronics', href: '/?category=electronics' },
    { label: 'Clothing', href: '/?category=clothing' },
    { label: 'Home & Kitchen', href: '/?category=home-kitchen' },
    { label: 'Sports', href: '/?category=sports' },
    { label: 'Books', href: '/?category=books' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Affiliates', href: '/affiliates' },
  ],
  Support: [
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Order Tracking', href: '/tracking' },
  ],
  Account: [
    { label: 'My Account', href: '/account' },
    { label: 'Cart', href: '/cart' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Order History', href: '/orders' },
    { label: 'Settings', href: '/settings' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && !submitted) {
      setSubmitted(true);
      addToast('Thanks for subscribing!', 'success');
      setEmail('');
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__bg-pattern" aria-hidden="true" />
      
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__brand-section">
            <Link to="/" className="footer__logo" aria-label="ShopVerse Home">
              <span className="footer__logo-icon" aria-hidden="true">◆</span>
              <span className="footer__logo-text">ShopVerse</span>
            </Link>
            <p className="footer__tagline">Curated premium products designed with intention. Discover objects that elevate your space.</p>
            
            <div className="footer__social" role="list" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  role="listitem"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="footer__col">
                <h4 className="footer__col-title">{title}</h4>
                <ul className="footer__link-list" role="list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="footer__link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="footer__newsletter-section">
            <h4 className="footer__col-title">Stay Updated</h4>
            <p className="footer__newsletter-desc">Get the latest arrivals, sales, and exclusive offers delivered to your inbox.</p>
            
            <form className="footer__newsletter-form" onSubmit={handleSubmit} noValidate>
              <div className="footer__newsletter-input-wrapper">
                <input
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitted}
                  aria-label="Email address"
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="footer__newsletter-btn"
                  disabled={!email || submitted}
                  aria-label={submitted ? 'Subscribed!' : 'Subscribe'}
                >
                  {submitted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="footer__newsletter-note">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        <div className="footer__divider" role="separator" />

        <div className="footer__bottom">
          <p className="footer__copyright">© {new Date().getFullYear()} ShopVerse. Built with React & Framer Motion.</p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
            <Link to="/cookies" className="footer__legal-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}