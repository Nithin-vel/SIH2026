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
  Layers,
  Phone,
  Mail,
  MapPin,
  Award,
  BadgeCheck
} from 'lucide-react';

const expertProfiles = [
  { id: 1, name: 'Dr. S. Ramasamy', role: 'Agronomist, TNAU', expertise: 'Crop Management, Pest Control', phone: '+91 98765 43210', email: 'ramasamy.s@tnau.ac.in', location: 'Coimbatore, TN', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop' },
  { id: 2, name: 'Dr. K. Meenakshi', role: 'Soil Scientist, TNAU', expertise: 'Soil Health, Fertilizers', phone: '+91 98765 43211', email: 'meenakshi.k@tnau.ac.in', location: 'Coimbatore, TN', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' },
  { id: 3, name: 'Dr. P. Velmurugan', role: 'Plant Pathologist', expertise: 'Disease Diagnostics', phone: '+91 98765 43212', email: 'velmurugan.p@tnau.ac.in', location: 'Madurai, TN', avatar: 'https://images.unsplash.com/photo-1537368910025-702800faa86b?w=150&h=150&fit=crop' },
  { id: 4, name: 'Dr. A. Anand', role: 'Entomologist', expertise: 'Pest Management', phone: '+91 98765 43213', email: 'anand.a@tnau.ac.in', location: 'Trichy, TN', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
  { id: 5, name: 'Dr. N. Karthikeyan', role: 'Horticulture Specialist', expertise: 'Fruits & Vegetables', phone: '+91 98765 43214', email: 'karthikeyan.n@tnau.ac.in', location: 'Ooty, TN', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { id: 6, name: 'Dr. R. Shalini', role: 'Irrigation Expert', expertise: 'Water Management', phone: '+91 98765 43215', email: 'shalini.r@tnau.ac.in', location: 'Thanjavur, TN', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop' },
  { id: 7, name: 'Dr. V. Prakash', role: 'Agri-Economist', expertise: 'Market Trends, Pricing', phone: '+91 98765 43216', email: 'prakash.v@tnau.ac.in', location: 'Chennai, TN', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' }
];
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { PostCard } from '../components/feed/PostCard';
import { ReelCard } from '../components/feed/ReelCard';
import { CreatePostModal } from '../components/feed/CreatePostModal';
import { CommentModal } from '../components/feed/CommentModal';
import { Modal } from '../components/common/Modal';

export const Home = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { 
    posts, 
    reels, 
    createPost, 
    addComment, 
    setActivePage,
    feedFilter,
    setFeedFilter,
    weather
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
      desc: t('crop_advisor_desc'), 
      icon: Sprout, 
      color: '#15803d', 
      bg: '#f0fdf4',
      badge: t('high_precision')
    },
    { 
      id: 'weather', 
      title: t('weather_advisory'), 
      desc: t('weather_advisory_desc'), 
      icon: CloudSun, 
      color: '#0284c7', 
      bg: '#f0f9ff',
      badge: t('rain_alert')
    },
    { 
      id: 'disease', 
      title: t('disease_detection'), 
      desc: t('disease_desc'), 
      icon: Bug, 
      color: '#b45309', 
      bg: '#fffbeb',
      badge: t('instant_ai')
    },
    { 
      id: 'irrigation', 
      title: t('irrigation'), 
      desc: t('irrigation_desc'), 
      icon: Droplet, 
      color: '#0369a1', 
      bg: '#e0f2fe',
      badge: t('water_saving')
    },
    { 
      id: 'market', 
      title: t('market_prices'), 
      desc: t('market_prices_desc'), 
      icon: TrendingUp, 
      color: '#059669', 
      bg: '#ecfdf5',
      badge: t('tomato_up')
    },
    { 
      id: 'profit', 
      title: t('profit_calculator'), 
      desc: t('profit_desc'), 
      icon: Calculator, 
      color: '#7c3aed', 
      bg: '#f5f3ff',
      badge: t('financials')
    }
  ];

  // Feed filtering logic
  const filteredPosts = posts.filter(post => {
    const isNearby = post.author.location.toLowerCase().includes(user.district.toLowerCase()) ||
                     post.author.location.toLowerCase().includes('coimbatore') ||
                     post.author.location.toLowerCase().includes('erode');
                     
    if (feedFilter === 'for-you') {
      // Exclude nearby posts so For You has completely different content
      return !isNearby; 
    }
    if (feedFilter === 'nearby') {
      return isNearby;
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
          <h1 className="hero-greeting">
            {t('good_morning')}, {user.name.split(' ')[0]} 🌾
          </h1>
          <p className="hero-summary">
            {t('your_farm_dashboard')}. 
            All insights are personalized for your <strong>{user.landArea} Acre</strong> farm in <strong>{user.district}</strong>.
          </p>

          <div className="hero-meta-chips">
            <div className="hero-chip">
              <span className="chip-label">{t('location')}</span>
              <strong className="chip-value">{weather.location.split(',')[0]}</strong>
            </div>
            <div className="hero-chip">
              <span className="chip-label">{t('temperature')}</span>
              <strong className="chip-value">{weather.currentTemp}°C ({weather.condition})</strong>
            </div>
            <div className="hero-chip">
              <span className="chip-label">{t('primary_soil')}</span>
              <strong className="chip-value">{user.soilType}</strong>
            </div>
          </div>
        </div>

        {/* Hero Decorative Visual */}
        <div className="hero-side-status">
          <div className="status-box">
            <div className="status-num">3</div>
            <div className="status-txt">{t('active_crops_in_season')}</div>
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
            <span>{t('agricultural_advisory')} {weather.advisoryAlert.title}</span>
            <span className="alert-urgency-tag">{t('high_priority')}</span>
          </div>
          <p className="alert-banner-desc">
            “{weather.advisoryAlert.message}”
          </p>
        </div>
        <button 
          onClick={() => setActivePage('weather')} 
          className="btn btn-secondary btn-sm"
          style={{ alignSelf: 'center', borderColor: '#fed7aa', color: '#c2410c' }}
        >
          {t('view_weather_advisory')} <ArrowRight size={14} />
        </button>
      </section>

      {/* 3. QUICK ACTION CARDS */}
      <section className="quick-actions-section">
        <div className="section-title-row">
          <h2 className="section-title">{t('decision_support_tools')}</h2>
          <span className="section-subtitle">{t('pre_sowing_intelligence')}</span>
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
                  <span className="action-link-text">{t('open_tool')}</span>
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
            <h2 className="section-title">{t('community_hub_title')}</h2>
            <span className="section-subtitle">{t('community_hub_subtitle')}</span>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="btn btn-primary"
          >
            <PlusCircle size={18} /> {t('share_experience')}
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
              🎬 Reels ({reels.length})
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
          ) : feedFilter === 'experts' ? (
            /* Experts Profiles View */
            <div className="experts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {expertProfiles.map(expert => (
                <div key={expert.id} className="farm-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={expert.avatar} alt={expert.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f0fdf4' }} />
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {expert.name} <BadgeCheck size={18} color="#16a34a" />
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: '#16a34a', fontWeight: 600 }}>{expert.role}</p>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{expert.location}</p>
                    </div>
                  </div>
                  
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#475569', fontSize: '0.9rem' }}>
                      <Award size={16} /> <strong>Expertise:</strong> {expert.expertise}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#475569', fontSize: '0.9rem' }}>
                      <Phone size={16} /> {expert.phone}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.9rem' }}>
                      <Mail size={16} /> {expert.email}
                    </div>
                  </div>
                </div>
              ))}
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
