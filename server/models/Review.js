const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedbackText: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Auto-delete oldest reviews when count exceeds 50
reviewSchema.post('save', async function () {
  const Review = mongoose.model('Review');
  const count = await Review.countDocuments();
  if (count > 50) {
    const excess = count - 50;
    const oldest = await Review.find().sort({ createdAt: 1 }).limit(excess).select('_id');
    const ids = oldest.map((r) => r._id);
    await Review.deleteMany({ _id: { $in: ids } });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
