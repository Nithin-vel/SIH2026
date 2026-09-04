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
  ChevronRight
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { activePage, setActivePage, unreadNotificationsCount } = useAppState();
  const { user, isAdmin, toggleRole, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Farmogram', icon: Wheat, badge: 'Live Feed' },
    { id: 'crop-advisor', label: 'Crop Advisor', icon: Sprout, highlight: true },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'disease', label: 'Disease Detection', icon: Bug },
    { id: 'irrigation', label: 'Irrigation', icon: Droplet },
    { id: 'market', label: 'Market', icon: TrendingUp },
    { id: 'profit', label: 'Profit Calculator', icon: Calculator },
    { id: 'schemes', label: 'Schemes', icon: Landmark },
    { id: 'expert-qa', label: 'Expert Q&A', icon: HelpCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo-icon">
          <Wheat className="logo-icon-svg" />
        </div>
        <div className="brand-text-block">
          <div className="brand-name">
            Farmogram <span className="brand-ai">AI</span>
          </div>
          <div className="brand-tagline">Smart Agri Decision & Community</div>
        </div>
      </div>

      {/* Mode Indicator / Switcher for SIH Jury */}
      <div className="sih-evaluator-badge">
        <span className="sih-tag">SIH 2026 Prototype</span>
        <button 
          onClick={toggleRole}
          className={`role-switch-btn ${isAdmin ? 'role-admin' : 'role-farmer'}`}
          title="Switch view to test Admin Dashboard"
        >
          {isAdmin ? '🛡️ Admin View' : '🌾 Farmer View'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <div className="nav-group-label">MAIN NAVIGATION</div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id && !isAdmin;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (isAdmin) toggleRole();
                setActivePage(item.id);
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

        {/* Dedicated Admin Dashboard Item */}
        <div className="nav-group-label" style={{ marginTop: '16px' }}>MANAGEMENT</div>
        <button
          onClick={() => {
            if (!isAdmin) toggleRole();
            setActivePage('admin');
          }}
          className={`sidebar-nav-item ${activePage === 'admin' || isAdmin ? 'active admin-active' : ''}`}
        >
          <span className="nav-item-icon-wrapper">
            <ShieldAlert size={20} />
          </span>
          <span className="nav-item-label">Admin Dashboard</span>
          <span className="nav-item-badge admin-badge">SIH Panel</span>
        </button>
      </nav>

      {/* Farmer Profile Footer in Sidebar */}
      <div className="sidebar-footer">
        <div 
          className="user-profile-card"
          onClick={() => setActivePage('profile')}
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
