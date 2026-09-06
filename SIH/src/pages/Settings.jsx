import React from 'react';
import { Settings as SettingsIcon, Globe, Bell, Eye, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import './Settings.css';

export const Settings = () => {
  const { currentLang, setCurrentLang, t } = useLanguage();
  const { 
    notificationsEnabled, setNotificationsEnabled,
    highContrastMode, setHighContrastMode 
  } = useAppState();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' }
  ];

  return (
    <div className="page-container settings-page">
      <div className="settings-header">
        <div className="header-icon-wrapper">
          <SettingsIcon size={24} className="text-white" />
        </div>
        <div>
          <h1 className="page-title">{t('settings')}</h1>
          <p className="page-subtitle">{t('settings_subtitle')}</p>
        </div>
      </div>

      <div className="settings-content">
        {/* Language Settings */}
        <section className="settings-section glass-panel">
          <div className="section-header">
            <Globe className="section-icon" size={20} />
            <h2>{t('language_region')}</h2>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h3>{t('app_language')}</h3>
              <p>{t('select_pref_lang')}</p>
            </div>
            <div className="setting-action">
              <select 
                className="language-select" 
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Notifications Settings */}
        <section className="settings-section glass-panel">
          <div className="section-header">
            <Bell className="section-icon" size={20} />
            <h2>{t('notifications')}</h2>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h3>{t('push_notifications')}</h3>
              <p>{t('receive_alerts')}</p>
            </div>
            <div className="setting-action">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Accessibility Settings */}
        <section className="settings-section glass-panel">
          <div className="section-header">
            <Eye className="section-icon" size={20} />
            <h2>{t('accessibility')}</h2>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h3>{t('high_contrast')}</h3>
              <p>{t('increase_contrast')}</p>
            </div>
            <div className="setting-action">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={highContrastMode}
                  onChange={(e) => setHighContrastMode(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="settings-section glass-panel">
          <div className="setting-item clickable">
            <div className="setting-info">
              <h3>{t('about_farmogram')}</h3>
              <p>{t('version_info')}</p>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        </section>
      </div>
    </div>
  );
};
