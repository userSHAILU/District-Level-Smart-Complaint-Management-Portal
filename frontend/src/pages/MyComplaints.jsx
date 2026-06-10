import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../utils/api';

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await complaintAPI.getUserComplaints();
      setComplaints(response.data.complaints);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-white';
      case 'In Progress':
        return 'bg-blue-500 text-white';
      case 'Resolved':
        return 'bg-success text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Complaints</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {complaints.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You haven't submitted any complaints yet.</p>
            <Link to="/report-issue" className="text-secondary font-bold hover:underline">
              Submit your first complaint
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{complaint.title}</h3>
                  <span className={`px-3 py-1 rounded font-semibold text-sm ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{complaint.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-semibold">{complaint.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-semibold">{complaint.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="font-semibold">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                  </div>
                  {complaint.adminNotes && (
                    <div>
                      <p className="text-gray-500">Admin Notes</p>
                      <p className="font-semibold text-sm">{complaint.adminNotes}</p>
                    </div>
                  )}
                </div>
                <Link to={`/complaint/${complaint._id}`} className="text-secondary font-bold hover:underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaints;
