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
import { AdminDashboard } from './pages/AdminDashboard';
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
  const { activePage } = useAppState();
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
    if (isAdmin) {
      return <AdminDashboard />;
    }

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
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
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

export default function App() {
  return (
    <AuthProvider>
      <AppStateProvider>
        <MainAppContent />
      </AppStateProvider>
    </AuthProvider>
  );
}
