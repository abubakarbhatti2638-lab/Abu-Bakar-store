export const categories = [
  "Electronics", "Fashion", "Shoes", "Watches", "Bags", "Beauty", "Home & Living", "Accessories"
];

const brands = ["ShopSphere", "TechPro", "StyleCo", "LuxeTime", "GlowUp", "HomeEssentials", "UrbanWear"];
const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "White", "Blue", "Red", "Silver", "Gold"];

const generateProducts = () => {
  const products = [];
  const items = [
    { name: "Wireless Noise-Canceling Headphones", cat: "Electronics", price: 299.99, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { name: "Minimalist Leather Watch", cat: "Watches", price: 149.00, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
    { name: "Smart Fitness Tracker", cat: "Electronics", price: 99.50, img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80" },
    { name: "Classic Denim Jacket", cat: "Fashion", price: 79.99, img: "https://images.unsplash.com/photo-1551537482-f209bfc73304?w=500&q=80" },
    { name: "Running Sneakers", cat: "Shoes", price: 129.99, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
    { name: "Leather Crossbody Bag", cat: "Bags", price: 189.00, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
    { name: "Hydrating Face Serum", cat: "Beauty", price: 45.00, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80" },
    { name: "Ceramic Coffee Mug", cat: "Home & Living", price: 18.50, img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80" },
    { name: "Polarized Sunglasses", cat: "Accessories", price: 85.00, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80" },
    { name: "Mechanical Gaming Keyboard", cat: "Electronics", price: 159.99, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },
    { name: "Cotton Crewneck T-Shirt", cat: "Fashion", price: 24.99, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
    { name: "Smart Home Speaker", cat: "Electronics", price: 119.00, img: "https://images.unsplash.com/photo-1589003071536-46c00af166d9?w=500&q=80" },
    { name: "Canvas Tote Bag", cat: "Bags", price: 35.00, img: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=500&q=80" },
    { name: "Scented Soy Candle", cat: "Home & Living", price: 22.00, img: "https://images.unsplash.com/photo-1602874801007-bd458cb6c975?w=500&q=80" },
    { name: "Silver Pendant Necklace", cat: "Accessories", price: 65.00, img: "https://images.unsplash.com/photo-1599643478524-fb66fa5320e5?w=500&q=80" },
    { name: "Men's Oxford Shoes", cat: "Shoes", price: 110.00, img: "https://images.unsplash.com/photo-1614252339460-e17f54c9523e?w=500&q=80" },
    { name: "Digital SLR Camera", cat: "Electronics", price: 899.00, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
    { name: "Matte Lipstick Set", cat: "Beauty", price: 48.00, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80" },
    { name: "Vintage Aviator Watch", cat: "Watches", price: 215.00, img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80" },
    { name: "Knitted Throw Blanket", cat: "Home & Living", price: 55.00, img: "https://images.unsplash.com/photo-1580136608260-4ebf15bac3e3?w=500&q=80" },
    { name: "Travel Backpack", cat: "Bags", price: 89.99, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
    { name: "Yoga Mat", cat: "Home & Living", price: 32.00, img: "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?w=500&q=80" },
    { name: "Women's Ankle Boots", cat: "Shoes", price: 135.00, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80" },
    { name: "Wireless Charging Pad", cat: "Electronics", price: 39.99, img: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500&q=80" },
    { name: "Silk Sleep Mask", cat: "Accessories", price: 18.00, img: "https://images.unsplash.com/photo-1594911221710-18408f654f1f?w=500&q=80" },
    { name: "Men's Casual Shirt", cat: "Fashion", price: 45.00, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80" },
    { name: "Facial Cleansing Brush", cat: "Beauty", price: 85.00, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80" },
    { name: "Gold Hoop Earrings", cat: "Accessories", price: 55.00, img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&q=80" },
    { name: "Smart Thermostat", cat: "Home & Living", price: 199.00, img: "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=500&q=80" },
    { name: "Duffel Gym Bag", cat: "Bags", price: 49.99, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" }
  ];

  for (let i = 0; i < 30; i++) {
    const item = items[i];
    const discount = i % 3 === 0 ? Math.floor(Math.random() * 20) + 10 : 0; // Random discount between 10-30% for 1/3 of items
    const priceWithDiscount = discount > 0 ? Number((item.price * (1 - discount / 100)).toFixed(2)) : item.price;
    
    products.push({
      id: (i + 1).toString(),
      name: item.name,
      category: item.cat,
      brand: brands[i % brands.length],
      description: `Premium ${item.name.toLowerCase()} designed for durability and performance. Shop quality products at great prices.`,
      price: priceWithDiscount,
      originalPrice: item.price, // For showing struck-through original price
      discount: discount,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // Rating between 3.5 and 5.0
      reviews: Math.floor(Math.random() * 500) + 10,
      image: item.img,
      images: [item.img, item.img, item.img], // Simulated gallery
      colors: item.cat === "Fashion" || item.cat === "Bags" ? [colors[0], colors[1], colors[2]] : null,
      sizes: item.cat === "Fashion" || item.cat === "Shoes" ? sizes : null,
      stock: i === 4 ? 0 : Math.floor(Math.random() * 100) + 1, // Make one item out of stock
      featured: i < 5,
      newArrival: i > 25,
      isNew: i > 25
    });
  }
  return products;
};

export const products = generateProducts();
