import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  MoreVertical, 
  Tag, 
  Check,
  AlertTriangle
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const PostCard = ({ post, onOpenComments }) => {
  const { toggleLike, toggleSave, reportPost } = useAppState();
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReport = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    const reason = prompt('Reason for reporting this post to Farmogram moderators:', 'Inaccurate agricultural practice');
    if (reason) {
      reportPost(post.id, reason);
    }
  };

  return (
    <article className="farm-card post-card">
      {/* Post Author Header */}
      <div className="post-header">
        <div className="post-author-info">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="post-author-avatar"
          />
          <div>
            <div className="author-name-row">
              <span className="author-name">{post.author.name}</span>
              {post.author.verified && (
                <span className="verified-expert-tag" title="Verified Agricultural Scientist / Expert">
                  <ShieldCheck size={14} /> Expert
                </span>
              )}
            </div>
            <div className="post-meta-sub">
              <span className="post-location">
                <MapPin size={11} /> {post.author.location}
              </span>
              <span className="meta-dot">•</span>
              <span className="post-timestamp">{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Crop & Category Badges */}
        <div className="post-badges-right">
          <span className="badge badge-green">{post.crop}</span>
          {post.category && (
            <span className="badge badge-amber">{post.category}</span>
          )}

          <div style={{ position: 'relative' }}>
            <button 
              className="post-menu-btn" 
              onClick={() => setShowMenu(!showMenu)}
              title="More actions"
            >
              <MoreVertical size={16} />
            </button>
            {showMenu && (
              <div className="post-dropdown-menu">
                <button onClick={handleReport} className="dropdown-item text-danger">
                  <AlertTriangle size={14} /> Report Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Title & Content */}
      <div className="post-content-area">
        {post.title && <h3 className="post-title">{post.title}</h3>}
        <p className="post-body-text">{post.content}</p>
      </div>

      {/* Post Media / Photo */}
      {post.image && (
        <div className="post-image-container">
          <img 
            src={post.image} 
            alt={post.title || post.crop} 
            className="post-image" 
            loading="lazy"
          />
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags-row">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="post-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Interactions Bar */}
      <div className="post-actions-bar">
        <button 
          onClick={() => toggleLike(post.id)}
          className={`action-btn ${post.isLiked ? 'liked' : ''}`}
          title={post.isLiked ? 'Unlike' : 'Like post'}
        >
          <Heart size={18} fill={post.isLiked ? '#ef4444' : 'none'} color={post.isLiked ? '#ef4444' : 'currentColor'} />
          <span>{post.likes}</span>
        </button>

        <button 
          onClick={() => onOpenComments(post)}
          className="action-btn"
          title="Join farmer discussion"
        >
          <MessageCircle size={18} />
          <span>{post.commentsCount || 0} Comments</span>
        </button>

        <button 
          onClick={() => toggleSave(post.id)}
          className={`action-btn ${post.isSaved ? 'saved' : ''}`}
          title={post.isSaved ? 'Remove from saved' : 'Save for offline/later'}
        >
          <Bookmark size={18} fill={post.isSaved ? '#16a34a' : 'none'} color={post.isSaved ? '#16a34a' : 'currentColor'} />
          <span>{post.isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button 
          onClick={handleShare}
          className="action-btn share-btn"
          title="Share agricultural knowledge"
        >
          {copied ? <Check size={18} color="#16a34a" /> : <Share2 size={18} />}
          <span>{copied ? 'Copied!' : 'Share'}</span>
        </button>
      </div>
    </article>
  );
};
