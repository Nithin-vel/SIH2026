import React, { useState } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  CloudRain, 
  Sun, 
  AlertTriangle, 
  Thermometer, 
  Eye, 
  Compass, 
  Calendar,
  CheckCircle2,
  Info,
  MapPin
} from 'lucide-react';
import { locations } from '../data/mockData';
import { useAppState } from '../context/AppStateContext';

export const WeatherPage = () => {
  const { weather } = useAppState();

  // Dynamic advisories are now fetched from the global weather state
  const agroAdvisories = weather.agroAdvisories || [];

  return (
    <div className="weather-page">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">
            <CloudSun size={28} color="#0284c7" /> Agricultural Weather Intelligence
          </h1>
          <p className="page-subtitle">
            Hyperlocal microclimate forecasts and agrometeorological advisories tailored for field operations.
          </p>
        </div>
      </div>

      {/* Hero Weather Card */}
      <div className="weather-hero-card">
        <div className="weather-hero-main">
          <div>
            <span className="weather-loc-tag">Current Conditions • {weather.location.split(',')[0]} Observatory</span>
            <div className="weather-temp-row">
              <span className="current-temp-large">{weather.currentTemp}°</span>
              <div className="temp-sub-meta">
                <span className="temp-celsius">C</span>
                <span className="feels-like-text">Feels like {weather.feelsLike}°C</span>
                <span className="sky-condition-pill">{weather.condition}</span>
              </div>
            </div>
          </div>

          <div className="weather-hero-icon-large">
            <CloudSun size={84} color="#f59e0b" />
          </div>
        </div>

        {/* Live Weather Metrics Grid */}
        <div className="weather-metrics-bar">
          <div className="weather-metric-item">
            <Droplets size={20} color="#0ea5e9" />
            <div>
              <span className="metric-label">Relative Humidity</span>
              <strong className="metric-value">{weather.humidity}%</strong>
            </div>
          </div>

          <div className="weather-metric-item">
            <CloudRain size={20} color="#38bdf8" />
            <div>
              <span className="metric-label">Rainfall Probability</span>
              <strong className="metric-value">{weather.forecast7Day?.[0]?.rainProb ?? weather.rainfallProbability}%</strong>
            </div>
          </div>

          <div className="weather-metric-item">
            <Wind size={20} color="#64748b" />
            <div>
              <span className="metric-label">Wind Speed</span>
              <strong className="metric-value">{weather.windSpeed} km/h ({weather.windDirection})</strong>
            </div>
          </div>

          <div className="weather-metric-item">
            <Thermometer size={20} color="#eab308" />
            <div>
              <span className="metric-label">Soil Moisture Index</span>
              <strong className="metric-value">{weather.soilMoisture}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Agricultural Advisories Grid */}
      <div style={{ marginTop: '28px' }}>
        <div className="section-title-row">
          <h2 className="section-title">🌾 Actionable Agricultural Advisories</h2>
          <span className="section-subtitle">Practical guidance for spraying, irrigation, and harvesting</span>
        </div>

        <div className="grid-2" style={{ marginTop: '12px' }}>
          {agroAdvisories.map(adv => (
            <div 
              key={adv.id} 
              className="farm-card advisory-card"
              style={{ borderLeft: `4px solid ${adv.color}`, backgroundColor: adv.bg }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '1.6rem' }}>{adv.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: adv.color }}>{adv.title}</h3>
                    <span 
                      style={{ 
                        fontSize: '0.68rem', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        padding: '2px 6px', 
                        borderRadius: '9999px',
                        background: adv.severity === 'high' ? '#ea580c' : '#ffffff',
                        color: adv.severity === 'high' ? '#ffffff' : adv.color,
                        border: '1px solid ' + adv.color
                      }}
                    >
                      {adv.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#334155', marginTop: '6px', lineHeight: 1.5 }}>
                    {adv.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Agricultural Forecast Table / Cards */}
      <div style={{ marginTop: '32px' }}>
        <div className="section-title-row">
          <h2 className="section-title">📅 7-Day Precision Agricultural Forecast</h2>
          <span className="section-subtitle">Anticipate moisture windows and plan labor cycles</span>
        </div>

        <div className="forecast-strip-grid" style={{ marginTop: '14px' }}>
          {weather.forecast7Day.map((day, idx) => (
            <div key={idx} className={`farm-card forecast-day-card ${idx === 0 ? 'today-card' : ''}`}>
              <div className="forecast-day-header">
                <span className="forecast-day-name">{day.day}</span>
                <span className="forecast-date">{day.date}</span>
              </div>

              <div className="forecast-cond-icon">
                {day.condition.includes('Rain') || day.condition.includes('Showers') ? (
                  <CloudRain size={28} color="#0284c7" />
                ) : day.condition.includes('Sunny') || day.condition.includes('Clear') ? (
                  <Sun size={28} color="#f59e0b" />
                ) : (
                  <CloudSun size={28} color="#64748b" />
                )}
              </div>

              <div className="forecast-temp-range">
                <span className="max-temp">{day.tempMax}°</span>
                <span className="min-temp">/ {day.tempMin}°</span>
              </div>

              <div className="forecast-rain-pill" style={{ backgroundColor: day.rainProb > 50 ? '#dbeafe' : '#f1f5f9', color: day.rainProb > 50 ? '#0369a1' : '#64748b' }}>
                <CloudRain size={12} /> {day.rainProb}% rain
              </div>

              <div className="forecast-advisory-tip">
                "{day.advisory}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
