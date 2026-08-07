import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Announcement Bar */}
      <div style={announcementStyle}>
        <span>Free standard shipping on all orders over $100!</span>
      </div>

      {/* Sticky Navbar */}
      <nav style={navbarStyle}>
        <div style={navContainerStyle}>
          {/* Logo */}
          <Link to="/" style={logoStyle} onClick={closeMobileMenu}>
            <span style={{ color: '#3b82f6' }}>Shop</span>Sphere
          </Link>

          {/* Desktop Search */}
          <div style={desktopSearchContainerStyle}>
            <form onSubmit={handleSearch} style={searchFormStyle}>
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
              <button type="submit" style={searchBtnStyle}>
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Links */}
          <div style={desktopLinksStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/shop" style={linkStyle}>Shop</Link>
            <Link to="/categories" style={linkStyle}>Categories</Link>
            <Link to="/about" style={linkStyle}>About</Link>
          </div>

          {/* Icons */}
          <div style={iconContainerStyle}>
            <Link to="/wishlist" style={iconLinkStyle}>
              <Heart size={24} />
              {wishlistCount > 0 && <span style={badgeStyle}>{wishlistCount}</span>}
            </Link>
            <Link to="/cart" style={iconLinkStyle}>
              <ShoppingCart size={24} />
              {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
            </Link>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {isAuthenticated ? (
                <Link to="/account" style={iconLinkStyle}>
                  <User size={24} />
                </Link>
              ) : (
                <Link to="/login" style={iconLinkStyle}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>Login</span>
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              style={mobileMenuBtnStyle} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={mobileMenuDropdownStyle}>
            <form onSubmit={handleSearch} style={{...searchFormStyle, margin: '20px', width: 'auto'}}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
              <button type="submit" style={searchBtnStyle}>
                <Search size={18} />
              </button>
            </form>
            <div style={mobileLinksContainerStyle}>
              <Link to="/" style={mobileLinkStyle} onClick={closeMobileMenu}>Home</Link>
              <Link to="/shop" style={mobileLinkStyle} onClick={closeMobileMenu}>Shop</Link>
              <Link to="/categories" style={mobileLinkStyle} onClick={closeMobileMenu}>Categories</Link>
              <Link to="/about" style={mobileLinkStyle} onClick={closeMobileMenu}>About</Link>
              <Link to="/contact" style={mobileLinkStyle} onClick={closeMobileMenu}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// Styles
const announcementStyle = { backgroundColor: '#0f172a', color: 'white', textAlign: 'center', padding: '8px', fontSize: '14px', fontWeight: '500' };
const navbarStyle = { position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0' };
const navContainerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', maxWidth: '1400px', margin: '0 auto' };
const logoStyle = { fontSize: '24px', fontWeight: '800', color: '#0f172a', textDecoration: 'none', letterSpacing: '-0.5px' };

const desktopSearchContainerStyle = { flex: '1', maxWidth: '400px', margin: '0 20px', display: 'none' }; // Hidden on small screens, should use media query in real CSS
const searchFormStyle = { display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' };
const searchInputStyle = { flex: '1', padding: '10px 15px', border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '14px' };
const searchBtnStyle = { padding: '10px 15px', border: 'none', backgroundColor: 'transparent', color: '#64748b', cursor: 'pointer' };

const desktopLinksStyle = { display: 'flex', gap: '30px', alignItems: 'center' }; // Should use media query to hide on mobile
const linkStyle = { textDecoration: 'none', color: '#475569', fontWeight: '600', fontSize: '15px', transition: 'color 0.2s' };

const iconContainerStyle = { display: 'flex', alignItems: 'center', gap: '20px' };
const iconLinkStyle = { position: 'relative', color: '#0f172a', textDecoration: 'none', display: 'flex', alignItems: 'center' };
const badgeStyle = { position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '10px' };

const mobileMenuBtnStyle = { background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const mobileMenuDropdownStyle = { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', paddingBottom: '20px' };
const mobileLinksContainerStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const mobileLinkStyle = { textDecoration: 'none', color: '#0f172a', fontWeight: '600', fontSize: '18px', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' };

// Inject media queries dynamically
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (min-width: 768px) {
      div[style*="desktopSearchContainerStyle"] { display: flex !important; }
      button[style*="mobileMenuBtnStyle"] { display: none !important; }
    }
    @media (max-width: 767px) {
      div[style*="desktopLinksStyle"] { display: none !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Navbar;
