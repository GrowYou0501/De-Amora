const express = require('express');
const Menu = require('../models/Menu');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/menu — public
router.get('/', async (req, res) => {
  try {
    const items = await Menu.find().sort({ category: 1, name: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/menu — protected
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, category, sizes } = req.body;
    if (!name || !category || !sizes || !sizes.length) {
      return res.status(400).json({ error: 'name, category, and sizes are required.' });
    }
    const item = new Menu({ name, description, category, sizes });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/menu/:id — protected
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, category, sizes } = req.body;
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, description, category, sizes },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/menu/:id — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    res.json({ message: 'Item deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
