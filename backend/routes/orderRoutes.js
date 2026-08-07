const express = require('express');
const router = express.Router();
const { getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/myorders', protect, getMyOrders);

module.exports = router;
