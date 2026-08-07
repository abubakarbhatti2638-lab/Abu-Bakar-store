import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, Heart, Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  // Find product
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors) setSelectedColor(foundProduct.colors[0]);
      if (foundProduct.sizes) setSelectedSize(foundProduct.sizes[0]);
      setActiveImage(0);
      setQuantity(1);
    }
  }, [id]);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Product not found</h2>
        <Link to="/shop" style={{ color: '#3b82f6', textDecoration: 'none' }}>Return to Shop</Link>
      </div>
    );
  }

  const isWished = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: show a toast notification here
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const toggleWishlist = () => {
    if (isWished) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div style={containerStyle}>
      {/* Breadcrumb */}
      <div style={breadcrumbStyle}>
        <Link to="/shop" style={breadcrumbLinkStyle}><ArrowLeft size={16} /> Back to Shop</Link>
        <span style={breadcrumbDividerStyle}>/</span>
        <Link to={`/shop?category=${product.category}`} style={breadcrumbLinkStyle}>{product.category}</Link>
        <span style={breadcrumbDividerStyle}>/</span>
        <span style={breadcrumbCurrentStyle}>{product.name}</span>
      </div>

      <div style={productLayoutStyle}>
        {/* Image Gallery */}
        <div style={galleryColStyle}>
          <div style={mainImageContainerStyle}>
            <img src={product.images[activeImage] || product.image} alt={product.name} style={mainImageStyle} />
            {product.discount > 0 && <span style={discountBadgeStyle}>{product.discount}% OFF</span>}
          </div>
          <div style={thumbnailListStyle}>
            {(product.images || [product.image]).map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                style={{...thumbnailStyle, borderColor: activeImage === idx ? '#3b82f6' : 'transparent'}}
              >
                <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div style={infoColStyle}>
          <div style={brandStyle}>{product.brand}</div>
          <h1 style={titleStyle}>{product.name}</h1>
          
          <div style={metaRowStyle}>
            <div style={ratingStyle}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#f59e0b" : "transparent"} color={i < Math.floor(product.rating) ? "#f59e0b" : "#cbd5e1"} />
              ))}
              <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '14px' }}>({product.reviews} reviews)</span>
            </div>
            <span style={stockStatusStyle(product.stock)}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          <div style={priceContainerStyle}>
            <span style={priceStyle}>${product.price.toFixed(2)}</span>
            {product.originalPrice && <span style={originalPriceStyle}>${product.originalPrice.toFixed(2)}</span>}
          </div>

          <p style={descStyle}>{product.description}</p>

          {/* Options */}
          {product.colors && (
            <div style={optionGroupStyle}>
              <h4 style={optionLabelStyle}>Color: {selectedColor}</h4>
              <div style={optionListStyle}>
                {product.colors.map(color => (
                  <button 
                    key={color} 
                    onClick={() => setSelectedColor(color)}
                    style={{...colorBtnStyle, backgroundColor: color.toLowerCase(), borderColor: selectedColor === color ? '#3b82f6' : '#e2e8f0', borderWidth: selectedColor === color ? '2px' : '1px'}}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div style={optionGroupStyle}>
              <h4 style={optionLabelStyle}>Size: {selectedSize}</h4>
              <div style={optionListStyle}>
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    style={{...sizeBtnStyle, backgroundColor: selectedSize === size ? '#0f172a' : 'white', color: selectedSize === size ? 'white' : '#0f172a'}}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={actionRowStyle}>
            <div style={qtyControlStyle}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={qtyBtnStyle} disabled={product.stock === 0}><Minus size={18} /></button>
              <span style={qtyTextStyle}>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={qtyBtnStyle} disabled={product.stock === 0}><Plus size={18} /></button>
            </div>
            
            <button onClick={handleAddToCart} style={addToCartBtnStyle} disabled={product.stock === 0}>
              <ShoppingCart size={20} /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <button onClick={toggleWishlist} style={{...wishlistBtnStyle, color: isWished ? '#ef4444' : '#64748b', backgroundColor: isWished ? '#fee2e2' : '#f1f5f9'}}>
              <Heart size={20} fill={isWished ? '#ef4444' : 'transparent'} />
            </button>
          </div>

          <button onClick={handleBuyNow} style={buyNowBtnStyle} disabled={product.stock === 0}>
            Buy it now
          </button>

          {/* Features */}
          <div style={featuresBoxStyle}>
            <div style={featureItemStyle}><Truck size={20} color="#3b82f6" /> <span>Free shipping worldwide</span></div>
            <div style={featureItemStyle}><ShieldCheck size={20} color="#10b981" /> <span>30 days return policy</span></div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={relatedSectionStyle}>
          <h2 style={relatedTitleStyle}>You May Also Like</h2>
          <div style={relatedGridStyle}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' };

const breadcrumbStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', marginBottom: '30px' };
const breadcrumbLinkStyle = { color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' };
const breadcrumbDividerStyle = { color: '#cbd5e1' };
const breadcrumbCurrentStyle = { color: '#0f172a', fontWeight: '500' };

const productLayoutStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '50px', marginBottom: '80px' };

const galleryColStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const mainImageContainerStyle = { width: '100%', height: '500px', backgroundColor: '#f1f5f9', borderRadius: '16px', overflow: 'hidden', position: 'relative' };
const mainImageStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const discountBadgeStyle = { position: 'absolute', top: '20px', left: '20px', backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '14px' };

const thumbnailListStyle = { display: 'flex', gap: '15px' };
const thumbnailStyle = { width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', borderStyle: 'solid', borderWidth: '2px', backgroundColor: '#f1f5f9' };

const infoColStyle = { display: 'flex', flexDirection: 'column' };
const brandStyle = { fontSize: '14px', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' };
const titleStyle = { fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px', lineHeight: '1.2' };

const metaRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' };
const ratingStyle = { display: 'flex', alignItems: 'center' };
const stockStatusStyle = (stock) => ({ fontSize: '14px', fontWeight: '600', color: stock > 0 ? '#10b981' : '#ef4444', backgroundColor: stock > 0 ? '#ecfdf5' : '#fef2f2', padding: '4px 10px', borderRadius: '20px' });

const priceContainerStyle = { display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '24px' };
const priceStyle = { fontSize: '32px', fontWeight: '800', color: '#0f172a' };
const originalPriceStyle = { fontSize: '20px', color: '#94a3b8', textDecoration: 'line-through', marginBottom: '4px' };

const descStyle = { fontSize: '16px', color: '#475569', lineHeight: '1.7', marginBottom: '30px' };

const optionGroupStyle = { marginBottom: '24px' };
const optionLabelStyle = { fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: '0 0 10px' };
const optionListStyle = { display: 'flex', gap: '12px', flexWrap: 'wrap' };
const colorBtnStyle = { width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', borderStyle: 'solid' };
const sizeBtnStyle = { padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' };

const actionRowStyle = { display: 'flex', gap: '16px', marginBottom: '16px' };
const qtyControlStyle = { display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', height: '50px' };
const qtyBtnStyle = { width: '40px', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' };
const qtyTextStyle = { width: '40px', textAlign: 'center', fontSize: '16px', fontWeight: '600', color: '#0f172a' };

const addToCartBtnStyle = { flex: 1, height: '50px', backgroundColor: '#f1f5f9', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const wishlistBtnStyle = { width: '50px', height: '50px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' };
const buyNowBtnStyle = { width: '100%', height: '50px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginBottom: '30px' };

const featuresBoxStyle = { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' };
const featureItemStyle = { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#475569', fontWeight: '500' };

const relatedSectionStyle = { borderTop: '1px solid #e2e8f0', paddingTop: '60px' };
const relatedTitleStyle = { fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '30px', textAlign: 'center' };
const relatedGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' };

export default ProductDetails;