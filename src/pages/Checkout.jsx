import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, ShieldCheck, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, total, subtotal, shipping, tax, discountAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing and backend request
    setTimeout(() => {
      // Create a dummy order
      const order = {
        id: 'ORD-' + Math.floor(Math.random() * 1000000),
        date: new Date().toISOString(),
        items: cart,
        total: total,
        status: 'Processing',
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`
      };

      // Save to localStorage 'orders'
      const existingOrders = JSON.parse(localStorage.getItem('shopsphere_orders') || '[]');
      localStorage.setItem('shopsphere_orders', JSON.stringify([order, ...existingOrders]));

      // Clear cart
      clearCart();

      // Navigate to success
      navigate('/order-success', { state: { orderId: order.id, total: order.total } });
    }, 1500);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div style={emptyContainerStyle}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} style={primaryBtnStyle}>Return to Shop</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Checkout</h1>
      
      <form onSubmit={handleSubmit} style={layoutStyle}>
        {/* Main Form Area */}
        <div style={formSectionStyle}>
          {/* Contact Info */}
          <div style={sectionBoxStyle}>
            <h2 style={sectionTitleStyle}>1. Contact Information</h2>
            <div style={gridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={sectionBoxStyle}>
            <h2 style={sectionTitleStyle}>2. Shipping Address</h2>
            <div style={{...inputGroupStyle, gridColumn: 'span 2'}}>
              <label style={labelStyle}>Street Address</label>
              <input type="text" name="address" required value={formData.address} onChange={handleInputChange} style={inputStyle} />
            </div>
            <div style={gridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Postal Code</label>
                <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} style={inputStyle} />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Country</label>
                <select name="country" value={formData.country} onChange={handleInputChange} style={selectStyle}>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div style={sectionBoxStyle}>
            <h2 style={sectionTitleStyle}>3. Shipping Method</h2>
            <div style={radioGroupStyle}>
              <label style={{...radioLabelStyle, borderColor: formData.shippingMethod === 'standard' ? '#3b82f6' : '#e2e8f0'}}>
                <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === 'standard'} onChange={handleInputChange} style={radioInputStyle} />
                <div style={radioContentStyle}>
                  <span style={radioTitleStyle}><Truck size={18} /> Standard Delivery</span>
                  <span style={radioDescStyle}>3-5 business days {shipping === 0 && '(Free)'}</span>
                </div>
              </label>
              <label style={{...radioLabelStyle, borderColor: formData.shippingMethod === 'express' ? '#3b82f6' : '#e2e8f0'}}>
                <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === 'express'} onChange={handleInputChange} style={radioInputStyle} />
                <div style={radioContentStyle}>
                  <span style={radioTitleStyle}><Truck size={18} /> Express Delivery</span>
                  <span style={radioDescStyle}>1-2 business days (+$15.00)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method (UI Only) */}
          <div style={sectionBoxStyle}>
            <h2 style={sectionTitleStyle}>4. Payment Method <span style={uiOnlyStyle}>(Demo UI Only)</span></h2>
            <div style={radioGroupStyle}>
              <label style={{...radioLabelStyle, borderColor: formData.paymentMethod === 'card' ? '#3b82f6' : '#e2e8f0'}}>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} style={radioInputStyle} />
                <div style={radioContentStyle}>
                  <span style={radioTitleStyle}><CreditCard size={18} /> Credit / Debit Card</span>
                </div>
              </label>
              <label style={{...radioLabelStyle, borderColor: formData.paymentMethod === 'paypal' ? '#3b82f6' : '#e2e8f0'}}>
                <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleInputChange} style={radioInputStyle} />
                <div style={radioContentStyle}>
                  <span style={radioTitleStyle}>PayPal</span>
                </div>
              </label>
              <label style={{...radioLabelStyle, borderColor: formData.paymentMethod === 'cod' ? '#3b82f6' : '#e2e8f0'}}>
                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} style={radioInputStyle} />
                <div style={radioContentStyle}>
                  <span style={radioTitleStyle}>Cash on Delivery</span>
                </div>
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>This is a demo. No real payment will be processed. You can enter any numbers.</p>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" style={inputStyle} />
                </div>
                <div style={gridStyle}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" style={inputStyle} />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>CVC</label>
                    <input type="text" placeholder="123" style={inputStyle} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div style={summarySidebarStyle}>
          <h2 style={summaryTitleStyle}>Order Summary</h2>
          
          <div style={summaryItemsStyle}>
            {cart.map(item => (
              <div key={item.id} style={summaryItemStyle}>
                <img src={item.image} alt={item.name} style={summaryItemImgStyle} />
                <div style={summaryItemInfoStyle}>
                  <h4 style={summaryItemNameStyle}>{item.name}</h4>
                  <p style={summaryItemQtyStyle}>Qty: {item.quantity}</p>
                </div>
                <div style={summaryItemPriceStyle}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div style={dividerStyle}></div>

          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>Subtotal</span>
            <span style={summaryValueStyle}>${subtotal.toFixed(2)}</span>
          </div>
          
          {discountAmount > 0 && (
            <div style={{...summaryRowStyle, color: '#10b981'}}>
              <span style={summaryLabelStyle}>Discount</span>
              <span style={summaryValueStyle}>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>Shipping</span>
            <span style={summaryValueStyle}>
              {formData.shippingMethod === 'express' 
                ? '$15.00' 
                : (shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`)}
            </span>
          </div>
          
          <div style={summaryRowStyle}>
            <span style={summaryLabelStyle}>Tax</span>
            <span style={summaryValueStyle}>${tax.toFixed(2)}</span>
          </div>
          
          <div style={dividerStyle}></div>
          
          <div style={totalRowStyle}>
            <span>Total</span>
            <span>
              ${(
                total + (formData.shippingMethod === 'express' && shipping === 0 ? 15 : 0)
              ).toFixed(2)}
            </span>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            style={{...checkoutBtnStyle, opacity: isProcessing ? 0.7 : 1}}
          >
            {isProcessing ? 'Processing Order...' : 'Place Order'}
          </button>
          
          <div style={secureCheckoutStyle}>
            <ShieldCheck size={16} /> All transactions are secure and encrypted.
          </div>
        </div>
      </form>
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' };
const titleStyle = { fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '30px' };

const layoutStyle = { display: 'flex', gap: '40px', alignItems: 'flex-start' };

const formSectionStyle = { flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' };
const sectionBoxStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' };
const sectionTitleStyle = { fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' };
const uiOnlyStyle = { fontSize: '12px', backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#475569' };
const inputStyle = { padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' };
const selectStyle = { ...inputStyle, backgroundColor: 'white', cursor: 'pointer' };

const radioGroupStyle = { display: 'flex', flexDirection: 'column', gap: '12px' };
const radioLabelStyle = { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', border: '1px solid', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s' };
const radioInputStyle = { marginTop: '4px' };
const radioContentStyle = { display: 'flex', flexDirection: 'column', gap: '4px' };
const radioTitleStyle = { fontWeight: '600', color: '#0f172a', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' };
const radioDescStyle = { fontSize: '14px', color: '#64748b' };

const summarySidebarStyle = { flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', position: 'sticky', top: '100px' };
const summaryTitleStyle = { fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px' };

const summaryItemsStyle = { display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' };
const summaryItemStyle = { display: 'flex', gap: '12px', alignItems: 'center' };
const summaryItemImgStyle = { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' };
const summaryItemInfoStyle = { flex: 1 };
const summaryItemNameStyle = { margin: '0 0 4px', fontSize: '14px', fontWeight: '600', color: '#0f172a', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' };
const summaryItemQtyStyle = { margin: 0, fontSize: '13px', color: '#64748b' };
const summaryItemPriceStyle = { fontWeight: '600', color: '#0f172a', fontSize: '14px' };

const summaryRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: '#475569' };
const summaryLabelStyle = { fontWeight: '500' };
const summaryValueStyle = { fontWeight: '600', color: '#0f172a' };
const dividerStyle = { height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' };
const totalRowStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '30px' };

const checkoutBtnStyle = { width: '100%', padding: '16px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'opacity 0.2s', marginBottom: '16px' };
const secureCheckoutStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', fontSize: '12px', fontWeight: '500', textAlign: 'center' };

const emptyContainerStyle = { textAlign: 'center', padding: '100px 20px' };
const primaryBtnStyle = { display: 'inline-block', padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', marginTop: '20px' };

// Inject media query
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 991px) {
      div[style*="layoutStyle"] { flex-direction: column; }
      div[style*="formSectionStyle"], div[style*="summarySidebarStyle"] { width: 100%; flex: none; }
    }
  `;
  document.head.appendChild(style);
}

export default Checkout;