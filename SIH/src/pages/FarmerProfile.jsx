import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Layers, 
  Droplet, 
  Globe, 
  Edit3, 
  CheckCircle2, 
  Bookmark, 
  FileText, 
  HelpCircle,
  Sprout
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { soilTypes, locations, cropsList } from '../data/mockData';
import { PostCard } from '../components/feed/PostCard';
import { Modal } from '../components/common/Modal';

export const FarmerProfile = () => {
  const { user, updateProfile } = useAuth();
  const { posts, questions } = useAppState();

  const [activeTab, setActiveTab] = useState('farm-info');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user.name);
  const [editVillage, setEditVillage] = useState(user.village);
  const [editDistrict, setEditDistrict] = useState(user.district);
  const [editLandArea, setEditLandArea] = useState(user.landArea);
  const [editSoilType, setEditSoilType] = useState(user.soilType);
  const [editWaterSource, setEditWaterSource] = useState(user.waterSource);
  const [editLanguage, setEditLanguage] = useState(user.language);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      village: editVillage,
      district: editDistrict,
      landArea: editLandArea,
      soilType: editSoilType,
      waterSource: editWaterSource,
      language: editLanguage
    });
    setIsEditModalOpen(false);
  };

  const myPosts = posts.filter(p => p.author.name === user.name);
  const savedPosts = posts.filter(p => p.isSaved);
  const myQuestions = questions.filter(q => q.farmer.name.includes(user.name.split(' ')[0]));

  return (
    <div className="profile-page">
      {/* Profile Identity Hero */}
      <div className="farm-card profile-hero-card" style={{ padding: '28px 32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #22c55e', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{user.name}</h1>
                <span className="badge badge-green">Registered Farmer</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.86rem', color: '#64748b', marginTop: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#16a34a" /> {user.village}, {user.district} District
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} /> {user.phone}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Globe size={14} /> {user.language}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="btn btn-outline"
          >
            <Edit3 size={16} /> Edit Profile & Farm Data
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="feed-tabs-bar" style={{ marginBottom: '20px' }}>
        <div className="feed-tabs-group">
          <button 
            onClick={() => setActiveTab('farm-info')} 
            className={`feed-tab-btn ${activeTab === 'farm-info' ? 'active' : ''}`}
          >
            🌾 Farm Information
          </button>
          <button 
            onClick={() => setActiveTab('my-posts')} 
            className={`feed-tab-btn ${activeTab === 'my-posts' ? 'active' : ''}`}
          >
            📝 My Posts ({myPosts.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved-posts')} 
            className={`feed-tab-btn ${activeTab === 'saved-posts' ? 'active' : ''}`}
          >
            🔖 Saved Posts ({savedPosts.length})
          </button>
          <button 
            onClick={() => setActiveTab('my-questions')} 
            className={`feed-tab-btn ${activeTab === 'my-questions' ? 'active' : ''}`}
          >
            ❓ My Q&A Queries ({myQuestions.length})
          </button>
          <button 
            onClick={() => setActiveTab('recommendations')} 
            className={`feed-tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
          >
            🌱 Sowing History
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="profile-tab-content">
        {/* Tab 1: Farm Information */}
        {activeTab === 'farm-info' && (
          <div className="grid-2" style={{ gap: '20px' }}>
            <div className="farm-card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                Land Holding & Soil Texture
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Cultivable Land Size:</span>
                  <strong style={{ color: '#0f172a' }}>{user.landArea} Acres</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Dominant Soil Type:</span>
                  <strong style={{ color: '#16a34a' }}>{user.soilType}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Irrigation Sources:</span>
                  <strong style={{ color: '#0284c7' }}>{user.waterSource}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Village & Block:</span>
                  <strong>{user.village} (Erode West Block)</strong>
                </div>
              </div>
            </div>

            <div className="farm-card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                Crops in Active Rotation
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px' }}>
                These crops configure your personalized community feed recommendations and microclimate spray alerts:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {user.primaryCrops.map(crop => (
                  <span key={crop} className="badge badge-green" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                    🌱 {crop}
                  </span>
                ))}
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '20px' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>SOIL TYPE GUIDANCE</span>
                <p style={{ fontSize: '0.84rem', color: '#334155', marginTop: '4px' }}>
                  Your registered <strong>{user.soilType}</strong> provides moderate porosity, suitable for drip-fertigated tomato and groundnut pods.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: My Posts */}
        {activeTab === 'my-posts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myPosts.length > 0 ? (
              myPosts.map(p => <PostCard key={p.id} post={p} onOpenComments={() => {}} />)
            ) : (
              <div className="farm-card" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                No published posts yet. Share your field experiments with the Farmogram community!
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Posts */}
        {activeTab === 'saved-posts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {savedPosts.length > 0 ? (
              savedPosts.map(p => <PostCard key={p.id} post={p} onOpenComments={() => {}} />)
            ) : (
              <div className="farm-card" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                No saved posts. Bookmark informative agricultural posts from the feed to review later.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: My Questions */}
        {activeTab === 'my-questions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myQuestions.length > 0 ? (
              myQuestions.map(q => (
                <div key={q.id} className="farm-card" style={{ padding: '20px' }}>
                  <span className="badge badge-green">{q.farmer.crop}</span>
                  <p style={{ fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>"{q.question}"</p>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Submitted {q.timestamp} • {q.answersCount} answers</span>
                </div>
              ))
            ) : (
              <div className="farm-card" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                You haven't asked any expert questions yet.
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="farm-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
              Past Crop Advisor Historical Recommendations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>Groundnut (VRI 8 / Kadiri 6)</strong>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Recommended June 2026 • Suitability: 96%</div>
                </div>
                <span className="badge badge-green">Adopted</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>Shivam F1 Hybrid Tomato</strong>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Recommended March 2026 • Suitability: 92%</div>
                </div>
                <span className="badge badge-green">Harvested (28 Tonnes)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="✏️ Edit Farmer Information"
      >
        <form onSubmit={handleSaveProfile}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              required 
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Village / Town</label>
              <input 
                type="text" 
                className="form-input" 
                value={editVillage} 
                onChange={(e) => setEditVillage(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">District</label>
              <select 
                className="form-select" 
                value={editDistrict} 
                onChange={(e) => setEditDistrict(e.target.value)}
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Land Holding (Acres)</label>
              <input 
                type="number" 
                step="0.5" 
                className="form-input" 
                value={editLandArea} 
                onChange={(e) => setEditLandArea(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dominant Soil Type</label>
              <select 
                className="form-select" 
                value={editSoilType} 
                onChange={(e) => setEditSoilType(e.target.value)}
              >
                {soilTypes.map(st => (
                  <option key={st.id} value={st.name}>{st.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Water Source & Irrigation System</label>
            <input 
              type="text" 
              className="form-input" 
              value={editWaterSource} 
              onChange={(e) => setEditWaterSource(e.target.value)} 
            />
          </div>

          <div className="modal-footer" style={{ margin: '18px -24px -24px -24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
