import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ padding: '1rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
              ShopSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', gap: '2rem' }} className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
          
          <style>
            {`
              @media(min-width: 768px) {
                .desktop-nav { display: flex !important; }
                .mobile-menu-btn { display: none !important; }
              }
              .nav-link { font-weight: 500; transition: color 0.2s; }
              .nav-link:hover { color: var(--primary); }
              .icon-btn { position: relative; padding: 0.5rem; color: var(--text-main); transition: color 0.2s; }
              .icon-btn:hover { color: var(--primary); }
              .badge { position: absolute; top: 0; right: 0; background: var(--secondary); color: white; font-size: 0.7rem; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
            `}
          </style>

          {/* Desktop Search & Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'none' }} className="desktop-nav">
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                  style={{ paddingRight: '2.5rem', width: '200px' }}
                />
                <button type="submit" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Search size={18} />
                </button>
              </div>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/wishlist" className="icon-btn">
                <Heart size={22} />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </Link>
              <Link to="/cart" className="icon-btn">
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>
              {isAuthenticated ? (
                <Link to="/profile" className="icon-btn">
                  <User size={22} />
                </Link>
              ) : (
                <Link to="/login" className="icon-btn">
                  <User size={22} />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-btn icon-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }} className="animate-fade-in">
          <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ width: '100%' }}
            />
          </form>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Shop</Link>
            <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Categories</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">About</Link>
            {isAuthenticated ? (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="nav-link" style={{ textAlign: 'left' }}>Logout</button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
