import React from 'react';
import { Wheat, TrendingUp, Calculator, Landmark, HelpCircle } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';

export const MobileNav = () => {
  const { activePage, setActivePage } = useAppState();
  const { t } = useLanguage();

  const mobileItems = [
    { id: 'home', label: t('home'), icon: Wheat },
    { id: 'market', label: t('market'), icon: TrendingUp },
    { id: 'profit', label: t('profit'), icon: Calculator },
    { id: 'schemes', label: t('schemes'), icon: Landmark },
    { id: 'expert-qa', label: t('qa'), icon: HelpCircle }
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
