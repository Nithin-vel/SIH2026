import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppStateProvider, useAppState } from './context/AppStateContext';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';

// Page Components
import { Home } from './pages/Home';
import { CropAdvisor } from './pages/CropAdvisor';
import { WeatherPage } from './pages/WeatherPage';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { IrrigationRecommendation } from './pages/IrrigationRecommendation';
import { MarketIntelligence } from './pages/MarketIntelligence';
import { ProfitCalculator } from './pages/ProfitCalculator';
import { GovernmentSchemes } from './pages/GovernmentSchemes';
import { ExpertQA } from './pages/ExpertQA';
import { NotificationsPage } from './pages/NotificationsPage';
import { FarmerProfile } from './pages/FarmerProfile';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Styles
import './index.css';
import './components/layout/layout.css';
import './components/feed/feed.css';
import './pages/Home.css';
import './pages/CropAdvisor.css';
import './pages/WeatherPage.css';
import './pages/DiseaseDetection.css';
import './pages/auth.css';

const MainAppContent = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { activePage, isDrawerOpen, toggleDrawer } = useAppState();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // If farmer is not logged in, display authentication view
  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <Login onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  // Active page renderer
  const renderActivePage = () => {

    switch (activePage) {
      case 'home':
        return <Home />;
      case 'crop-advisor':
        return <CropAdvisor />;
      case 'weather':
        return <WeatherPage />;
      case 'disease':
        return <DiseaseDetection />;
      case 'irrigation':
        return <IrrigationRecommendation />;
      case 'market':
        return <MarketIntelligence />;
      case 'profit':
        return <ProfitCalculator />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'expert-qa':
        return <ExpertQA />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <FarmerProfile />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="drawer-overlay"
          onClick={toggleDrawer}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 900,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Left Navigation Sidebar (now acting as mobile drawer) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header />
        <main className="page-content">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Navigation Bottom Bar */}
      <MobileNav />
    </div>
  );
};

import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppStateProvider>
          <MainAppContent />
        </AppStateProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
