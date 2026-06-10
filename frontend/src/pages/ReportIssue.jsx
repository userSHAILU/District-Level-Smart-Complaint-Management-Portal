import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintAPI } from '../utils/api';

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Road Damage',
    location: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Road Damage', 'Garbage Collection', 'Water Leakage', 'Street Light Problem', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await complaintAPI.createComplaint(formData);
      alert('Complaint submitted successfully!');
      navigate('/my-complaints');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Report a Public Issue</h2>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Issue Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter issue title"
                required
                className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:border-secondary"
              />
              <p className="text-gray-500 text-sm mt-1">e.g., Pothole on Main Street</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail"
                required
                rows="5"
                className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:border-secondary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location address"
                required
                className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Upload Image (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:border-secondary"
              />
              {formData.image && (
                <div className="mt-3">
                  <img src={formData.image} alt="preview" className="max-w-xs rounded" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition disabled:bg-gray-400 w-full"
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportIssue;
