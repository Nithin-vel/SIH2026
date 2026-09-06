import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Send, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CommentModal = ({ isOpen, onClose, post, onAddComment }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText, user.name);
    setCommentText('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Farmer Discussion (${post.comments?.length || 0})`}>
      <div className="comment-modal-body">
        {/* Original Post Snippet */}
        <div className="comment-post-summary">
          <span className="badge badge-green" style={{ marginBottom: '6px' }}>{post.crop}</span>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>{post.title}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>By {post.author.name} • {post.author.location}</div>
        </div>

        {/* Comment Thread */}
        <div className="comment-list" style={{ maxHeight: '280px', overflowY: 'auto', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment-item" style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>{comment.user}</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{comment.time}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155' }}>{comment.text}</div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '0.9rem' }}>
              No comments yet. Be the first farmer to ask a question or share advice!
            </div>
          )}
        </div>

        {/* Add Comment Input Bar */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Share your opinion or ask a question..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 16px' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </Modal>
  );
};
