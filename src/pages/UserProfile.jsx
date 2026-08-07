import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Package, Heart, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders/myorders', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>My Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Full Name</p>
                <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>{user?.name}</p>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Email Address</p>
                <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>{user?.email}</p>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Role</p>
                <p style={{ fontWeight: 500, fontSize: '1.1rem', textTransform: 'capitalize' }}>{user?.role}</p>
              </div>
            </div>
            <button className="btn btn-outline mt-8">Edit Profile</button>
          </div>
        );
      case 'orders':
        return (
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>My Orders</h2>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-muted">You have no orders yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(order => (
                  <div key={order._id} style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: 600 }}>Order #{order._id.substring(0, 8)}</span>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.875rem',
                        backgroundColor: order.status === 'delivered' ? 'var(--success)' : 'var(--warning)',
                        color: 'white' 
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-muted">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-muted">Total: ${order.total?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'address':
        return (
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Saved Address</h2>
            {user?.address ? (
              <div>
                <p>{user.address.street}</p>
                <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                <p>{user.address.country}</p>
              </div>
            ) : (
              <p className="text-muted">No address saved yet.</p>
            )}
            <button className="btn btn-outline mt-4">Add Address</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div className="grid" style={{ gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        
        {/* Sidebar */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--primary-light)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {user?.name?.charAt(0)}
            </div>
            <h3 style={{ fontWeight: 600 }}>{user?.name}</h3>
          </div>

          <button onClick={() => setActiveTab('profile')} className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}>
            <User size={18} /> Profile
          </button>
          <button onClick={() => setActiveTab('orders')} className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}>
            <Package size={18} /> My Orders
          </button>
          <button onClick={() => setActiveTab('address')} className={`sidebar-btn ${activeTab === 'address' ? 'active' : ''}`}>
            <MapPin size={18} /> Saved Address
          </button>
          <Link to="/wishlist" className="sidebar-btn" style={{ display: 'flex' }}>
            <Heart size={18} /> Wishlist
          </Link>
          <button onClick={() => setActiveTab('settings')} className={`sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`}>
            <Settings size={18} /> Account Settings
          </button>
          <button onClick={handleLogout} className="sidebar-btn" style={{ color: 'var(--error)', marginTop: 'auto' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Content Area */}
        <div>
          {renderContent()}
        </div>

      </div>

      <style>
        {`
          .sidebar-btn {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-radius: var(--radius-md);
            color: var(--text-muted);
            transition: all 0.2s;
            text-align: left;
            font-weight: 500;
          }
          .sidebar-btn:hover {
            background-color: var(--input-bg);
            color: var(--primary);
          }
          .sidebar-btn.active {
            background-color: var(--primary);
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;