import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={iconCircleStyle}>
            <LogIn size={24} color="#3b82f6" />
          </div>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>Sign in to your ShopSphere account</p>
        </div>

        {error && (
          <div style={errorBoxStyle}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@shopsphere.com"
              required 
              style={inputStyle} 
            />
          </div>
          
          <div style={inputGroupStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={labelStyle}>Password</label>
              <a href="#" style={forgotStyle}>Forgot password?</a>
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required 
              style={inputStyle} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{...btnStyle, opacity: loading ? 0.7 : 1}}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={footerStyle}>
          Don't have an account? <Link to="/register" style={linkStyle}>Sign up</Link>
        </div>

        <div style={demoNoteStyle}>
          <strong>Demo Mode:</strong> You can enter any email and a password (min 6 chars) to log in.
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', minHeight: '70vh', backgroundColor: '#f8fafc' };
const cardStyle = { backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', maxWidth: '450px', width: '100%', border: '1px solid #e2e8f0' };

const headerStyle = { textAlign: 'center', marginBottom: '30px' };
const iconCircleStyle = { width: '60px', height: '60px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' };
const titleStyle = { fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' };
const subtitleStyle = { fontSize: '15px', color: '#64748b', margin: 0 };

const errorBoxStyle = { backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', marginBottom: '20px' };

const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '14px', fontWeight: '600', color: '#475569' };
const forgotStyle = { fontSize: '13px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' };
const inputStyle = { padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' };

const btnStyle = { padding: '14px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.2s', marginTop: '10px' };

const footerStyle = { textAlign: 'center', marginTop: '30px', fontSize: '14px', color: '#64748b' };
const linkStyle = { color: '#3b82f6', textDecoration: 'none', fontWeight: '600' };

const demoNoteStyle = { marginTop: '30px', padding: '12px', backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '8px', fontSize: '13px', textAlign: 'center', border: '1px solid #fde68a' };

export default Login;