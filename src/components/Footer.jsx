import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Brand Column */}
          <div style={columnStyle}>
            <Link to="/" style={logoStyle}>
              <span style={{ color: '#3b82f6' }}>Shop</span>Sphere
            </Link>
            <p style={descStyle}>
              Discover products you'll love. ShopSphere brings you the highest quality items from around the world straight to your doorstep.
            </p>
            <div style={socialStyle}>
              <a href="#" style={socialIconStyle}><Facebook size={20} /></a>
              <a href="#" style={socialIconStyle}><Twitter size={20} /></a>
              <a href="#" style={socialIconStyle}><Instagram size={20} /></a>
              <a href="#" style={socialIconStyle}><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div style={columnStyle}>
            <h3 style={headingStyle}>Quick Links</h3>
            <div style={linkListStyle}>
              <Link to="/" style={linkStyle}>Home</Link>
              <Link to="/shop" style={linkStyle}>Shop</Link>
              <Link to="/about" style={linkStyle}>About Us</Link>
              <Link to="/contact" style={linkStyle}>Contact Us</Link>
            </div>
          </div>

          {/* Categories Column */}
          <div style={columnStyle}>
            <h3 style={headingStyle}>Categories</h3>
            <div style={linkListStyle}>
              <Link to="/shop?category=Electronics" style={linkStyle}>Electronics</Link>
              <Link to="/shop?category=Fashion" style={linkStyle}>Fashion</Link>
              <Link to="/shop?category=Shoes" style={linkStyle}>Shoes</Link>
              <Link to="/shop?category=Home & Living" style={linkStyle}>Home & Living</Link>
            </div>
          </div>

          {/* Contact Column */}
          <div style={columnStyle}>
            <h3 style={headingStyle}>Contact Us</h3>
            <div style={contactListStyle}>
              <div style={contactItemStyle}>
                <MapPin size={18} style={contactIconStyle} />
                <span>123 Commerce Avenue, NY 10012, United States</span>
              </div>
              <div style={contactItemStyle}>
                <Phone size={18} style={contactIconStyle} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div style={contactItemStyle}>
                <Mail size={18} style={contactIconStyle} />
                <span>support@shopsphere.com</span>
              </div>
            </div>
            
            <h4 style={{ ...headingStyle, marginTop: '20px', fontSize: '14px' }}>Newsletter</h4>
            <form style={newsletterFormStyle} onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
              <input type="email" placeholder="Your email address" style={newsletterInputStyle} required />
              <button type="submit" style={newsletterBtnStyle}>Subscribe</button>
            </form>
          </div>
        </div>
        
        <div style={bottomStyle}>
          <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved. Demo E-Commerce Frontend.</p>
          <div style={paymentIconsStyle}>
            {/* Dummy Payment Icons */}
            <span style={paymentBadgeStyle}>Visa</span>
            <span style={paymentBadgeStyle}>Mastercard</span>
            <span style={paymentBadgeStyle}>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Styles
const footerStyle = { backgroundColor: '#0f172a', color: '#f8fafc', paddingTop: '60px' };
const containerStyle = { maxWidth: '1400px', margin: '0 auto', padding: '0 20px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', paddingBottom: '40px' };
const columnStyle = { display: 'flex', flexDirection: 'column' };

const logoStyle = { fontSize: '28px', fontWeight: '800', color: 'white', textDecoration: 'none', letterSpacing: '-0.5px', marginBottom: '20px', display: 'inline-block' };
const descStyle = { color: '#94a3b8', lineHeight: '1.6', marginBottom: '20px', fontSize: '15px' };
const socialStyle = { display: 'flex', gap: '15px' };
const socialIconStyle = { color: 'white', backgroundColor: '#1e293b', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background-color 0.2s', textDecoration: 'none' };

const headingStyle = { fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' };
const linkListStyle = { display: 'flex', flexDirection: 'column', gap: '12px' };
const linkStyle = { color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', fontSize: '15px' };

const contactListStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const contactItemStyle = { display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' };
const contactIconStyle = { color: '#3b82f6', flexShrink: 0, marginTop: '2px' };

const newsletterFormStyle = { display: 'flex', width: '100%', maxWidth: '100%', borderRadius: '6px', overflow: 'hidden' };
const newsletterInputStyle = { flex: 1, padding: '10px 12px', border: 'none', outline: 'none', fontSize: '14px' };
const newsletterBtnStyle = { padding: '10px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };

const bottomStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #1e293b', color: '#64748b', fontSize: '14px', flexWrap: 'wrap', gap: '15px' };
const paymentIconsStyle = { display: 'flex', gap: '10px' };
const paymentBadgeStyle = { backgroundColor: '#1e293b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' };

export default Footer;
