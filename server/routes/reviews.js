const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/reviews — protected (admin reads)
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/reviews — public (customer submits)
router.post('/', async (req, res) => {
  try {
    const { rating, feedbackText } = req.body;
    if (!rating || !feedbackText) {
      return res.status(400).json({ error: 'rating and feedbackText are required.' });
    }
    const review = new Review({ rating, feedbackText });
    await review.save();
    res.status(201).json({ message: 'Thank you for your feedback!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/reviews/:id — protected (admin moderates)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found.' });
    res.json({ message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
