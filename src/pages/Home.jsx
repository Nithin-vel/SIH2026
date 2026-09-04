import React, { useState } from 'react';
import { 
  Sprout, 
  CloudSun, 
  Bug, 
  Droplet, 
  TrendingUp, 
  Calculator, 
  AlertCircle, 
  PlusCircle, 
  Sparkles,
  ArrowRight,
  Filter,
  Play,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { weatherData } from '../data/mockData';
import { PostCard } from '../components/feed/PostCard';
import { ReelCard } from '../components/feed/ReelCard';
import { CreatePostModal } from '../components/feed/CreatePostModal';
import { CommentModal } from '../components/feed/CommentModal';
import { Modal } from '../components/common/Modal';

export const Home = () => {
  const { user } = useAuth();
  const { 
    posts, 
    reels, 
    createPost, 
    addComment, 
    setActivePage,
    feedFilter,
    setFeedFilter
  } = useAppState();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [activeReelModal, setActiveReelModal] = useState(null);
  const [reelCategoryFilter, setReelCategoryFilter] = useState('All');

  // Quick Action Tiles Definition
  const quickActions = [
    { 
      id: 'crop-advisor', 
      title: 'Crop Advisor', 
      desc: 'AI Multi-factor agronomic advice', 
      icon: Sprout, 
      color: '#15803d', 
      bg: '#f0fdf4',
      badge: 'High Precision'
    },
    { 
      id: 'weather', 
      title: 'Weather Advisory', 
      desc: '7-day microclimate forecast', 
      icon: CloudSun, 
      color: '#0284c7', 
      bg: '#f0f9ff',
      badge: 'Rain Alert'
    },
    { 
      id: 'disease', 
      title: 'Disease Detection', 
      desc: 'Scan leaf lesions for remedies', 
      icon: Bug, 
      color: '#b45309', 
      bg: '#fffbeb',
      badge: 'Instant AI'
    },
    { 
      id: 'irrigation', 
      title: 'Irrigation', 
      desc: 'Weather & stage-based schedule', 
      icon: Droplet, 
      color: '#0369a1', 
      bg: '#e0f2fe',
      badge: 'Water Saving'
    },
    { 
      id: 'market', 
      title: 'Market Prices', 
      desc: 'Live Mandi rates & trends', 
      icon: TrendingUp, 
      color: '#059669', 
      bg: '#ecfdf5',
      badge: 'Tomato ↑ 8%'
    },
    { 
      id: 'profit', 
      title: 'Profit Calculator', 
      desc: 'Calculate costs, yield & ROI', 
      icon: Calculator, 
      color: '#7c3aed', 
      bg: '#f5f3ff',
      badge: 'Financials'
    }
  ];

  // Feed filtering logic
  const filteredPosts = posts.filter(post => {
    if (feedFilter === 'for-you') return true;
    if (feedFilter === 'my-crops') {
      return user.primaryCrops.some(c => 
        post.crop.toLowerCase().includes(c.toLowerCase()) || 
        (post.tags && post.tags.some(t => t.toLowerCase().includes(c.toLowerCase())))
      );
    }
    if (feedFilter === 'nearby') {
      return post.author.location.toLowerCase().includes(user.district.toLowerCase()) ||
             post.author.location.toLowerCase().includes('coimbatore') ||
             post.author.location.toLowerCase().includes('erode');
    }
    if (feedFilter === 'experts') {
      return post.author.verified === true;
    }
    return true;
  });

  const reelCategories = ['All', 'Crop Tips', 'Pest Control', 'Irrigation', 'Harvesting', 'Organic Farming', 'Market Tips'];

  const filteredReels = reelCategoryFilter === 'All' 
    ? reels 
    : reels.filter(r => r.category === reelCategoryFilter);

  return (
    <div className="home-dashboard">
      {/* 1. DASHBOARD HEADER & GREETING */}
      <section className="dashboard-hero-card">
        <div className="hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={14} /> Smart India Hackathon 2026 Prototype
          </div>
          <h1 className="hero-greeting">
            Good Morning, Farmer {user.name.split(' ')[0]} 🌾
          </h1>
          <p className="hero-summary">
            Welcome to your unified agriculture community and decision-support hub. 
            All insights are personalized for your <strong>{user.landArea} Acre</strong> farm in <strong>{user.village}, {user.district}</strong>.
          </p>

          <div className="hero-meta-chips">
            <div className="hero-chip">
              <span className="chip-label">Location:</span>
              <strong className="chip-value">{weatherData.location.split(',')[0]}</strong>
            </div>
            <div className="hero-chip">
              <span className="chip-label">Temperature:</span>
              <strong className="chip-value">{weatherData.currentTemp}°C ({weatherData.condition})</strong>
            </div>
            <div className="hero-chip">
              <span className="chip-label">Primary Soil:</span>
              <strong className="chip-value">{user.soilType}</strong>
            </div>
          </div>
        </div>

        {/* Hero Decorative Visual */}
        <div className="hero-side-status">
          <div className="status-box">
            <div className="status-num">3</div>
            <div className="status-txt">Active Crops in Season</div>
            <div className="status-tags">
              {user.primaryCrops.map(c => (
                <span key={c} className="mini-crop-pill">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPORTANT AGRICULTURAL ALERT BANNER */}
      <section className="agri-alert-banner">
        <div className="alert-banner-icon">
          <AlertCircle size={24} color="#ea580c" />
        </div>
        <div className="alert-banner-text">
          <div className="alert-banner-title">
            <span>Agricultural Advisory: {weatherData.advisoryAlert.title}</span>
            <span className="alert-urgency-tag">High Priority</span>
          </div>
          <p className="alert-banner-desc">
            “{weatherData.advisoryAlert.message}”
          </p>
        </div>
        <button 
          onClick={() => setActivePage('weather')} 
          className="btn btn-secondary btn-sm"
          style={{ alignSelf: 'center', borderColor: '#fed7aa', color: '#c2410c' }}
        >
          View Weather Advisory <ArrowRight size={14} />
        </button>
      </section>

      {/* 3. QUICK ACTION CARDS */}
      <section className="quick-actions-section">
        <div className="section-title-row">
          <h2 className="section-title">Decision Support Tools</h2>
          <span className="section-subtitle">Pre-sowing to post-harvest intelligence</span>
        </div>

        <div className="grid-3 quick-actions-grid">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <div 
                key={action.id}
                className="action-card farm-card-interactive"
                onClick={() => setActivePage(action.id)}
              >
                <div className="action-card-top">
                  <div 
                    className="action-icon-box"
                    style={{ backgroundColor: action.bg, color: action.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="action-badge" style={{ color: action.color, backgroundColor: action.bg }}>
                    {action.badge}
                  </span>
                </div>
                <div className="action-card-body">
                  <h3 className="action-card-title">{action.title}</h3>
                  <p className="action-card-desc">{action.desc}</p>
                </div>
                <div className="action-card-footer">
                  <span className="action-link-text">Open Tool</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FARMOGRAM COMMUNITY FEED & REELS */}
      <section className="community-feed-section" style={{ marginTop: '36px' }}>
        <div className="section-title-row" style={{ marginBottom: '16px' }}>
          <div>
            <h2 className="section-title">🌾 Farmogram Community & Knowledge Hub</h2>
            <span className="section-subtitle">Real experiences, verified advice & agronomic practices from Indian farmers</span>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="btn btn-primary"
          >
            <PlusCircle size={18} /> Share Your Experience
          </button>
        </div>

        {/* Feed Navigation Tabs */}
        <div className="feed-tabs-bar">
          <div className="feed-tabs-group">
            <button 
              onClick={() => setFeedFilter('for-you')}
              className={`feed-tab-btn ${feedFilter === 'for-you' ? 'active' : ''}`}
            >
              🌟 For You
            </button>
            <button 
              onClick={() => setFeedFilter('my-crops')}
              className={`feed-tab-btn ${feedFilter === 'my-crops' ? 'active' : ''}`}
            >
              🌱 My Crops ({user.primaryCrops.join(', ')})
            </button>
            <button 
              onClick={() => setFeedFilter('nearby')}
              className={`feed-tab-btn ${feedFilter === 'nearby' ? 'active' : ''}`}
            >
              📍 Nearby ({user.district})
            </button>
            <button 
              onClick={() => setFeedFilter('experts')}
              className={`feed-tab-btn ${feedFilter === 'experts' ? 'active' : ''}`}
            >
              🎓 TNAU & Verified Experts
            </button>
            <button 
              onClick={() => setFeedFilter('reels')}
              className={`feed-tab-btn ${feedFilter === 'reels' ? 'active' : ''}`}
            >
              🎬 Agri-Reels ({reels.length})
            </button>
          </div>
        </div>

        {/* Feed Content Area */}
        <div className="feed-display-area" style={{ marginTop: '20px' }}>
          {feedFilter === 'reels' ? (
            /* Dedicated Reels Tab */
            <div className="reels-section-wrapper">
              {/* Category Filter Pills */}
              <div className="reels-cat-pills" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
                {reelCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setReelCategoryFilter(cat)}
                    className={`btn btn-sm ${reelCategoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="reels-grid">
                {filteredReels.map(reel => (
                  <ReelCard 
                    key={reel.id} 
                    reel={reel} 
                    onPlay={(r) => setActiveReelModal(r)}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Regular Feed Posts */
            <div className="feed-posts-column">
              {/* Horizontal Short Reels Carousel Preview */}
              <div className="feed-reels-strip-card farm-card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>
                    🎬 Short Video Agri-Tips & Guides
                  </span>
                  <button 
                    onClick={() => setFeedFilter('reels')}
                    className="btn btn-sm btn-outline"
                  >
                    View All Reels
                  </button>
                </div>
                <div className="horizontal-reels-scroll" style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '6px' }}>
                  {reels.slice(0, 4).map(reel => (
                    <div 
                      key={reel.id}
                      onClick={() => setActiveReelModal(reel)}
                      style={{
                        minWidth: '160px',
                        maxWidth: '160px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        aspectRatio: '9/14',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <img src={reel.thumbnail} alt={reel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />
                      <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '9999px' }}>
                        {reel.duration}
                      </div>
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', color: '#fff' }}>
                        <div style={{ fontSize: '0.68rem', color: '#86efac', fontWeight: 600 }}>{reel.crop}</div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, lineHeight: 1.2, marginTop: '2px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {reel.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed Post List */}
              <div className="feed-posts-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onOpenComments={(p) => setActiveCommentPost(p)}
                    />
                  ))
                ) : (
                  <div className="farm-card" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
                    <Sprout size={48} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
                    <h3>No posts found for this filter</h3>
                    <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>Try switching to "For You" or publish your own farm experience!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <CreatePostModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSubmit={(data) => createPost(data)}
      />

      <CommentModal 
        isOpen={!!activeCommentPost}
        onClose={() => setActiveCommentPost(null)}
        post={activeCommentPost}
        onAddComment={(postId, text, user) => addComment(postId, text, user)}
      />

      {/* Simulated Reel Video Player Modal */}
      {activeReelModal && (
        <Modal 
          isOpen={true} 
          onClose={() => setActiveReelModal(null)} 
          title={`🎬 ${activeReelModal.title}`}
          maxWidth="480px"
        >
          <div className="reel-modal-view">
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '9/14' }}>
              <img 
                src={activeReelModal.thumbnail} 
                alt={activeReelModal.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }} 
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-green">{activeReelModal.category}</span>
                  <span style={{ color: '#fff', fontSize: '0.78rem', background: 'rgba(0,0,0,0.5)', padding: '3px 8px', borderRadius: '9999px' }}>
                    {activeReelModal.views} views
                  </span>
                </div>

                {/* Center Animated Play Simulation */}
                <div style={{ alignSelf: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(22, 163, 74, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={28} fill="#fff" color="#fff" />
                </div>

                {/* Bottom Metadata */}
                <div style={{ color: '#fff' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeReelModal.creator}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>📍 {activeReelModal.location} • Crop: {activeReelModal.crop}</div>
                  <p style={{ fontSize: '0.86rem', marginTop: '8px', lineHeight: 1.4, background: 'rgba(0,0,0,0.4)', padding: '8px', borderRadius: '8px' }}>
                    "{activeReelModal.description}"
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => alert('Saved to farmer bookmarks')}>
                Save Tip
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => alert('Link copied to share via WhatsApp')}>
                Share on WhatsApp
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
