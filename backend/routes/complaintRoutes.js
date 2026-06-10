const express = require('express');
const complaintController = require('../controllers/complaintController');
const commentRoutes = require('./commentRoutes');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Public routes
router.post('/', auth, complaintController.createComplaint);
router.get('/user/my-complaints', auth, complaintController.getUserComplaints);
router.get('/:id', auth, complaintController.getComplaint);

// Comments routes (nested)
router.use('/:complaintId/comments', commentRoutes);

// Admin routes
router.get('/', adminAuth, complaintController.getAllComplaints);
router.put('/:id', adminAuth, complaintController.updateComplaintStatus);
router.delete('/:id', auth, complaintController.deleteComplaint);

module.exports = router;
