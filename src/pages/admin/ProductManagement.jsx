import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Mock fetching products
    setTimeout(() => {
      setProducts([
        { _id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45, status: 'active', SKU: 'WH-001' },
        { _id: '2', name: 'Cotton T-Shirt', category: 'Clothing', price: 19.99, stock: 120, status: 'active', SKU: 'TS-002' },
        { _id: '3', name: 'Smart Watch', category: 'Electronics', price: 199.99, stock: 8, status: 'low_stock', SKU: 'SW-003' },
        { _id: '4', name: 'Running Shoes', category: 'Footwear', price: 89.99, stock: 0, status: 'out_of_stock', SKU: 'RS-004' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.SKU.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== id));
      // Call API to delete
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Product Management</h1>
          <p>Manage your store's inventory and product details.</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()} style={btnStyle}>
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="admin-table-controls" style={controlStyle}>
        <div className="search-box" style={searchBoxStyle}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..." 
            value={searchTerm}
            onChange={handleSearch}
            style={inputStyle}
          />
        </div>
        <button className="btn-secondary" style={btnSecondaryStyle}>
          <Filter size={20} /> Filter
        </button>
      </div>

      <div className="table-container" style={tableContainerStyle}>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading products...</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Product Info</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id} style={trStyle}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>SKU: {product.SKU}</div>
                  </td>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>${product.price.toFixed(2)}</td>
                  <td style={tdStyle}>{product.stock}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      backgroundColor: product.stock > 10 ? 'rgba(16, 185, 129, 0.1)' : (product.stock > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
                      color: product.stock > 10 ? '#10b981' : (product.stock > 0 ? '#f59e0b' : '#ef4444')
                    }}>
                      {product.stock > 10 ? 'In Stock' : (product.stock > 0 ? 'Low Stock' : 'Out of Stock')}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openModal(product)} style={actionBtnStyle} title="Edit"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(product._id)} style={{...actionBtnStyle, color: '#ef4444'}} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Basic Modal Implementation */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <p>Modal form would go here with all fields (Name, Category, Price, etc.)</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={closeModal} style={btnSecondaryStyle}>Cancel</button>
              <button style={btnStyle}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for speed, would normally go in admin.css
const btnStyle = { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' };
const btnSecondaryStyle = { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#334155', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' };
const controlStyle = { display: 'flex', gap: '16px', marginBottom: '24px' };
const searchBoxStyle = { flex: 1, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#1e293b', padding: '10px 16px', borderRadius: '8px', border: '1px solid #334155' };
const inputStyle = { backgroundColor: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' };
const tableContainerStyle = { backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
const thStyle = { padding: '16px 24px', borderBottom: '1px solid #334155', color: '#94a3b8', fontWeight: '500' };
const trStyle = { borderBottom: '1px solid #334155', transition: 'background-color 0.2s' };
const tdStyle = { padding: '16px 24px', verticalAlign: 'middle' };
const actionBtnStyle = { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' };
const modalContentStyle = { backgroundColor: '#1e293b', padding: '32px', borderRadius: '16px', width: '90%', maxWidth: '600px', border: '1px solid #334155' };

export default ProductManagement;
