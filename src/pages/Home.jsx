import React from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>Discover Products You'll Love</h1>
          <p style={heroSubtitleStyle}>Shop quality products at great prices. From everyday essentials to premium electronics, we have it all.</p>
          <div style={heroBtnContainerStyle}>
            <Link to="/shop" style={primaryBtnStyle}>Shop Now</Link>
            <Link to="/categories" style={secondaryBtnStyle}>Explore Categories</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresSectionStyle}>
        <div className="container" style={featuresContainerStyle}>
          <div style={featureStyle}>
            <div style={featureIconContainerStyle}><Truck size={24} color="#3b82f6" /></div>
            <div>
              <h4 style={featureTitleStyle}>Free Shipping</h4>
              <p style={featureDescStyle}>On all orders over $100</p>
            </div>
          </div>
          <div style={featureStyle}>
            <div style={featureIconContainerStyle}><ShieldCheck size={24} color="#3b82f6" /></div>
            <div>
              <h4 style={featureTitleStyle}>Secure Payment</h4>
              <p style={featureDescStyle}>100% secure checkout</p>
            </div>
          </div>
          <div style={featureStyle}>
            <div style={featureIconContainerStyle}><Star size={24} color="#3b82f6" /></div>
            <div>
              <h4 style={featureTitleStyle}>Premium Quality</h4>
              <p style={featureDescStyle}>Top products guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Featured Categories</h2>
            <Link to="/categories" style={viewAllStyle}>View All <ArrowRight size={16} /></Link>
          </div>
          <div style={categoryGridStyle}>
            {categories.slice(0, 4).map((category, index) => (
              <Link to={`/shop?category=${category}`} key={index} style={categoryCardStyle}>
                <div style={categoryOverlayStyle}></div>
                <h3 style={categoryNameStyle}>{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{...sectionStyle, backgroundColor: '#f8fafc'}}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Trending Products</h2>
            <Link to="/shop" style={viewAllStyle}>View All <ArrowRight size={16} /></Link>
          </div>
          <div style={productGridStyle}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section style={bannerSectionStyle}>
        <div className="container" style={bannerContainerStyle}>
          <div style={bannerContentStyle}>
            <span style={bannerBadgeStyle}>Limited Time Offer</span>
            <h2 style={bannerTitleStyle}>Get 20% Off Your First Order!</h2>
            <p style={bannerSubtitleStyle}>Use coupon code <strong>SAVE20</strong> at checkout to redeem your discount.</p>
            <Link to="/shop" style={bannerBtnStyle}>Shop Now</Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>New Arrivals</h2>
            <Link to="/shop" style={viewAllStyle}>View All <ArrowRight size={16} /></Link>
          </div>
          <div style={productGridStyle}>
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Styles
const heroStyle = { 
  backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80")',
  backgroundSize: 'cover', backgroundPosition: 'center', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
};
const heroContentStyle = { maxWidth: '800px', padding: '0 20px' };
const heroTitleStyle = { color: 'white', fontSize: '56px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' };
const heroSubtitleStyle = { color: '#e2e8f0', fontSize: '20px', marginBottom: '40px', lineHeight: '1.6' };
const heroBtnContainerStyle = { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' };
const primaryBtnStyle = { backgroundColor: '#3b82f6', color: 'white', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '18px', transition: 'background-color 0.2s' };
const secondaryBtnStyle = { backgroundColor: 'transparent', color: 'white', border: '2px solid white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '18px', transition: 'background-color 0.2s' };

const featuresSectionStyle = { borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' };
const featuresContainerStyle = { display: 'flex', justifyContent: 'space-between', padding: '30px 20px', flexWrap: 'wrap', gap: '20px', maxWidth: '1400px', margin: '0 auto' };
const featureStyle = { display: 'flex', alignItems: 'center', gap: '15px' };
const featureIconContainerStyle = { width: '50px', height: '50px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const featureTitleStyle = { margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' };
const featureDescStyle = { margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' };

const sectionStyle = { padding: '80px 20px' };
const sectionHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', maxWidth: '1400px', margin: '0 auto 40px' };
const sectionTitleStyle = { margin: 0, fontSize: '32px', fontWeight: '800', color: '#0f172a' };
const viewAllStyle = { display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600', fontSize: '16px' };

const categoryGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1400px', margin: '0 auto' };
const categoryCardStyle = { height: '240px', borderRadius: '12px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', backgroundColor: '#1e293b' }; // Would use background images in real life based on category
const categoryOverlayStyle = { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', transition: 'background-color 0.3s' };
const categoryNameStyle = { position: 'relative', color: 'white', fontSize: '24px', fontWeight: '700', zIndex: 1 };

const productGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto' };

const bannerSectionStyle = { padding: '80px 20px', backgroundColor: '#0f172a' };
const bannerContainerStyle = { maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center' };
const bannerContentStyle = { textAlign: 'center', color: 'white', maxWidth: '600px' };
const bannerBadgeStyle = { display: 'inline-block', backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '700', marginBottom: '20px' };
const bannerTitleStyle = { fontSize: '42px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' };
const bannerSubtitleStyle = { fontSize: '18px', color: '#cbd5e1', marginBottom: '40px', lineHeight: '1.6' };
const bannerBtnStyle = { display: 'inline-block', backgroundColor: 'white', color: '#0f172a', padding: '16px 40px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '18px' };

export default Home;
