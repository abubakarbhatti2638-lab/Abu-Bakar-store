import React from 'react';
import { categories } from '../data/products';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '36px', color: '#0f172a', marginBottom: '16px', fontWeight: '800' }}>Browse Categories</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Explore our wide range of products organized by category to find exactly what you're looking for.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '24px' 
      }}>
        {categories.map((category, index) => (
          <Link 
            to={`/shop?category=${category}`} 
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <div style={cardStyle}>
              <div style={iconStyle}>
                {/* Temporary generic icon shape based on index */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: index % 2 === 0 ? '50%' : '8px',
                  backgroundColor: '#3b82f6', opacity: '0.2'
                }}></div>
              </div>
              <h3 style={titleStyle}>{category}</h3>
              <p style={subtitleStyle}>Explore Collection &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid #f1f5f9',
  cursor: 'pointer',
  height: '100%',
};

const iconStyle = {
  marginBottom: '20px',
  padding: '16px',
  backgroundColor: '#eff6ff',
  borderRadius: '50%',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '8px',
  textAlign: 'center',
};

const subtitleStyle = {
  fontSize: '14px',
  color: '#3b82f6',
  fontWeight: '600',
};

export default Categories;