const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  discountPercentage: { type: Number, required: true, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Offer', offerSchema);
