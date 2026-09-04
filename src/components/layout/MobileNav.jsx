import React from 'react';
import { Wheat, Sprout, Bug, TrendingUp, User, Bell } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const MobileNav = () => {
  const { activePage, setActivePage, unreadNotificationsCount } = useAppState();

  const mobileItems = [
    { id: 'home', label: 'Feed', icon: Wheat },
    { id: 'crop-advisor', label: 'Advisor', icon: Sprout },
    { id: 'disease', label: 'Disease', icon: Bug },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'notifications', label: 'Alerts', icon: Bell, count: unreadNotificationsCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {mobileItems.map(item => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} />
              {item.count > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444'
                  }}
                />
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
