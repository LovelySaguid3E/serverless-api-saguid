const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        post: req.body.post,
        commenter: req.body.commenter,
        content: req.body.content
    });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
