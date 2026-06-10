import React, { useState, useEffect } from 'react';
import { complaintAPI } from '../utils/api';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [updateForm, setUpdateForm] = useState({
    status: 'Pending',
    adminNotes: '',
    resolutionMessage: '',
    resolutionImage: '',
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getAllComplaints();
      setComplaints(response.data.complaints);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailModal(true);
  };

  const handleEditComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateForm({
      status: complaint.status,
      adminNotes: complaint.adminNotes || '',
      resolutionMessage: complaint.resolutionMessage || '',
      resolutionImage: complaint.resolutionImage || '',
    });
    setShowUpdateModal(true);
  };

  const handleUpdateComplaint = async () => {
    if (!selectedComplaint) return;

    try {
      const updateData = {
        status: updateForm.status,
        adminNotes: updateForm.adminNotes,
      };

      if (updateForm.status === 'Resolved') {
        updateData.resolutionMessage = updateForm.resolutionMessage;
        updateData.resolutionImage = updateForm.resolutionImage;
      }

      await complaintAPI.updateComplaintStatus(selectedComplaint._id, updateData);
      setSuccessMessage('Complaint updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchComplaints();
      setShowUpdateModal(false);
      setSelectedComplaint(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update complaint');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Road Damage': '🛣️',
      'Garbage Collection': '🗑️',
      'Water Leakage': '💧',
      'Street Light Problem': '💡',
      'Other': '📋',
    };
    return icons[category] || '📋';
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    inProgress: complaints.filter((c) => c.status === 'In Progress').length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length,
  };

  // Filter complaints based on status and search
  const filteredComplaints = complaints.filter((complaint) => {
    const statusMatch = filterStatus === 'All' || complaint.status === filterStatus;
    const searchMatch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.createdBy?.username.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">Manage and resolve citizen complaints</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <p className="text-green-700 font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold text-lg">Total Complaints</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{stats.total}</p>
              </div>
              <div className="text-5xl opacity-20">📋</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-yellow-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold text-lg">Pending</p>
                <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="text-5xl opacity-20">⏳</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold text-lg">In Progress</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
              </div>
              <div className="text-5xl opacity-20">⚙️</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold text-lg">Resolved</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{stats.resolved}</p>
              </div>
              <div className="text-5xl opacity-20">✅</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by title, location, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Complaints</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">Category</th>
                  <th className="px-6 py-4 text-left font-semibold">Location</th>
                  <th className="px-6 py-4 text-left font-semibold">Submitted By</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 text-lg">
                      No complaints found
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((complaint, index) => (
                    <tr key={complaint._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-700 font-mono text-sm">#{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCategoryIcon(complaint.category)}</span>
                          <span className="font-semibold text-gray-900 line-clamp-1">{complaint.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{complaint.category}</td>
                      <td className="px-6 py-4 text-gray-700">{complaint.location}</td>
                      <td className="px-6 py-4 text-gray-700">{complaint.createdBy?.username}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-full font-semibold text-sm border ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleViewDetails(complaint)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditComplaint(complaint)}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105 text-sm"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">Complaint Details</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-3xl hover:text-gray-200">×</button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Complaint ID</p>
                  <p className="text-gray-900 text-lg font-mono">{selectedComplaint._id}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Status</p>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm border inline-block ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-gray-600 font-semibold text-sm mb-2">Title</p>
                <p className="text-gray-900 text-xl font-bold">{selectedComplaint.title}</p>
              </div>

              <div>
                <p className="text-gray-600 font-semibold text-sm mb-2">Description</p>
                <p className="text-gray-700 text-base leading-relaxed">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.image && (
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-2">Complaint Image</p>
                  <img src={selectedComplaint.image} alt="complaint" className="w-full rounded-lg max-h-64 object-cover" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Category</p>
                  <p className="text-gray-900 text-base">{selectedComplaint.category}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Location</p>
                  <p className="text-gray-900 text-base">{selectedComplaint.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Submitted By</p>
                  <p className="text-gray-900 text-base">{selectedComplaint.createdBy?.username}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Date Submitted</p>
                  <p className="text-gray-900 text-base">{new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedComplaint.adminNotes && (
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-2">Admin Notes</p>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">{selectedComplaint.adminNotes}</p>
                </div>
              )}

              {selectedComplaint.status === 'Resolved' && selectedComplaint.resolutionMessage && (
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-2">Resolution Message</p>
                  <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-200">{selectedComplaint.resolutionMessage}</p>
                </div>
              )}

              {selectedComplaint.status === 'Resolved' && selectedComplaint.resolutionImage && (
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-2">Resolution Proof</p>
                  <img src={selectedComplaint.resolutionImage} alt="resolution" className="w-full rounded-lg max-h-64 object-cover" />
                </div>
              )}

              <button
                onClick={() => { setShowDetailModal(false); handleEditComplaint(selectedComplaint); }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Update This Complaint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">Update Complaint</h3>
              <button onClick={() => setShowUpdateModal(false)} className="text-3xl hover:text-gray-200">×</button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <p className="text-gray-900 font-bold text-lg mb-2">{selectedComplaint.title}</p>
                <p className="text-gray-600 text-sm">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.image && (
                <div>
                  <img src={selectedComplaint.image} alt="complaint" className="w-full rounded-lg max-h-48 object-cover" />
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-bold mb-3 text-lg">Update Status</label>
                <select
                  value={updateForm.status}
                  onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base font-semibold"
                >
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">⚙️ In Progress</option>
                  <option value="Resolved">✅ Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-3 text-lg">Admin Notes</label>
                <textarea
                  value={updateForm.adminNotes}
                  onChange={(e) => setUpdateForm({ ...updateForm, adminNotes: e.target.value })}
                  placeholder="Add notes about the complaint..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                />
              </div>

              {updateForm.status === 'Resolved' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-bold mb-3 text-lg">Resolution Message</label>
                    <textarea
                      value={updateForm.resolutionMessage}
                      onChange={(e) => setUpdateForm({ ...updateForm, resolutionMessage: e.target.value })}
                      placeholder="Message to show citizen about the resolution..."
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base bg-green-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-3 text-lg">Resolution Proof Image URL (optional)</label>
                    <input
                      type="text"
                      value={updateForm.resolutionImage}
                      onChange={(e) => setUpdateForm({ ...updateForm, resolutionImage: e.target.value })}
                      placeholder="Paste image URL showing the resolved issue..."
                      className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base bg-green-50"
                    />
                    {updateForm.resolutionImage && (
                      <div className="mt-4">
                        <img src={updateForm.resolutionImage} alt="preview" className="w-full rounded-lg max-h-48 object-cover" />
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateComplaint}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
                >
                  Update Complaint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
