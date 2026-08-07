const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');

// All routes here should be protected and admin-only
router.use(protect);
router.use(admin);

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue from delivered/completed orders (simplification)
    const orders = await Order.find({ status: { $in: ['Delivered', 'Completed'] } });
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });

    // Mock chart data for now
    const revenueData = [
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 5000 },
      { name: 'Apr', value: 4500 },
      { name: 'May', value: 6000 },
      { name: 'Jun', value: 5500 },
    ];

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      revenueData
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});

// Products CRUD scaffolds
router.get('/products', async (req, res) => { /* Get all */ });
router.post('/products', async (req, res) => { /* Create */ });
router.put('/products/:id', async (req, res) => { /* Update */ });
router.delete('/products/:id', async (req, res) => { /* Delete */ });

module.exports = router;
