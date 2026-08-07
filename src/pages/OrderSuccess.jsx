import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  // If user tries to access this page directly without placing an order
  if (!orderId) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={iconCircleStyle}>
          <CheckCircle size={64} color="#10b981" />
        </div>
        
        <h1 style={titleStyle}>Order Placed Successfully!</h1>
        <p style={subtitleStyle}>
          Thank you for shopping with ShopSphere. Your order has been received and is being processed.
        </p>
        
        <div style={orderBoxStyle}>
          <div style={orderRowStyle}>
            <span style={orderLabelStyle}>Order Number:</span>
            <span style={orderValueStyle}><strong>{orderId}</strong></span>
          </div>
          <div style={orderRowStyle}>
            <span style={orderLabelStyle}>Date:</span>
            <span style={orderValueStyle}>{new Date().toLocaleDateString()}</span>
          </div>
          <div style={orderRowStyle}>
            <span style={orderLabelStyle}>Total Amount:</span>
            <span style={orderValueStyle}><strong>${total.toFixed(2)}</strong></span>
          </div>
          <div style={orderRowStyle}>
            <span style={orderLabelStyle}>Payment Method:</span>
            <span style={orderValueStyle}>Demo Checkout</span>
          </div>
        </div>

        <div style={infoBoxStyle}>
          <Package size={24} color="#3b82f6" style={{ flexShrink: 0 }} />
          <p style={infoTextStyle}>
            We've sent a confirmation email to you with the order details and a link to track its progress.
          </p>
        </div>

        <div style={btnGroupStyle}>
          <Link to="/my-orders" style={secondaryBtnStyle}>
            View My Orders
          </Link>
          <Link to="/shop" style={primaryBtnStyle}>
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', minHeight: '60vh', backgroundColor: '#f8fafc' };
const cardStyle = { backgroundColor: 'white', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', maxWidth: '600px', width: '100%', textAlign: 'center' };

const iconCircleStyle = { width: '100px', height: '100px', backgroundColor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' };
const titleStyle = { fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' };
const subtitleStyle = { fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '30px' };

const orderBoxStyle = { backgroundColor: '#f1f5f9', padding: '24px', borderRadius: '12px', marginBottom: '30px', textAlign: 'left' };
const orderRowStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px dashed #cbd5e1' };
const orderLabelStyle = { color: '#475569', fontSize: '15px' };
const orderValueStyle = { color: '#0f172a', fontSize: '15px' };

const infoBoxStyle = { display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px', marginBottom: '40px', textAlign: 'left' };
const infoTextStyle = { margin: 0, color: '#1e40af', fontSize: '14px', lineHeight: '1.5' };

const btnGroupStyle = { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' };
const primaryBtnStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', transition: 'background-color 0.2s' };
const secondaryBtnStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 28px', backgroundColor: 'transparent', border: '2px solid #e2e8f0', color: '#475569', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', transition: 'background-color 0.2s' };

export default OrderSuccess;
