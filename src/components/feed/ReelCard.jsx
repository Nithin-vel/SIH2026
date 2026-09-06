import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Bookmark, Share2, MapPin, ShieldCheck } from 'lucide-react';

export const ReelCard = ({ reel, onPlay }) => {
  const [likes, setLikes] = useState(parseInt(reel.likes) || 120);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="reel-card" onClick={() => onPlay(reel)}>
      {/* Thumbnail and Overlay */}
      <div className="reel-thumbnail-wrap">
        <img 
          src={reel.thumbnail} 
          alt={reel.title} 
          className="reel-thumbnail" 
          loading="lazy"
        />
        <div className="reel-gradient-overlay" />

        {/* Play Icon Button */}
        <div className="reel-play-btn">
          <Play size={24} fill="#ffffff" color="#ffffff" />
        </div>

        {/* Duration Chip */}
        <span className="reel-duration-badge">{reel.duration}</span>

        {/* Category Chip */}
        <span className="reel-category-badge">{reel.category}</span>

        {/* Reel Bottom Details Overlay */}
        <div className="reel-overlay-content">
          <div className="reel-creator-row">
            <span className="reel-creator-name">{reel.creator}</span>
            {reel.verified && <ShieldCheck size={14} color="#38bdf8" />}
          </div>
          <div className="reel-loc-row">
            <MapPin size={11} /> {reel.location} • <span className="reel-crop-tag">{reel.crop}</span>
          </div>
          <p className="reel-title-text">{reel.title}</p>
        </div>
      </div>

      {/* Reel Card Footer Action Strip */}
      <div className="reel-footer-actions">
        <button 
          className={`reel-action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} />
          <span>{likes}</span>
        </button>

        <button 
          className={`reel-action-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          <Bookmark size={16} fill={isSaved ? '#16a34a' : 'none'} color={isSaved ? '#16a34a' : 'currentColor'} />
          <span>Save</span>
        </button>

        <div className="reel-views-pill">
          {reel.views} views
        </div>
      </div>
    </div>
  );
};
