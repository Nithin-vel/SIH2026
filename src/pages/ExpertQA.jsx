import React, { useState } from 'react';
import { 
  HelpCircle, 
  PlusCircle, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  ThumbsUp, 
  Send, 
  Image, 
  Search, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { useAuth } from '../context/AuthContext';
import { cropsList } from '../data/mockData';
import { Modal } from '../components/common/Modal';

export const ExpertQA = () => {
  const { user } = useAuth();
  const { questions, askQuestion, addReplyToQuestion } = useAppState();

  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State for new question
  const [newCrop, setNewCrop] = useState('Tomato');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newImage, setNewImage] = useState(null);

  // Reply Input state mapped by question id
  const [replyInputs, setReplyInputs] = useState({});

  const handleAskSubmit = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    askQuestion({
      crop: newCrop,
      question: newQuestionText.trim(),
      image: newImage
    });

    setNewQuestionText('');
    setNewImage(null);
    setIsAskModalOpen(false);
  };

  const handleReplyChange = (qId, text) => {
    setReplyInputs(prev => ({ ...prev, [qId]: text }));
  };

  const handleSendReply = (qId) => {
    const text = replyInputs[qId];
    if (!text || !text.trim()) return;
    addReplyToQuestion(qId, text);
    setReplyInputs(prev => ({ ...prev, [qId]: '' }));
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || q.farmer.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="expert-qa-page">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 className="page-title">
            <HelpCircle size={28} color="#16a34a" /> 👨‍🌾 Ask an Expert & Community Forum
          </h1>
          <p className="page-subtitle">
            Get peer-reviewed agronomic answers from TNAU scientists, KVK officers, and verified master farmers.
          </p>
        </div>

        <button 
          onClick={() => setIsAskModalOpen(true)}
          className="btn btn-primary"
        >
          <PlusCircle size={18} /> Ask a Farming Question
        </button>
      </div>

      {/* Filter and Search */}
      <div className="farm-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search questions by symptom, pest, or crop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
          </div>

          <div style={{ minWidth: '160px' }}>
            <select 
              className="form-select" 
              value={selectedCrop} 
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option value="All">All Crops</option>
              {cropsList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {filteredQuestions.map(q => (
          <div key={q.id} className="farm-card question-card" style={{ padding: '24px' }}>
            {/* Question Author Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={q.farmer.avatar} 
                  alt={q.farmer.name} 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{q.farmer.name}</div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={11} /> {q.farmer.location} • {q.timestamp}
                  </div>
                </div>
              </div>

              <span className="badge badge-green">{q.farmer.crop}</span>
            </div>

            {/* Question Text */}
            <p style={{ fontSize: '1.02rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.5, margin: '8px 0 14px 0' }}>
              "{q.question}"
            </p>

            {/* Question Image if uploaded */}
            {q.image && (
              <div style={{ maxHeight: '280px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', backgroundColor: '#f1f5f9' }}>
                <img src={q.image} alt="Question symptom" style={{ width: '100%', height: '100%', maxHeight: '280px', objectFit: 'cover' }} />
              </div>
            )}

            {/* Verified Expert Answer Box */}
            {q.verifiedAnswer ? (
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '18px 20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                      src={q.verifiedAnswer.avatar} 
                      alt={q.verifiedAnswer.expert} 
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #16a34a' }} 
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '0.92rem', color: '#14532d' }}>{q.verifiedAnswer.expert}</strong>
                        <span className="verified-expert-tag">
                          <ShieldCheck size={13} /> {q.verifiedAnswer.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#166534' }}>{q.verifiedAnswer.qualification}</div>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: '#15803d' }}>{q.verifiedAnswer.timestamp}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#14532d', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {q.verifiedAnswer.answer}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.78rem', color: '#166534', fontWeight: 700 }}>
                  <ThumbsUp size={14} /> {q.verifiedAnswer.upvotes} farmers found this answer helpful
                </div>
              </div>
            ) : (
              <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.85rem', color: '#b45309' }}>
                ⏳ Awaiting official TNAU agronomist review. You can share your farmer experience below.
              </div>
            )}

            {/* Replies Thread */}
            {q.replies && q.replies.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Farmer Discussions ({q.replies.length})
                </div>
                {q.replies.map(r => (
                  <div key={r.id} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <strong style={{ color: '#0f172a' }}>{r.user}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{r.time}</span>
                    </div>
                    <div style={{ color: '#334155' }}>{r.text}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Share your practical experience or reply..."
                value={replyInputs[q.id] || ''}
                onChange={(e) => handleReplyChange(q.id, e.target.value)}
              />
              <button 
                onClick={() => handleSendReply(q.id)}
                className="btn btn-primary"
                style={{ padding: '0 16px' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      <Modal 
        isOpen={isAskModalOpen} 
        onClose={() => setIsAskModalOpen(false)} 
        title="👨‍🌾 Ask Agricultural Experts"
      >
        <form onSubmit={handleAskSubmit}>
          <div className="form-group">
            <label className="form-label">Associated Crop</label>
            <select className="form-select" value={newCrop} onChange={(e) => setNewCrop(e.target.value)}>
              {cropsList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Describe Your Problem / Query *</label>
            <textarea 
              className="form-textarea" 
              rows="4" 
              placeholder="State what you observe on leaves, flowers, or roots. Mention soil conditions, irrigation schedule, and recent spray history..."
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Attach Leaf/Pest Photograph (Optional)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setNewImage('https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80')}
                className={`btn btn-sm ${newImage ? 'btn-primary' : 'btn-secondary'}`}
              >
                {newImage ? '✓ Photo Attached' : 'Attach Sample Photo'}
              </button>
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '18px -24px -24px -24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAskModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Question
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
