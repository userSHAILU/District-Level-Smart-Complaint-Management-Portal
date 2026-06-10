const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const comments = await Comment.find({ complaint: complaintId })
      .sort({ createdAt: -1 })
      .populate('user', 'username email');

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    const username = req.user.username;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const comment = new Comment({
      text: text.trim(),
      complaint: complaintId,
      user: userId,
      username,
    });

    await comment.save();
    const populatedComment = await comment.populate('user', 'username email');

    res.status(201).json({ comment: populatedComment, message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Allow deletion only by comment creator or admin
    if (comment.user.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.deleteOne({ _id: commentId });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};
