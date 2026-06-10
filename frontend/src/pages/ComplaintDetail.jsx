import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintAPI, commentAPI } from '../utils/api';

function ComplaintDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchComplaintAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchComplaintAndComments = async () => {
    try {
      const complaintResponse = await complaintAPI.getComplaint(id);
      setComplaint(complaintResponse.data.complaint);
      
      const commentsResponse = await commentAPI.getComments(id);
      setComments(commentsResponse.data.comments);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login to add a comment');
      return;
    }

    if (!commentText.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await commentAPI.createComment(id, { text: commentText });
      setComments([response.data.comment, ...comments]);
      setCommentText('');
      setSuccessMessage('Comment added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await commentAPI.deleteComment(id, commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
      setSuccessMessage('Comment deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
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
    return <div className="flex justify-center items-center h-96 text-lg">Loading...</div>;
  }

  if (error && !complaint) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!complaint) {
    return <div className="flex justify-center items-center h-96 text-lg">Complaint not found</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/my-complaints')}
          className="text-secondary font-bold mb-6 hover:underline text-lg"
        >
          ← Back to My Complaints
        </button>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold">{complaint.title}</h2>
            <span className={`px-4 py-2 rounded font-semibold text-lg ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>

          {complaint.image && (
            <div className="mb-6">
              <img src={complaint.image} alt="complaint" className="w-full rounded-lg max-h-96 object-cover shadow-md" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 font-semibold text-sm">Category</p>
              <p className="text-gray-800 text-lg">{complaint.category}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold text-sm">Location</p>
              <p className="text-gray-800 text-lg">{complaint.location}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold text-sm">Submitted By</p>
              <p className="text-gray-800 text-lg">{complaint.createdBy?.username}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold text-sm">Submitted Date</p>
              <p className="text-gray-800 text-lg">{new Date(complaint.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 font-semibold mb-2 text-base">Description</p>
            <p className="text-gray-800 whitespace-pre-wrap text-base leading-relaxed">{complaint.description}</p>
          </div>

          {complaint.adminNotes && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <p className="text-gray-600 font-semibold mb-2">Admin Notes</p>
              <p className="text-gray-800">{complaint.adminNotes}</p>
            </div>
          )}

          {complaint.status === 'Resolved' && (
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300 mb-4">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">✅</span>
                <h4 className="text-2xl font-bold text-green-700">Issue Resolved!</h4>
              </div>

              {complaint.resolvedBy && (
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Resolved By:</span> {complaint.resolvedBy?.username}
                </p>
              )}

              {complaint.resolvedAt && (
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Date Resolved:</span> {new Date(complaint.resolvedAt).toLocaleDateString()}
                </p>
              )}

              {complaint.resolutionMessage && (
                <div className="mt-4 p-4 bg-white rounded border border-green-200">
                  <p className="text-gray-600 font-semibold mb-2">Resolution Message:</p>
                  <p className="text-gray-800">{complaint.resolutionMessage}</p>
                </div>
              )}

              {complaint.resolutionImage && (
                <div className="mt-4">
                  <p className="text-gray-600 font-semibold mb-3">Resolution Proof:</p>
                  <img src={complaint.resolutionImage} alt="resolution" className="w-full rounded-lg max-h-80 object-cover shadow-lg" />
                </div>
              )}
            </div>
          )}

          {complaint.resolvedBy && !complaint.resolutionMessage && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-gray-600 font-semibold">Resolved By</p>
              <p className="text-gray-800">{complaint.resolvedBy?.username}</p>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-3xl font-bold mb-8 flex items-center">
            <span className="mr-3">💬</span> Comments {comments.length > 0 && `(${comments.length})`}
          </h3>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <p className="text-green-700 font-semibold">{successMessage}</p>
            </div>
          )}

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleAddComment} className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-gray-700 font-semibold mb-3">Add your comment:</p>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts or provide additional information..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none text-base"
                rows="4"
              />
              <button
                type="submit"
                disabled={submittingComment}
                className="mt-4 bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 text-base"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-700 font-semibold text-lg mb-4">Please log in to post a comment</p>
              <a href="/login" className="text-secondary font-bold hover:underline text-lg">
                Log in here
              </a>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6 border-t pt-8">
            {comments.length === 0 ? (
              <p className="text-gray-600 text-center py-8 text-lg">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-lg text-gray-900">{comment.username}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    {user && (user._id === comment.user._id || user.role === 'admin') && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-danger hover:text-red-700 font-semibold text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetail;
