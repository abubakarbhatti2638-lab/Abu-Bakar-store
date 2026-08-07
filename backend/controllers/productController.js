const Product = require('../models/Product');

// @desc    Fetch all products (with search, filter, sort)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { keyword, category, sort } = req.query;

    // Search query
    const query = {};
    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    // Sort configuration
    let sortConfig = {};
    if (sort === 'price_asc') sortConfig.price = 1;
    else if (sort === 'price_desc') sortConfig.price = -1;
    else if (sort === 'newest') sortConfig.createdAt = -1;
    else sortConfig.createdAt = -1; // Default

    const products = await Product.find(query).sort(sortConfig);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
