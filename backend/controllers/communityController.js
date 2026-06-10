const Complaint = require('../models/Complaint');

// Get all complaints by location (for community interaction)
exports.getComplaintsByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    console.log(`[Community] Searching for complaints in location: "${location}"`);

    // Find complaints with the same location (case-insensitive)
    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' },
    })
      .populate('createdBy', 'username email')
      .populate('resolvedBy', 'username')
      .populate('likes', 'username')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 });

    console.log(`[Community] Found ${complaints.length} complaints for location: "${location}"`);

    res.json(complaints);
  } catch (error) {
    console.error(`[Community] Error fetching complaints:`, error);
    res.status(500).json({ message: 'Failed to fetch complaints: ' + error.message });
  }
};

// Add a comment to a complaint
exports.addComment = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Add comment
    complaint.comments.push({
      user: userId,
      text: text.trim(),
      createdAt: new Date(),
    });

    await complaint.save();

    // Populate comment user info before responding
    await complaint.populate('comments.user', 'username');

    res.status(201).json({
      message: 'Comment added successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike a complaint
exports.toggleLike = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const userId = req.user.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if user already liked
    const likeIndex = complaint.likes.findIndex(
      (like) => like.toString() === userId
    );

    if (likeIndex > -1) {
      // Unlike
      complaint.likes.splice(likeIndex, 1);
    } else {
      // Like
      complaint.likes.push(userId);
    }

    await complaint.save();

    res.json({
      message: likeIndex > -1 ? 'Unliked successfully' : 'Liked successfully',
      isLiked: likeIndex === -1,
      likes: complaint.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload additional evidence image
exports.uploadEvidenceImage = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Add image to additional images
    if (!complaint.additionalImages) {
      complaint.additionalImages = [];
    }
    complaint.additionalImages.push(imageUrl);

    await complaint.save();

    res.status(201).json({
      message: 'Evidence image uploaded successfully',
      additionalImages: complaint.additionalImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { complaintId, commentId } = req.params;
    const userId = req.user.id;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Find the comment
    const comment = complaint.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the comment author
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    complaint.comments.id(commentId).remove();
    await complaint.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get complaint details with all interactions
exports.getComplaintDetails = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findById(complaintId)
      .populate('createdBy', 'username email')
      .populate('resolvedBy', 'username')
      .populate('likes', 'username')
      .populate('comments.user', 'username');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
