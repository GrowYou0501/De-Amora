const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  sizes: { type: [sizeSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

menuSchema.index({ category: 1 });

module.exports = mongoose.model('Menu', menuSchema);
