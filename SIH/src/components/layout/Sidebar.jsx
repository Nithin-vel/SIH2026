import React from 'react';
import { 
  Sprout, 
  CloudSun, 
  Bug, 
  Droplet, 
  TrendingUp, 
  Calculator, 
  Landmark, 
  HelpCircle, 
  Bell, 
  User, 
  ShieldAlert, 
  Wheat,
  Video,
  LogOut,
  ChevronRight,
  X,
  Settings
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = () => {
  const { activePage, setActivePage, unreadNotificationsCount, isDrawerOpen, toggleDrawer } = useAppState();
  const { user, isAdmin, toggleRole, logout } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('home'), icon: Sprout, highlight: true },
    { id: 'weather', label: t('weather'), icon: CloudSun },
    { id: 'disease', label: t('disease_detection'), icon: Bug },
    { id: 'irrigation', label: t('irrigation'), icon: Droplet },
    { id: 'notifications', label: t('notifications'), icon: Bell, count: unreadNotificationsCount },
    { id: 'profile', label: t('profile'), icon: User }
  ];

  return (
    <aside className={`sidebar ${isDrawerOpen ? 'drawer-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div className="brand-logo-icon" style={{ background: 'transparent', boxShadow: 'none' }}>
            <img src="/logo.png" alt="Farmogram Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="brand-text-block">
            <div className="brand-name">
              Farmogram
            </div>
            <div className="brand-tagline">{t('smart_agri_decision')}</div>
          </div>
        </div>
        <button 
          onClick={toggleDrawer}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-500)', padding: '4px' }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Mode Indicator / Switcher for SIH Jury */}
      <div className="sih-evaluator-badge">
        <span className="sih-tag">SIH 2026 Prototype</span>
        <button 
          onClick={toggleRole}
          className={`role-switch-btn ${isAdmin ? 'role-admin' : 'role-farmer'}`}
          title="Switch view to test Admin Dashboard"
        >
          {isAdmin ? `🛡️ ${t('admin_view')}` : `🌾 ${t('farmer_view')}`}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <div className="nav-group-label">{t('main_navigation')}</div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id && !isAdmin;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (isAdmin) toggleRole();
                setActivePage(item.id);
                toggleDrawer();
              }}
              className={`sidebar-nav-item ${isActive ? 'active' : ''} ${item.highlight ? 'highlighted-nav' : ''}`}
            >
              <span className="nav-item-icon-wrapper">
                <Icon size={20} />
              </span>
              <span className="nav-item-label">{item.label}</span>

              {item.badge && (
                <span className="nav-item-badge">{item.badge}</span>
              )}

              {item.count > 0 && (
                <span className="nav-item-counter">{item.count}</span>
              )}

              <ChevronRight size={16} className="nav-item-arrow" />
            </button>
          );
        })}

        {/* Settings Item */}
        <div className="nav-group-label" style={{ marginTop: '16px' }}>{t('management')}</div>
        <button
          onClick={() => {
            setActivePage('settings');
            toggleDrawer();
          }}
          className={`sidebar-nav-item ${activePage === 'settings' ? 'active' : ''}`}
        >
          <span className="nav-item-icon-wrapper">
            <Settings size={20} />
          </span>
          <span className="nav-item-label">{t('settings')}</span>
        </button>
      </nav>

      {/* Farmer Profile Footer in Sidebar */}
      <div className="sidebar-footer">
        <div 
          className="user-profile-card"
          onClick={() => {
            setActivePage('profile');
            toggleDrawer();
          }}
        >
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="user-avatar"
          />
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-loc">{user.village}, {user.district}</div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              logout();
            }} 
            className="logout-icon-btn" 
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
