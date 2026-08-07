import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border-color)', marginTop: '4rem', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="grid grid-cols-4 gap-8" style={{ marginBottom: '3rem' }}>
          
          {/* Brand & About */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                ShopSphere
              </span>
            </Link>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Your ultimate destination for premium quality products. We offer the best deals and the highest quality items for your everyday needs.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--text-muted)' }} className="social-link"><Facebook size={20} /></a>
              <a href="#" style={{ color: 'var(--text-muted)' }} className="social-link"><Twitter size={20} /></a>
              <a href="#" style={{ color: 'var(--text-muted)' }} className="social-link"><Instagram size={20} /></a>
              <a href="#" style={{ color: 'var(--text-muted)' }} className="social-link"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/shop" className="footer-link">Shop</Link></li>
              <li><Link to="/categories" className="footer-link">Categories</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Customer Service</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/profile" className="footer-link">My Account</Link></li>
              <li><Link to="/orders" className="footer-link">Track Order</Link></li>
              <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
              <li><Link to="/returns" className="footer-link">Returns Policy</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact Info</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <MapPin size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>123 Commerce Avenue, NY 10001, United States</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Phone size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>+1 (800) 123-4567</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Mail size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>support@shopsphere.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} className="footer-bottom">
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>💳</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>🏦</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>💸</span>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .footer-link { color: var(--text-muted); transition: color 0.2s; font-size: 0.95rem; }
          .footer-link:hover { color: var(--primary); }
          .social-link:hover { color: var(--primary) !important; }
          @media(min-width: 768px) {
            .footer-bottom { flexDirection: row; }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
