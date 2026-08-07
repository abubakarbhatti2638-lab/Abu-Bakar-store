import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X } from 'lucide-react';

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    
    const cat = searchParams.get('category');
    if (cat !== null) setActiveCategory(cat);
  }, [location.search]);

  // Frontend Filtering & Sorting Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating Filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Stock Filter
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.newArrival - a.newArrival);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => b.featured - a.featured);
        break;
    }

    return result;
  }, [products, searchQuery, activeCategory, priceRange, minRating, inStockOnly, sortBy]);

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setMinRating(0);
    setInStockOnly(false);
  };

  return (
    <div style={containerStyle}>
      {/* Page Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Shop Collection</h1>
        <p style={subtitleStyle}>Showing {filteredAndSortedProducts.length} results</p>
      </div>

      <div style={layoutStyle}>
        {/* Mobile Filter Toggle */}
        <button style={mobileFilterBtnStyle} onClick={() => setShowMobileFilters(true)}>
          <Filter size={20} /> Filter & Sort
        </button>

        {/* Sidebar Filters */}
        <aside style={{...sidebarStyle, ...(showMobileFilters ? mobileSidebarActiveStyle : {})}}>
          <div style={sidebarHeaderStyle}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            <button style={closeBtnStyle} onClick={() => setShowMobileFilters(false)}><X size={24} /></button>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Search</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                style={inputStyle}
              />
              <Search size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: '#94a3b8' }} />
            </div>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Category</label>
            <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)} style={selectStyle}>
              <option value="All">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Max Price: ${priceRange[1]}</label>
            <input 
              type="range" 
              min="0" max="1000" 
              value={priceRange[1]} 
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Minimum Rating</label>
            <select value={minRating} onChange={e => setMinRating(Number(e.target.value))} style={selectStyle}>
              <option value="0">Any Rating</option>
              <option value="4">4 Stars & Above</option>
              <option value="3">3 Stars & Above</option>
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={inStockOnly} 
                onChange={e => setInStockOnly(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '15px', color: '#334155', fontWeight: '500' }}>In Stock Only</span>
            </label>
          </div>

          <button onClick={clearFilters} style={clearBtnStyle}>Clear All Filters</button>
        </aside>

        {/* Main Content */}
        <div style={mainContentStyle}>
          {/* Toolbar */}
          <div style={toolbarStyle}>
            {searchQuery && (
              <div style={{ fontSize: '15px' }}>
                Search results for: <strong>"{searchQuery}"</strong>
              </div>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{...selectStyle, width: 'auto', padding: '8px 30px 8px 12px'}}>
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div style={emptyStateStyle}>
              <Search size={48} color="#cbd5e1" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', margin: '0 0 10px', color: '#0f172a' }}>No products found</h3>
              <p style={{ color: '#64748b', margin: '0 0 20px' }}>Try adjusting your search or filters to find what you're looking for.</p>
              <button onClick={clearFilters} style={{...clearBtnStyle, width: 'auto', padding: '10px 24px'}}>Clear Filters</button>
            </div>
          ) : (
            <div style={gridStyle}>
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' };
const headerStyle = { marginBottom: '40px' };
const titleStyle = { fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' };
const subtitleStyle = { fontSize: '16px', color: '#64748b', margin: 0 };

const layoutStyle = { display: 'flex', gap: '40px', alignItems: 'flex-start' };

const sidebarStyle = { width: '280px', flexShrink: 0, backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'sticky', top: '100px' };
const sidebarHeaderStyle = { display: 'none', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }; // Visible only on mobile
const closeBtnStyle = { background: 'none', border: 'none', cursor: 'pointer' };

const filterGroupStyle = { marginBottom: '24px' };
const filterLabelStyle = { display: 'block', fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' };
const inputStyle = { width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', outline: 'none' };
const selectStyle = { width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', backgroundColor: 'white', cursor: 'pointer', outline: 'none' };
const clearBtnStyle = { width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' };

const mainContentStyle = { flex: 1 };
const toolbarStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' };
const emptyStateStyle = { textAlign: 'center', padding: '80px 20px', backgroundColor: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center' };

const mobileFilterBtnStyle = { display: 'none', width: '100%', padding: '12px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', marginBottom: '20px', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const mobileSidebarActiveStyle = { display: 'block', position: 'fixed', top: 0, left: 0, bottom: 0, width: '100%', zIndex: 2000, margin: 0, borderRadius: 0, overflowY: 'auto' };

// Inject media query
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 991px) {
      aside[style*="width: 280px"] { display: none; }
      button[style*="mobileFilterBtnStyle"] { display: flex !important; }
      div[style*="sidebarHeaderStyle"] { display: flex !important; }
    }
  `;
  document.head.appendChild(style);
}

export default Shop;