import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { getSiteSettings } from '../api/client';

// Global context so all pages can access site settings
const SettingsContext = createContext({});
export const useSettings = () => useContext(SettingsContext);

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path ? 'active' : '';

  useEffect(() => {
    getSiteSettings().then(r => setSettings(r.data)).catch(() => {});
  }, []);

  // Defaults while loading
  const s = settings || {
    company_name: 'PANAS Pharmaceutical',
    company_short: 'PANAS Pharma',
    tagline: 'Lighting the lamp for living a healthy life',
    announcement_text: 'Welcome to Panas Pharmaceuticals',
    phone_primary: '(977) 81-403004',
    phone_secondary: '081-523668',
    email: 'info@panaspharma.com',
    address_line1: 'Janaki-6, Ganapur',
    address_line2: 'Banke, Nepal',
    copyright_text: 'Copyright 2006-2026 Panas Pharmaceuticals P. Ltd. All Rights Reserved.',
    fiscal_year: '2081/82',
    google_maps_url: 'https://maps.google.com/?q=Banke,Nepal',
  };

  return (
    <SettingsContext.Provider value={s}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span className="ticker">{s.announcement_text}</span>
      </div>

      {/* Header */}
      <header>
        <Link to="/" className="logo-area">
          <div className="logo-badge">P</div>
          <div className="logo-text">
            <h1>{s.company_short}</h1>
            <p>P. Ltd. — Est. {s.established_year || 1995} · Banke, Nepal</p>
          </div>
        </Link>
        <div className="header-right">
          <div className="header-contact">
            <span>📞 Head Office</span>
            <a href={`tel:${s.phone_primary}`}>{s.phone_primary}</a>
          </div>
          <div className="header-contact">
            <span>✉ Email Us</span>
            <a href={`mailto:${s.email}`}>{s.email}</a>
          </div>
          <Link to="/contact" className="btn btn-primary btn-sm">Get in Touch</Link>
        </div>
      </header>

      {/* Navigation */}
      <nav>
        <div className="nav-inner">
          <ul id="main-nav" className={menuOpen ? 'open' : ''}>
            <li><Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/randd" className={isActive('/randd')} onClick={() => setMenuOpen(false)}>R &amp; D</Link></li>
            <li><Link to="/products" className={isActive('/products')} onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link to="/gallery" className={isActive('/gallery')} onClick={() => setMenuOpen(false)}>Gallery</Link></li>
            <li><Link to="/contact" className={isActive('/contact')} onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/careers" className="nav-cta" onClick={() => setMenuOpen(false)}>Careers 🌟</Link></li>
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>{s.company_name}</h3>
              <div className="tagline">"{s.tagline}"</div>
              <p>{s.company_name} P. Ltd. is a leading pharmaceutical manufacturer based in {s.address_line2}, delivering quality healthcare products since {s.established_year || 1995}.</p>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/about">Mission &amp; Vision</Link></li>
                <li><Link to="/randd">R &amp; D</Link></li>
                <li><Link to="/gallery">Photo Gallery</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Products</h4>
              <ul>
                <li><Link to="/products?div=kalash">Kalash Division</Link></li>
                <li><Link to="/products?div=nuzen">nuZEN Division</Link></li>
                <li><Link to="/products?div=spandan">Spandan Division</Link></li>
                <li><Link to="/products?div=general">General Division</Link></li>
                <li><Link to="/products">Full Catalogue</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <div className="footer-contact-item"><span className="icon">📍</span><span>{s.address_line1},<br />{s.address_line2}</span></div>
              <div className="footer-contact-item"><span className="icon">📞</span><span>{s.phone_primary}<br />{s.phone_secondary}</span></div>
              <div className="footer-contact-item"><span className="icon">✉</span><span>{s.email}</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{s.copyright_text}</span>
            <span>Designed &amp; Maintained by <a href="#">IT Department</a> · Fiscal Year {s.fiscal_year}</span>
          </div>
        </div>
      </footer>
    </SettingsContext.Provider>
  );
}
