import React from 'react';
import { CloudSun, Bell, MapPin, Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const { setActivePage, unreadNotificationsCount, toggleDrawer, weather } = useAppState();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="top-header">
      {/* Hamburger Menu & Location */}
      <div className="header-greeting-block" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={toggleDrawer}
          className="hamburger-menu-btn"
          title="Open Menu"
          style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--slate-700)' }}
        >
          <Menu size={24} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="greeting-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="Farmogram Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Farmogram</span>
          </div>
        </div>
      </div>

      {/* Weather Chip & Notifications */}
      <div className="header-actions">
        {/* Quick Weather Snapshot */}
        <button 
          onClick={() => setActivePage('weather')} 
          className="header-weather-chip"
          title="Click to view complete 7-day weather forecast"
        >
          <CloudSun size={18} color="#16a34a" />
          <span>{weather.location.split(',')[0]} <strong>{weather.currentTemp}°C</strong></span>
          <span style={{ opacity: 0.75 }}>• {weather.condition}</span>
        </button>

        {/* Notification Bell */}
        <button 
          onClick={() => setActivePage('notifications')}
          className="header-notif-btn" 
          title="View Agricultural Alerts & Notifications"
        >
          <Bell size={18} />
          {unreadNotificationsCount > 0 && (
            <span className="notif-pulse-dot" />
          )}
        </button>

        {/* Small Avatar on Mobile/Tablet */}
        <button
          onClick={() => setActivePage('profile')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
          title="Farmer Profile"
        >
          <img 
            src={user.avatar} 
            alt={user.name} 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9999px',
              objectFit: 'cover',
              border: '2px solid #22c55e'
            }}
          />
        </button>
      </div>
    </header>
  );
};
