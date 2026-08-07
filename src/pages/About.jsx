import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '42px', color: '#0f172a', marginBottom: '20px', fontWeight: '800' }}>About ShopSphere</h1>
        <p style={{ color: '#64748b', fontSize: '20px', lineHeight: '1.6' }}>
          Redefining the online shopping experience with premium products, exceptional quality, and seamless design.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '60px' }}>
        <img 
          src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80" 
          alt="Our Team" 
          style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', objectFit: 'cover', height: '100%' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '28px', color: '#0f172a', marginBottom: '16px', fontWeight: '700' }}>Our Story</h2>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }}>
            Founded with a passion for bringing the best products directly to consumers, ShopSphere started as a small vision and has grown into a leading e-commerce platform. We believe that shopping online should be beautiful, effortless, and inspiring.
          </p>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8' }}>
            Our team travels the globe to curate collections that elevate your everyday life, from cutting-edge electronics to timeless fashion pieces.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        <div style={featureStyle}>
          <h3 style={featureTitleStyle}>Quality First</h3>
          <p style={featureTextStyle}>Every product in our catalog undergoes rigorous quality checks before it ever reaches your doorstep.</p>
        </div>
        <div style={featureStyle}>
          <h3 style={featureTitleStyle}>Fast Delivery</h3>
          <p style={featureTextStyle}>We partner with the world's best logistics networks to ensure your items arrive safely and swiftly.</p>
        </div>
        <div style={featureStyle}>
          <h3 style={featureTitleStyle}>24/7 Support</h3>
          <p style={featureTextStyle}>Our dedicated customer success team is always online to help you with any questions or concerns.</p>
        </div>
      </div>
    </div>
  );
};

const featureStyle = {
  padding: '30px',
  backgroundColor: '#f8fafc',
  borderRadius: '16px',
  textAlign: 'center',
};

const featureTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#0f172a',
  marginBottom: '12px',
};

const featureTextStyle = {
  fontSize: '15px',
  color: '#64748b',
  lineHeight: '1.6',
};

export default About;