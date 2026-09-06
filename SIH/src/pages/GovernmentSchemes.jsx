import React, { useState } from 'react';
import { 
  Landmark, 
  Search, 
  Filter, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  ExternalLink, 
  Info,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { governmentSchemes } from '../data/mockData';
import { Modal } from '../components/common/Modal';

export const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  const categories = ['All', 'Financial Support', 'Irrigation', 'Insurance', 'Machinery & Equipment', 'Utilities & Energy', 'Organic Farming'];

  const filteredSchemes = governmentSchemes.filter(sch => {
    const matchesSearch = sch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sch.benefits.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sch.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="schemes-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          <Landmark size={28} color="#15803d" /> Central & State Agricultural Schemes
        </h1>
        <p className="page-subtitle">
          Direct benefit transfers, micro-irrigation subsidies, crop insurance, and tractor mechanization grants for Tamil Nadu farmers.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="agri-notice-box" style={{ marginBottom: '20px' }}>
        <Info size={18} color="#0284c7" />
        <span>
          <strong>Sample Content Indicator:</strong> Below are representative central and state agricultural schemes with realistic eligibility criteria and subsidy structures for SIH demonstration.
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="farm-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search scheme by keyword (e.g. PM-KISAN, Drip subsidy, Insurance)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ minWidth: '180px' }}>
            <select 
              className="form-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedCategory !== 'All') && (
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid-2" style={{ gap: '20px' }}>
        {filteredSchemes.map(scheme => (
          <div key={scheme.id} className="farm-card scheme-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                <span className="badge badge-green">{scheme.category}</span>
                <span className="badge badge-amber">{scheme.badge}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                {scheme.name}
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                {scheme.ministry}
              </div>

              {/* Benefits Snippet */}
              <div style={{ background: '#f0fdf4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bbf7d0', margin: '14px 0' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>Financial Benefit / Subsidy</span>
                <div style={{ fontSize: '0.88rem', color: '#14532d', fontWeight: 600, marginTop: '2px' }}>
                  {scheme.benefits}
                </div>
              </div>

              {/* Eligibility Preview */}
              <div style={{ fontSize: '0.84rem', color: '#475569', marginBottom: '12px' }}>
                <strong>Eligibility:</strong> {scheme.eligibility}
              </div>

              {/* Deadline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d97706', fontWeight: 600 }}>
                <Calendar size={14} /> Deadline: {scheme.deadline}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <button 
                onClick={() => setActiveModalScheme(scheme)}
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                <FileText size={14} /> View Details & Documents
              </button>
              <a 
                href={scheme.officialLink} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Apply Online <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <Modal 
          isOpen={true} 
          onClose={() => setActiveModalScheme(null)} 
          title={`🏛 ${activeModalScheme.name}`}
          maxWidth="680px"
        >
          <div>
            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Issuing Authority</div>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalScheme.ministry}</div>
              <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
                Subsidy Quantum: {activeModalScheme.subsidyAmount}
              </div>
            </div>

            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '6px' }}>
              Benefits Overview
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, marginBottom: '16px' }}>
              {activeModalScheme.benefits}
            </p>

            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '6px' }}>
              Farmer Eligibility Requirements
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, marginBottom: '16px' }}>
              {activeModalScheme.eligibility}
            </p>

            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
              Required Checklist Documents
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {activeModalScheme.documents.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#1e293b' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> {doc}
                </div>
              ))}
            </div>

            <div style={{ background: '#fffbeb', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fef3c7', fontSize: '0.84rem', color: '#b45309', marginBottom: '16px' }}>
              <strong>Application Deadline:</strong> {activeModalScheme.deadline}
            </div>

            <div className="modal-footer" style={{ margin: '18px -24px -24px -24px' }}>
              <button className="btn btn-secondary" onClick={() => setActiveModalScheme(null)}>
                Close
              </button>
              <a 
                href={activeModalScheme.officialLink} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary"
              >
                Go to Portal <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
