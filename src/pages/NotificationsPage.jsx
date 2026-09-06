import React, { useState } from 'react';
import { 
  Bell, 
  CloudRain, 
  TrendingUp, 
  HelpCircle, 
  Sprout, 
  Landmark, 
  CheckCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const NotificationsPage = () => {
  const { 
    notifications, 
    markAllAsRead, 
    markAsRead, 
    setActivePage 
  } = useAppState();

  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const getIcon = (type) => {
    switch(type) {
      case 'weather': return <CloudRain size={20} color="#0284c7" />;
      case 'market': return <TrendingUp size={20} color="#16a34a" />;
      case 'expert': return <HelpCircle size={20} color="#7c3aed" />;
      case 'advisor': return <Sprout size={20} color="#15803d" />;
      case 'scheme': return <Landmark size={20} color="#d97706" />;
      default: return <Bell size={20} color="#64748b" />;
    }
  };

  return (
    <div className="notifications-page">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="page-title">
            <Bell size={28} color="#ea580c" /> Agricultural Notifications & Alerts
          </h1>
          <p className="page-subtitle">
            Critical weather warnings, mandi price movements, expert answers, and government deadline notices.
          </p>
        </div>

        <button 
          onClick={markAllAsRead} 
          className="btn btn-secondary btn-sm"
        >
          <CheckCheck size={16} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="feed-tabs-bar" style={{ marginBottom: '20px' }}>
        <div className="feed-tabs-group">
          <button 
            onClick={() => setActiveFilter('all')} 
            className={`feed-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
          >
            All Alerts ({notifications.length})
          </button>
          <button 
            onClick={() => setActiveFilter('weather')} 
            className={`feed-tab-btn ${activeFilter === 'weather' ? 'active' : ''}`}
          >
            🌧 Weather
          </button>
          <button 
            onClick={() => setActiveFilter('market')} 
            className={`feed-tab-btn ${activeFilter === 'market' ? 'active' : ''}`}
          >
            📈 Mandi Prices
          </button>
          <button 
            onClick={() => setActiveFilter('expert')} 
            className={`feed-tab-btn ${activeFilter === 'expert' ? 'active' : ''}`}
          >
            👨‍🌾 Expert Q&A
          </button>
          <button 
            onClick={() => setActiveFilter('advisor')} 
            className={`feed-tab-btn ${activeFilter === 'advisor' ? 'active' : ''}`}
          >
            🌱 Crop Advisory
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(notif => (
          <div 
            key={notif.id}
            className={`farm-card ${!notif.read ? 'farm-card-interactive' : ''}`}
            onClick={() => {
              markAsRead(notif.id);
              if (notif.actionRoute) setActivePage(notif.actionRoute);
            }}
            style={{
              padding: '16px 20px',
              backgroundColor: !notif.read ? '#ffffff' : '#f8fafc',
              borderLeft: !notif.read ? '4px solid #16a34a' : '4px solid #cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '10px', 
                  backgroundColor: '#f1f5f9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {getIcon(notif.type)}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: notif.read ? '#475569' : '#0f172a' }}>
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  )}
                  <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>{notif.badge}</span>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '4px', lineHeight: 1.45 }}>
                  {notif.message}
                </p>

                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
                  {notif.time}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-secondary btn-sm"
              style={{ flexShrink: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                markAsRead(notif.id);
                if (notif.actionRoute) setActivePage(notif.actionRoute);
              }}
            >
              Open <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
