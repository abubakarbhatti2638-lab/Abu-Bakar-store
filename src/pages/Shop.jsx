import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products as dummyProducts } from '../data/products';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate network request
    const fetchProducts = () => {
      setTimeout(() => {
        setProducts(dummyProducts);
        setLoading(false);
      }, 500);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', color: '#0f172a', marginBottom: '16px' }}>Shop Our Collection</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Discover the latest trends and highest quality products curated just for you.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div className="spinner"></div> Loading products...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '8px', border: '1px solid #f87171' }}>
          {error}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          No products found. Run the seed script to populate the database!
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px' 
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;