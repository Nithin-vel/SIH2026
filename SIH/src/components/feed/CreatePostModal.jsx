import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { cropsList } from '../../data/mockData';
import { Image, Tag, Sparkles } from 'lucide-react';

export const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [crop, setCrop] = useState('Tomato');
  const [category, setCategory] = useState('Best Practices');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState(
    'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80'
  );

  const sampleImages = [
    { label: 'Tomato Drip', url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80' },
    { label: 'Paddy SRI Field', url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80' },
    { label: 'Groundnut Crop', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80' },
    { label: 'Organic Turmeric', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80' },
    { label: 'Healthy Banana Plot', url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      title: title.trim() || `${crop} Cultivation Experience`,
      crop,
      category,
      content: content.trim(),
      image: imageUrl || previewImage,
      tags: [crop, category.replace(/\s+/g, ''), 'FarmerExperience']
    });

    // Reset and close
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🌾 Share Agricultural Knowledge">
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label className="form-label">Post Title</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g., Successful drip irrigation in tomato crop..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Select Crop</label>
            <select 
              className="form-select" 
              value={crop} 
              onChange={(e) => setCrop(e.target.value)}
            >
              {cropsList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-select" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Best Practices">Best Practices</option>
              <option value="Irrigation & Water Saving">Irrigation & Water Saving</option>
              <option value="Pest & Disease Advisory">Pest & Disease Advisory</option>
              <option value="Natural / Organic Farming">Natural / Organic Farming</option>
              <option value="Harvest & Storage">Harvest & Storage</option>
              <option value="Market Discussion">Market Discussion</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Describe Your Farming Technique / Observation *</label>
          <textarea 
            className="form-textarea" 
            rows="4"
            placeholder="Share your practical experience: sowing method, fertilizers used, pest control steps, water schedule, or yields achieved..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Quick Image Attachment Selector */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Image size={16} /> Choose Field Photo for Demonstration
          </label>
          <div className="image-select-row" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {sampleImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setPreviewImage(img.url);
                  setImageUrl(img.url);
                }}
                style={{
                  cursor: 'pointer',
                  border: previewImage === img.url ? '2px solid #16a34a' : '2px solid transparent',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                <img src={img.url} alt={img.label} style={{ width: '80px', height: '60px', objectFit: 'cover' }} />
                <div style={{ fontSize: '0.68rem', textAlign: 'center', background: '#f8fafc', padding: '2px' }}>{img.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer" style={{ margin: '16px -24px -24px -24px' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Publish Post
          </button>
        </div>
      </form>
    </Modal>
  );
};
