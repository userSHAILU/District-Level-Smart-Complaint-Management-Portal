import React, { useState } from 'react';
import { communityAPI } from '../utils/api';

function CommentsSection({ complaintId, comments, user, onRefresh }) {
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    if (!user) {
      alert('Please login to comment');
      return;
    }

    setSubmittingComment(true);

    try {
      await communityAPI.addComment(complaintId, newComment);
      setNewComment('');
      onRefresh();
    } catch (err) {
      alert('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    setDeletingCommentId(commentId);

    try {
      await communityAPI.deleteComment(complaintId, commentId);
      onRefresh();
    } catch (err) {
      alert('Failed to delete comment');
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Add Comment Form */}
      {user && (
        <div className="mb-8 bg-white p-4 rounded-lg border-2 border-blue-200">
          <h4 className="text-lg font-bold mb-4 text-gray-900">Add Your Comment</h4>
          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts, photos, or observations about this issue..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="flex-1 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {!user && (
        <div className="mb-8 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <p className="text-yellow-800 font-semibold">
            🔐 Please login to comment on this issue
          </p>
        </div>
      )}

      {/* Comments List */}
      <div>
        <h4 className="text-lg font-bold mb-4 text-gray-900">
          💬 Comments ({comments.length})
        </h4>

        {comments.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg border-2 border-gray-200">
            <p className="text-gray-600">
              No comments yet. Be the first to comment on this issue!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900 flex items-center gap-2">
                      👤 {comment.user?.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Delete Button - Show only if user is comment author */}
                  {user && user.id === comment.user?._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      disabled={deletingCommentId === comment._id}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm px-2 py-1 rounded hover:bg-red-50 transition disabled:opacity-50"
                    >
                      {deletingCommentId === comment._id ? '🗑️ Deleting...' : '🗑️ Delete'}
                    </button>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
