const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./backend/models/Product');
const User = require('./backend/models/User');

dotenv.config({ path: './backend/.env' });

const seedProducts = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    stock: 45,
    SKU: 'AUDIO-001',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80']
  },
  {
    name: 'Minimalist Cotton T-Shirt',
    category: 'Clothing',
    description: '100% organic cotton t-shirt with a relaxed fit. Perfect for everyday wear.',
    price: 24.99,
    stock: 120,
    SKU: 'APP-TS-01',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80']
  },
  {
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    description: 'Track your workouts, heart rate, and sleep with this sleek smartwatch.',
    price: 149.99,
    stock: 5,
    SKU: 'ELEC-W-02',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80']
  },
  {
    name: 'Professional Chef Knife',
    category: 'Home & Kitchen',
    description: '8-inch high-carbon stainless steel chef knife. Exceptionally sharp and durable.',
    price: 89.99,
    stock: 30,
    SKU: 'KIT-KN-01',
    images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&q=80']
  }
];

const seedDB = async () => {
  try {
    // Attempt connection
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopsphere');
    console.log('MongoDB Connected for Seeding');

    // Clear existing
    await Product.deleteMany({});
    
    // Insert products
    await Product.insertMany(seedProducts);
    console.log('Products seeded successfully!');

    // Create an Admin user if none exists
    const adminExists = await User.findOne({ email: 'admin@shopsphere.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@shopsphere.com',
        password: 'password123', // Will be hashed by pre-save hook
        role: 'admin'
      });
      console.log('Admin user created (admin@shopsphere.com / password123)');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
