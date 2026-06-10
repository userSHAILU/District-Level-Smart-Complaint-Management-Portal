const Complaint = require('../models/Complaint');

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, image } = req.body;

    const complaint = new Complaint({
      title,
      description,
      category,
      location,
      image,
      createdBy: req.user.id,
    });

    await complaint.save();
    await complaint.populate('createdBy', 'username email');

    res.status(201).json({
      message: 'Complaint created successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints (for admin)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('createdBy', 'username email')
      .populate('resolvedBy', 'username')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Complaints retrieved successfully',
      complaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id })
      .populate('createdBy', 'username email')
      .populate('resolvedBy', 'username')
      .sort({ createdAt: -1 });

    res.json({
      message: 'User complaints retrieved successfully',
      complaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single complaint
exports.getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('resolvedBy', 'username');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint retrieved successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update complaint status (admin only)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminNotes, resolutionImage, resolutionMessage } = req.body;

    const updateData = {
      status,
      adminNotes,
    };

    // If marking as resolved, add resolution details
    if (status === 'Resolved') {
      updateData.resolvedBy = req.user.id;
      updateData.resolvedAt = new Date();
      if (resolutionImage) updateData.resolutionImage = resolutionImage;
      if (resolutionMessage) updateData.resolutionMessage = resolutionMessage;
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate('createdBy', 'username email')
      .populate('resolvedBy', 'username');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint updated successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint deleted successfully',
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
