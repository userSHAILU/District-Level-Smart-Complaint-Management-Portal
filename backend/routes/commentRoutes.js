const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Get all comments for a complaint (public)
router.get('/', commentController.getComments);

// Create a comment (authenticated)
router.post('/', auth, commentController.createComment);

// Delete a comment (authenticated)
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
