import React, { useState } from 'react';
import { communityAPI } from '../utils/api';
import ComplaintCard from '../components/ComplaintCard';

function NearbyIssues({ user }) {
  const [location, setLocation] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await communityAPI.getComplaintsByLocation(location);
      setComplaints(response.data);
      if (response.data.length === 0) {
        setError('No issues found in this location');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (location.trim()) {
      setError('');
      setLoading(true);
      try {
        const response = await communityAPI.getComplaintsByLocation(location);
        setComplaints(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Nearby Issues</h1>
          <p className="text-xl text-gray-600">
            See civic issues reported in your area and help your community
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-2 border-indigo-100">
          <form onSubmit={handleSearch} className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                Enter Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Hanamkonda, Market Street, Downtown..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex gap-2 items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 flex items-center gap-2"
              >
                <span>🔍</span>
                Search
              </button>
              {location && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50"
                >
                  🔄
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 font-semibold">Fetching issues...</p>
            </div>
          </div>
        )}

        {/* Complaints Grid */}
        {!loading && complaints.length > 0 && (
          <div>
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg border-l-4 border-indigo-600">
              <p className="text-indigo-900 font-bold">
                Found {complaints.length} issue{complaints.length !== 1 ? 's' : ''} in {location}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {complaints.map((complaint) => (
                <ComplaintCard
                  key={complaint._id}
                  complaint={complaint}
                  user={user}
                  onRefresh={handleRefresh}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && location && complaints.length === 0 && !error && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl mb-4">📍</p>
            <p className="text-gray-600 font-semibold">
              No issues reported in this location yet. Be the first to report!
            </p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !location && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-indigo-200">
            <p className="text-4xl mb-4">🔎</p>
            <p className="text-gray-600 font-semibold mb-2">
              Enter a location to view nearby issues
            </p>
            <p className="text-gray-500 text-sm">
              Search by area name, street, or landmark
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NearbyIssues;
