const express = require('express');
const Category = require('../models/category');

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
