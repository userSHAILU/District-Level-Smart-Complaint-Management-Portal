import React, { useState } from 'react';
import CommentsSection from './CommentsSection';
import { communityAPI } from '../utils/api';

function ComplaintCard({ complaint, user, onRefresh }) {
  const [isLiked, setIsLiked] = useState(
    user ? complaint.likes.some((like) => like._id === user.id) : false
  );
  const [likesCount, setLikesCount] = useState(complaint.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [showEvidenceUpload, setShowEvidenceUpload] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [uploadingEvidence, setUploadingEvidence] = useState(false);
  const [showAllEvidence, setShowAllEvidence] = useState(false);

  const categoryEmojis = {
    'Road Damage': '🛣️',
    'Garbage Collection': '🗑️',
    'Water Leakage': '💧',
    'Street Light Problem': '💡',
    'Other': '❓',
  };

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
    'Resolved': 'bg-green-100 text-green-800 border-green-300',
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like this issue');
      return;
    }

    try {
      const response = await communityAPI.toggleLike(complaint._id);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likes);
    } catch (err) {
      alert('Failed to like issue');
    }
  };

  const handleUploadEvidence = async (e) => {
    e.preventDefault();

    if (!evidenceUrl.trim()) {
      alert('Please enter an image URL');
      return;
    }

    setUploadingEvidence(true);

    try {
      await communityAPI.uploadEvidenceImage(complaint._id, evidenceUrl);
      setEvidenceUrl('');
      setShowEvidenceUpload(false);
      onRefresh();
    } catch (err) {
      alert('Failed to upload evidence');
    } finally {
      setUploadingEvidence(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border-2 border-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryEmojis[complaint.category]}</span>
              <h3 className="text-2xl font-bold">{complaint.title}</h3>
            </div>
            <p className="text-indigo-100 text-sm">{complaint.category}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full font-bold border-2 ${
              statusColors[complaint.status]
            }`}
          >
            {complaint.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-gray-600 font-semibold">
            📍 {complaint.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">{complaint.description}</p>

        {/* Reported By */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Reported by:</span> {complaint.createdBy?.username}
          <br />
          <span className="font-semibold">Date:</span>{' '}
          {new Date(complaint.createdAt).toLocaleDateString()}
        </div>

        {/* Original Image */}
        {complaint.image && (
          <div className="mb-4">
            <p className="text-gray-600 font-semibold mb-2">📸 Original Image</p>
            <img
              src={complaint.image}
              alt="complaint"
              className="w-full rounded-lg max-h-64 object-cover shadow-md"
            />
          </div>
        )}

        {/* Additional Evidence Images */}
        {complaint.additionalImages && complaint.additionalImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 font-semibold">
                📷 Community Evidence ({complaint.additionalImages.length})
              </p>
              {complaint.additionalImages.length > 2 && (
                <button
                  onClick={() => setShowAllEvidence(!showAllEvidence)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                >
                  {showAllEvidence ? 'Show Less' : 'Show All'}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {complaint.additionalImages
                .slice(0, showAllEvidence ? undefined : 2)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`evidence-${idx}`}
                    className="w-full rounded-lg max-h-40 object-cover shadow-md hover:shadow-lg transition"
                  />
                ))}
            </div>
          </div>
        )}

        {/* Admin Notes and Resolution */}
        {complaint.adminNotes && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
            <p className="text-gray-600 font-semibold mb-2">👨‍💼 Admin Notes</p>
            <p className="text-gray-800">{complaint.adminNotes}</p>
          </div>
        )}

        {complaint.status === 'Resolved' && (
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300 mb-4">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">✅</span>
              <h4 className="text-lg font-bold text-green-700">Issue Resolved!</h4>
            </div>

            {complaint.resolvedBy && (
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Resolved by:</span>{' '}
                {complaint.resolvedBy?.username}
              </p>
            )}

            {complaint.resolutionMessage && (
              <div className="mt-3 p-3 bg-white rounded border border-green-200">
                <p className="text-gray-600 font-semibold mb-1">Resolution Details:</p>
                <p className="text-gray-800">{complaint.resolutionMessage}</p>
              </div>
            )}

            {complaint.resolutionImage && (
              <div className="mt-3">
                <p className="text-gray-600 font-semibold mb-2">Proof of Resolution:</p>
                <img
                  src={complaint.resolutionImage}
                  alt="resolution"
                  className="w-full rounded-lg max-h-48 object-cover shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interaction Buttons */}
      <div className="bg-gray-50 border-t border-gray-200 p-6">
        <div className="flex flex-wrap gap-3">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={!user}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              isLiked
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span>👍</span>
            {likesCount} Like{likesCount !== 1 ? 's' : ''}
          </button>

          {/* Comments Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            <span>💬</span>
            {complaint.comments.length} Comment{complaint.comments.length !== 1 ? 's' : ''}
          </button>

          {/* Upload Evidence Button */}
          {user && (
            <button
              onClick={() => setShowEvidenceUpload(!showEvidenceUpload)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-purple-500 text-white hover:bg-purple-600 transition"
            >
              <span>📷</span>
              Upload Evidence
            </button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200">
          <CommentsSection
            complaintId={complaint._id}
            comments={complaint.comments}
            user={user}
            onRefresh={onRefresh}
          />
        </div>
      )}

      {/* Evidence Upload Form */}
      {showEvidenceUpload && (
        <div className="border-t border-gray-200 bg-purple-50 p-6">
          <h4 className="text-lg font-bold mb-4 text-gray-900">Upload Evidence Image</h4>
          <form onSubmit={handleUploadEvidence} className="space-y-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="Paste image URL here..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                💡 Paste a direct image URL (e.g., from Imgur, Cloudinary, or similar)
              </p>
            </div>

            {evidenceUrl && (
              <div className="p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={evidenceUrl}
                  alt="preview"
                  className="w-full rounded max-h-40 object-cover"
                  onError={() => alert('Invalid image URL')}
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={uploadingEvidence}
                className="flex-1 bg-purple-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                {uploadingEvidence ? 'Uploading...' : 'Upload Evidence'}
              </button>
              <button
                type="button"
                onClick={() => setShowEvidenceUpload(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ComplaintCard;
