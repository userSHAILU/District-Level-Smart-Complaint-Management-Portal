const express = require('express');
const auth = require('../middleware/auth');
const {
  getComplaintsByLocation,
  addComment,
  toggleLike,
  uploadEvidenceImage,
  deleteComment,
  getComplaintDetails,
} = require('../controllers/communityController');

const router = express.Router();

// Get complaints by location - MUST be before :complaintId route
router.get('/nearby', getComplaintsByLocation);

// Get complaint details with all interactions
router.get('/:complaintId', auth, getComplaintDetails);

// Add comment to complaint
router.post('/:complaintId/comment', auth, addComment);

// Delete comment from complaint
router.delete('/:complaintId/comment/:commentId', auth, deleteComment);

// Toggle like on complaint
router.post('/:complaintId/like', auth, toggleLike);

// Upload evidence image
router.post('/:complaintId/evidence', auth, uploadEvidenceImage);

module.exports = router;
