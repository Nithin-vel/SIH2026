import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Video, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { adminMetrics } from '../data/mockData';

export const AdminDashboard = () => {
  const [reports, setReports] = useState(adminMetrics.reportsList);
  const [experts, setExperts] = useState(adminMetrics.pendingExperts);
  const [activeTab, setActiveTab] = useState('moderation');

  const handleDismissReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
    alert('Report dismissed as harmless agricultural discourse.');
  };

  const handleRemoveContent = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
    alert('Content flagged and removed from public Farmogram feed.');
  };

  const handleApproveExpert = (id, name) => {
    setExperts(prev => prev.filter(e => e.id !== id));
    alert(`Agronomist credentials verified. Verified Expert Badge awarded to ${name}!`);
  };

  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <ShieldAlert size={28} color="#dc2626" /> Farmogram AI — SIH Administrative Oversight
        </h1>
        <p className="page-subtitle">
          Platform governance portal for content moderation, scientific integrity enforcement, and agronomist credential verification.
        </p>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="farm-card" style={{ padding: '18px 20px', borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Farmers</span>
            <Users size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            {adminMetrics.totalFarmers}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
            {adminMetrics.newFarmersToday} new registrations today
          </span>
        </div>

        <div className="farm-card" style={{ padding: '18px 20px', borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Community Posts</span>
            <FileText size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            {adminMetrics.totalPosts}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Across 14 Tamil Nadu districts</span>
        </div>

        <div className="farm-card" style={{ padding: '18px 20px', borderLeft: '4px solid #7c3aed' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Agri-Reels Published</span>
            <Video size={18} color="#7c3aed" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            {adminMetrics.totalReels}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700 }}>High engagement</span>
        </div>

        <div className="farm-card" style={{ padding: '18px 20px', borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Pending Moderation</span>
            <AlertTriangle size={18} color="#dc2626" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            {reports.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 700 }}>Action needed</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="feed-tabs-bar" style={{ marginBottom: '20px' }}>
        <div className="feed-tabs-group">
          <button 
            onClick={() => setActiveTab('moderation')} 
            className={`feed-tab-btn ${activeTab === 'moderation' ? 'active' : ''}`}
          >
            🚨 Content Moderation Queue ({reports.length})
          </button>
          <button 
            onClick={() => setActiveTab('experts')} 
            className={`feed-tab-btn ${activeTab === 'experts' ? 'active' : ''}`}
          >
            🎓 Expert Verification ({experts.length})
          </button>
          <button 
            onClick={() => setActiveTab('system')} 
            className={`feed-tab-btn ${activeTab === 'system' ? 'active' : ''}`}
          >
            ⚙️ System Metrics & Infrastructure
          </button>
        </div>
      </div>

      {/* Tab 1: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="farm-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Flagged Community Posts Awaiting Agronomic Review
          </h3>

          {reports.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {reports.map(rep => (
                <div 
                  key={rep.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '16px 20px', 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca', 
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.98rem', color: '#991b1b' }}>"{rep.postTitle}"</strong>
                      <span className="badge badge-red">{rep.status}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#7f1d1d', marginTop: '4px' }}>
                      Author: <strong>{rep.author}</strong> • Reason: <em>{rep.reason}</em> • Reported: {rep.date}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleDismissReport(rep.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      <CheckCircle2 size={14} /> Dismiss Report
                    </button>
                    <button 
                      onClick={() => handleRemoveContent(rep.id)}
                      className="btn btn-sm"
                      style={{ background: '#dc2626', color: '#fff' }}
                    >
                      <XCircle size={14} /> Remove Content
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px', color: '#16a34a' }}>
              <CheckCircle2 size={40} style={{ margin: '0 auto 8px auto' }} />
              <h4>All reported posts have been resolved! Community feed is compliant.</h4>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Expert Verification */}
      {activeTab === 'experts' && (
        <div className="farm-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Agronomist & Scientist Verification Applications
          </h3>

          {experts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {experts.map(exp => (
                <div 
                  key={exp.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '16px 20px', 
                    background: '#f0fdf4', 
                    border: '1px solid #bbf7d0', 
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '1.02rem', color: '#14532d' }}>{exp.name}</strong>
                      <span className="badge badge-green">Candidate</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#166534', marginTop: '4px' }}>
                      Specialization: <strong>{exp.specialization}</strong> • Credentials: {exp.degree}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#15803d', marginTop: '2px' }}>
                      Institutional Verification: <code>{exp.docProof}</code>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleApproveExpert(exp.id, exp.name)}
                    className="btn btn-primary btn-sm"
                  >
                    <ShieldCheck size={14} /> Award Verified Badge
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px', color: '#16a34a' }}>
              <CheckCircle2 size={40} style={{ margin: '0 auto 8px auto' }} />
              <h4>All agronomist verification requests are up to date!</h4>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: System Health */}
      {activeTab === 'system' && (
        <div className="grid-2" style={{ gap: '20px' }}>
          <div className="farm-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Platform Uptime & Telemetry</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Availability Uptime:</span>
                <strong>{adminMetrics.systemUptime}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Mandi APMC Scraper:</span>
                <strong style={{ color: '#16a34a' }}>Synchronized (10 mins ago)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Weather Microclimate API:</span>
                <strong style={{ color: '#16a34a' }}>Active (Coimbatore station)</strong>
              </div>
            </div>
          </div>

          <div className="farm-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>SIH Prototype Architecture</h3>
            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
              This frontend interface is tuned for Smart India Hackathon jury live demonstrations. Soil type is preserved strictly as an agronomic input alongside climate, water, and market outlook, eliminating unscientific standalone soil scores.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
