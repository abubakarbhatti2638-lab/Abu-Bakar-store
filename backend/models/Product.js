const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  SKU: { type: String },
  images: [String],
  colors: [String],
  sizes: [String],
  brand: { type: String },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);