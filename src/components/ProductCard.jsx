import React, { useContext } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
    // In a real app, a toast notification would fire here
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="product-card" style={cardStyle}>
      <div className="product-image" style={imageContainerStyle}>
        <img 
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'} 
          alt={product.name} 
          style={imgStyle} 
        />
        <button style={wishlistBtnStyle}><Heart size={18} /></button>
      </div>
      <div className="product-info" style={infoStyle}>
        <div style={categoryStyle}>{product.category}</div>
        <h3 style={nameStyle}>{product.name}</h3>
        <div style={priceContainerStyle}>
          <span style={priceStyle}>${product.price.toFixed(2)}</span>
          {product.stock <= 5 && product.stock > 0 && <span style={stockWarningStyle}>Only {product.stock} left!</span>}
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={product.stock === 0 ? btnDisabledStyle : btnStyle}
        >
          <ShoppingCart size={18} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Inline styles for speed
const cardStyle = { backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', border: '1px solid #e2e8f0' };
const imageContainerStyle = { position: 'relative', height: '200px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const imgStyle = { maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' };
const wishlistBtnStyle = { position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
const infoStyle = { padding: '20px' };
const categoryStyle = { fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: '600' };
const nameStyle = { margin: '0 0 12px 0', fontSize: '18px', color: '#0f172a', fontWeight: '700' };
const priceContainerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const priceStyle = { fontSize: '20px', fontWeight: '800', color: '#3b82f6' };
const stockWarningStyle = { fontSize: '12px', color: '#ef4444', fontWeight: '600' };
const btnStyle = { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#0f172a', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' };
const btnDisabledStyle = { ...btnStyle, backgroundColor: '#cbd5e1', cursor: 'not-allowed', color: '#94a3b8' };

export default ProductCard;
