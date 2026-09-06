import React, { useState } from 'react';
import { Wheat, Phone, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { currentUser } from '../data/mockData';
import { generateForecastArray, generateAdvisories, generateCriticalAlert } from '../utils/weatherUtils';

export const Login = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const { setWeather } = useAppState();
  const [phone, setPhone] = useState('9842176540');
  const [otp, setOtp] = useState('1234');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const completeLogin = (userUpdates = {}, weatherUpdates = {}) => {
      if (Object.keys(weatherUpdates).length > 0) {
         setWeather(prev => ({...prev, ...weatherUpdates}));
      }
      login({ ...currentUser, ...userUpdates });
      setIsSubmitting(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            const locRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const locData = await locRes.json();
            const city = locData.address.city || locData.address.town || locData.address.village || locData.address.county || "Unknown Location";
            const state = locData.address.state || currentUser.state;
            
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`);
            const weatherData = await weatherRes.json();
            
            const temp = Math.round(weatherData.current.temperature_2m);
            const humidity = Math.round(weatherData.current.relative_humidity_2m);
            const windSpeed = Math.round(weatherData.current.wind_speed_10m);
            const code = weatherData.current.weather_code;
            
            let condition = "Clear";
            if (code >= 1 && code <= 3) condition = "Partly Cloudy";
            if (code >= 45 && code <= 48) condition = "Fog";
            if (code >= 51 && code <= 67) condition = "Rain";
            if (code >= 71 && code <= 77) condition = "Snow";
            if (code >= 80 && code <= 82) condition = "Showers";
            if (code >= 95) condition = "Thunderstorm";

            const forecast7Day = generateForecastArray(weatherData.daily);
            const agroAdvisories = generateAdvisories(weatherData.daily, { windSpeed });
            const advisoryAlert = generateCriticalAlert(agroAdvisories);

            const currentRainProb = weatherData.daily.precipitation_probability_max[0] || 0;
            const simulatedSoilMoisture = Math.round((humidity * 0.7) + (currentRainProb * 0.3));
            const soilStatus = simulatedSoilMoisture > 50 ? 'Adequate' : simulatedSoilMoisture > 30 ? 'Moderate' : 'Low/Dry';

            completeLogin(
              { village: city, district: city, state: state },
              { 
                location: `${city}, ${state}`, 
                currentTemp: temp, 
                humidity: humidity,
                windSpeed: windSpeed,
                condition: condition,
                rainfallProbability: currentRainProb,
                soilMoisture: `${soilStatus} (${simulatedSoilMoisture}%)`,
                forecast7Day: forecast7Day,
                agroAdvisories: agroAdvisories,
                advisoryAlert: advisoryAlert
              }
            );

          } catch (error) {
            console.error("Error fetching location/weather:", error);
            completeLogin(); 
          }
        },
        (error) => {
          console.warn("Geolocation error:", error);
          completeLogin(); 
        },
        { timeout: 7000 }
      );
    } else {
      completeLogin();
    }
  };

  return (
    <div className="auth-container auth-3d-bg">
      <div className="auth-card-3d">
        {/* Brand Banner */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="brand-logo-3d">
            <img src="/logo.png" alt="Farmogram Logo" />
          </div>
          <h1 className="brand-title-3d">
            Farmogram
          </h1>
          <p className="brand-subtitle-3d">
            Farmer Community & Precision Agricultural Decision Support
          </p>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="auth-form-3d">
          <div className="form-group-3d">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} /> Registered Mobile Number
            </label>
            <input 
              type="tel" 
              className="form-input-3d" 
              placeholder="+91 98421 76540" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group-3d">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} /> Password
            </label>
            <input 
              type="password" 
              className="form-input-3d" 
              placeholder="••••••••" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Demo password is pre-filled</span>
          </div>

          <button 
            type="submit" 
            className={`btn-3d-submit ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Fetching Location & Weather...' : 'Login to Farmogram'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#64748b' }}>
          New Farmer?{' '}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: 700, cursor: 'pointer' }}
          >
            Register Your Farm
          </button>
        </div>
      </div>
    </div>
  );
};
