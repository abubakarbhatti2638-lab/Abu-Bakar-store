import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, tax, shipping, discountAmount, total, coupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, type: res.success ? 'success' : 'error' });
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div style={emptyContainerStyle}>
        <div style={emptyIconCircleStyle}>
          <ShoppingBag size={48} color="#3b82f6" />
        </div>
        <h2 style={emptyTitleStyle}>Your cart is empty</h2>
        <p style={emptySubtitleStyle}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" style={primaryBtnStyle}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Shopping Cart</h1>
      
      <div style={layoutStyle}>
        {/* Cart Items */}
        <div style={itemsSectionStyle}>
          <div style={tableHeaderStyle}>
            <div style={{ flex: 3 }}>Product</div>
            <div style={{ flex: 1, textAlign: 'center' }}>Price</div>
            <div style={{ flex: 1, textAlign: 'center' }}>Quantity</div>
            <div style={{ flex: 1, textAlign: 'right' }}>Total</div>
          </div>
          
          <div style={itemsListStyle}>
            {cart.map(item => (
              <div key={item.id} style={cartItemStyle}>
                {/* Product Info */}
                <div style={productColStyle}>
                  <img src={item.image} alt={item.name} style={imgStyle} />
                  <div>
                    <h3 style={itemNameStyle}>
                      <Link to={`/product/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.name}</Link>
                    </h3>
                    <p style={itemCatStyle}>{item.category}</p>
                    <button onClick={() => removeFromCart(item.id)} style={removeBtnStyle}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div style={priceColStyle}>
                  ${item.price.toFixed(2)}
                </div>
                
                {/* Quantity */}
                <div style={qtyColStyle}>
                  <div style={qtyControlStyle}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={qtyBtnStyle}><Minus size={14} /></button>
                    <span style={qtyTextStyle}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={qtyBtnStyle}><Plus size={14} /></button>
                  </div>
                </div>
                
                {/* Total */}
                <div style={totalColStyle}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div style={summarySidebarStyle}>
          <h2 style={summaryTitleStyle}>Order Summary</h2>
          
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>Subtotal</span>
            <span style={summaryValueStyle}>${subtotal.toFixed(2)}</span>
          </div>
          
          {coupon && (
            <div style={{...summaryRowStyle, color: '#10b981'}}>
              <span style={summaryLabelStyle}>Discount ({coupon.code})</span>
              <span style={summaryValueStyle}>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>Shipping</span>
            <span style={summaryValueStyle}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>Tax (8%)</span>
            <span style={summaryValueStyle}>${tax.toFixed(2)}</span>
          </div>
          
          <div style={dividerStyle}></div>
          
          <div style={totalRowStyle}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div style={couponSectionStyle}>
            {coupon ? (
              <div style={activeCouponStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag size={16} />
                  <span><strong>{coupon.code}</strong> applied</span>
                </div>
                <button onClick={removeCoupon} style={removeCouponBtnStyle}><X size={16} /></button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon}>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '500' }}>Have a coupon code? (Try SAVE20)</p>
                <div style={couponInputGroupStyle}>
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    value={couponCode} 
                    onChange={e => setCouponCode(e.target.value)}
                    style={couponInputStyle}
                  />
                  <button type="submit" style={couponBtnStyle}>Apply</button>
                </div>
                {couponMsg.text && (
                  <p style={{ fontSize: '13px', marginTop: '8px', color: couponMsg.type === 'success' ? '#10b981' : '#ef4444' }}>
                    {couponMsg.text}
                  </p>
                )}
              </form>
            )}
          </div>

          <button onClick={() => navigate('/checkout')} style={checkoutBtnStyle}>
            Proceed to Checkout <ArrowRight size={18} />
          </button>
          
          <div style={secureCheckoutStyle}>
            <ShieldCheck size={16} /> Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

import { ShieldCheck } from 'lucide-react';

// Styles
const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' };
const titleStyle = { fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '30px' };

const layoutStyle = { display: 'flex', gap: '40px', alignItems: 'flex-start' };

const itemsSectionStyle = { flex: 2, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' };
const tableHeaderStyle = { display: 'flex', padding: '20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' };
const itemsListStyle = { display: 'flex', flexDirection: 'column' };
const cartItemStyle = { display: 'flex', padding: '24px 20px', borderBottom: '1px solid #f1f5f9', alignItems: 'center' };

const productColStyle = { flex: 3, display: 'flex', gap: '20px', alignItems: 'center' };
const imgStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#f1f5f9' };
const itemNameStyle = { margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: '#0f172a' };
const itemCatStyle = { margin: '0 0 10px', fontSize: '13px', color: '#64748b' };
const removeBtnStyle = { background: 'none', border: 'none', padding: 0, color: '#ef4444', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' };

const priceColStyle = { flex: 1, textAlign: 'center', fontSize: '16px', fontWeight: '600', color: '#0f172a' };
const qtyColStyle = { flex: 1, display: 'flex', justifyContent: 'center' };
const totalColStyle = { flex: 1, textAlign: 'right', fontSize: '16px', fontWeight: '700', color: '#3b82f6' };

const qtyControlStyle = { display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' };
const qtyBtnStyle = { background: '#f8fafc', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569', transition: 'background-color 0.2s' };
const qtyTextStyle = { width: '30px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#0f172a' };

const summarySidebarStyle = { flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', position: 'sticky', top: '100px' };
const summaryTitleStyle = { fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px' };
const summaryRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#475569' };
const summaryLabelStyle = { fontWeight: '500' };
const summaryValueStyle = { fontWeight: '600', color: '#0f172a' };
const dividerStyle = { height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' };
const totalRowStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '30px' };

const couponSectionStyle = { marginBottom: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' };
const activeCouponStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#10b981', fontSize: '15px' };
const removeCouponBtnStyle = { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' };
const couponInputGroupStyle = { display: 'flex', gap: '8px' };
const couponInputStyle = { flex: 1, padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', outline: 'none' };
const couponBtnStyle = { padding: '0 16px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };

const checkoutBtnStyle = { width: '100%', padding: '16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'background-color 0.2s', marginBottom: '16px' };
const secureCheckoutStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', fontSize: '13px', fontWeight: '600' };

const emptyContainerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', textAlign: 'center' };
const emptyIconCircleStyle = { width: '96px', height: '96px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' };
const emptyTitleStyle = { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px' };
const emptySubtitleStyle = { fontSize: '16px', color: '#64748b', marginBottom: '30px' };
const primaryBtnStyle = { display: 'inline-block', padding: '14px 32px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px' };

// Inject media query
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 991px) {
      div[style*="layoutStyle"] { flex-direction: column; }
      div[style*="itemsSectionStyle"], div[style*="summarySidebarStyle"] { width: 100%; flex: none; }
      div[style*="tableHeaderStyle"] { display: none !important; }
      div[style*="cartItemStyle"] { flex-direction: column; align-items: flex-start; gap: 20px; }
      div[style*="productColStyle"] { width: 100%; }
      div[style*="priceColStyle"], div[style*="qtyColStyle"], div[style*="totalColStyle"] { width: 100%; text-align: left; justify-content: flex-start; }
      div[style*="totalColStyle"]:before { content: "Total: "; font-weight: 500; color: #64748b; }
    }
  `;
  document.head.appendChild(style);
}

export default Cart;