const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name').populate('category', 'name').populate('tags', 'name');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});

// CREATE a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        tags: req.body.tags
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a post
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }
    if (req.body.content != null) {
        res.post.content = req.body.content;
    }
    if (req.body.category != null) {
        res.post.category = req.body.category;
    }
    if (req.body.tags != null) {
        res.post.tags = req.body.tags;
    }
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single post by ID
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.post = post;
    next();
}

module.exports = router;
