import React from 'react';
import { CloudSun, Bell, MapPin, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { weatherData } from '../../data/mockData';

export const Header = () => {
  const { user, isAdmin } = useAuth();
  const { setActivePage, unreadNotificationsCount } = useAppState();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="top-header">
      {/* Greeting & Location */}
      <div className="header-greeting-block">
        <div className="greeting-text">
          {isAdmin ? (
            <span>🛡️ Farmogram Admin Portal</span>
          ) : (
            <span>{getGreeting()}, Farmer {user.name.split(' ')[0]} 🌾</span>
          )}
        </div>
        <div className="greeting-subtext">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> {user.village}, {user.district} District • Season: Kharif / Samba
          </span>
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
          <span>Coimbatore <strong>{weatherData.currentTemp}°C</strong></span>
          <span style={{ opacity: 0.75 }}>• {weatherData.condition}</span>
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
