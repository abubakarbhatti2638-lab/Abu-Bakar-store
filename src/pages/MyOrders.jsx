import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, DollarSign, ExternalLink } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('shopsphere_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div style={emptyContainerStyle}>
        <div style={emptyIconCircleStyle}>
          <Package size={48} color="#3b82f6" />
        </div>
        <h2 style={emptyTitleStyle}>No orders yet</h2>
        <p style={emptySubtitleStyle}>When you place orders, they will appear here.</p>
        <Link to="/shop" style={primaryBtnStyle}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>My Orders</h1>
      
      <div style={orderListStyle}>
        {orders.map(order => (
          <div key={order.id} style={orderCardStyle}>
            <div style={orderHeaderStyle}>
              <div style={headerSectionStyle}>
                <span style={labelStyle}>Order Placed</span>
                <span style={valueStyle}>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div style={headerSectionStyle}>
                <span style={labelStyle}>Total</span>
                <span style={valueStyle}>${order.total.toFixed(2)}</span>
              </div>
              <div style={headerSectionStyle}>
                <span style={labelStyle}>Ship To</span>
                <span style={valueStyle}>{order.shippingAddress.split(',')[0]}</span>
              </div>
              <div style={orderIdSectionStyle}>
                <span style={labelStyle}>Order # {order.id}</span>
                <span style={statusBadgeStyle(order.status)}>{order.status}</span>
              </div>
            </div>
            
            <div style={orderBodyStyle}>
              {order.items.map((item, index) => (
                <div key={`${order.id}-${item.id}-${index}`} style={itemRowStyle}>
                  <img src={item.image} alt={item.name} style={itemImgStyle} />
                  <div style={itemInfoStyle}>
                    <h4 style={itemNameStyle}>
                      <Link to={`/product/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.name}
                      </Link>
                    </h4>
                    <p style={itemMetaStyle}>Qty: {item.quantity} | ${item.price.toFixed(2)}</p>
                  </div>
                  <div style={itemActionStyle}>
                    <Link to={`/product/${item.id}`} style={actionBtnStyle}>
                      View Product <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' };
const titleStyle = { fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '30px' };

const orderListStyle = { display: 'flex', flexDirection: 'column', gap: '30px' };

const orderCardStyle = { backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' };
const orderHeaderStyle = { backgroundColor: '#f8fafc', padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' };

const headerSectionStyle = { display: 'flex', flexDirection: 'column', gap: '4px' };
const labelStyle = { fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' };
const valueStyle = { fontSize: '14px', color: '#0f172a', fontWeight: '500' };

const orderIdSectionStyle = { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', flex: 1, minWidth: '150px' };
const statusBadgeStyle = (status) => ({
  fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px',
  backgroundColor: status === 'Processing' ? '#fef3c7' : '#ecfdf5',
  color: status === 'Processing' ? '#d97706' : '#10b981'
});

const orderBodyStyle = { padding: '20px' };
const itemRowStyle = { display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' };
const itemImgStyle = { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' };
const itemInfoStyle = { flex: 1 };
const itemNameStyle = { margin: '0 0 8px', fontSize: '16px', fontWeight: '600', color: '#0f172a' };
const itemMetaStyle = { margin: 0, fontSize: '14px', color: '#64748b' };

const itemActionStyle = { display: 'flex' };
const actionBtnStyle = { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#334155', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'border-color 0.2s' };

const emptyContainerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', textAlign: 'center' };
const emptyIconCircleStyle = { width: '96px', height: '96px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' };
const emptyTitleStyle = { fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px' };
const emptySubtitleStyle = { fontSize: '16px', color: '#64748b', marginBottom: '30px' };
const primaryBtnStyle = { display: 'inline-block', padding: '14px 32px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px' };

export default MyOrders;