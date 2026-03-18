const express = require('express');
const Offer = require('../models/Offer');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/offers — public
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/offers — protected
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, discountPercentage } = req.body;
    if (!title || !description || discountPercentage == null) {
      return res.status(400).json({ error: 'title, description, and discountPercentage are required.' });
    }
    const offer = new Offer({ title, description, discountPercentage });
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/offers/:id — protected
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, discountPercentage } = req.body;
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { title, description, discountPercentage },
      { new: true, runValidators: true }
    );
    if (!offer) return res.status(404).json({ error: 'Offer not found.' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/offers/:id — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found.' });
    res.json({ message: 'Offer deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
