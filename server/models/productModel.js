const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountedPrice: Number,
  thumbnail: String,
  category: String,
  group: String,
  rating: Number,
  color: String,
  sport: String,
  condition: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
