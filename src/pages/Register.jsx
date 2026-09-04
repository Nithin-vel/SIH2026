import React, { useState } from 'react';
import { Wheat, MapPin, Layers, Droplet, User, Phone, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { locations, soilTypes, cropsList } from '../data/mockData';

export const Register = ({ onSwitchToLogin }) => {
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Coimbatore');
  const [village, setVillage] = useState('');
  const [landArea, setLandArea] = useState('3.0');
  const [soilType, setSoilType] = useState('Red Loam');
  const [selectedCrops, setSelectedCrops] = useState(['Tomato', 'Paddy']);
  const [waterSource, setWaterSource] = useState('Borewell with Drip');

  const toggleCrop = (crop) => {
    setSelectedCrops(prev => 
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newFarmer = {
      id: 'usr_' + Date.now(),
      name: name.trim() || 'Farmer Ramasamy',
      phone: phone.trim() || '+91 94432 10987',
      village: village.trim() || 'Sulur',
      district,
      state: 'Tamil Nadu',
      landArea,
      primaryCrops: selectedCrops.length > 0 ? selectedCrops : ['Tomato'],
      soilType,
      waterSource,
      language: 'English (Tamil native)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
      bio: 'Cultivating crops with smart water practices.',
      verified: false,
      role: 'farmer'
    };

    login(newFarmer);
  };

  return (
    <div className="auth-container">
      <div className="farm-card auth-card" style={{ maxWidth: '540px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="brand-logo-icon" style={{ margin: '0 auto 10px auto', width: '48px', height: '48px' }}>
            <Wheat size={26} />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
            Farmer Onboarding
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Register your landholding to unlock hyperlocal microclimate and agronomic decision tools.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Farmer Full Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g., Ramasamy K." 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number *</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="+91 94432 10987" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">District</label>
              <select className="form-select" value={district} onChange={(e) => setDistrict(e.target.value)}>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Village / Town</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g., Sulur" 
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Cultivable Land (Acres)</label>
              <input 
                type="number" 
                step="0.5" 
                className="form-input" 
                value={landArea} 
                onChange={(e) => setLandArea(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dominant Soil Type</label>
              <select className="form-select" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                {soilTypes.map(st => (
                  <option key={st.id} value={st.name}>{st.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Crops Selection */}
          <div className="form-group">
            <label className="form-label">Primary Crops Cultivated (Select 1 or more)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              {cropsList.map(crop => {
                const isSelected = selectedCrops.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {crop} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', marginTop: '16px' }}
          >
            Create Farmer Profile & Enter
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: '#64748b' }}>
          Already registered?{' '}
          <button 
            type="button"
            onClick={onSwitchToLogin}
            style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: 700, cursor: 'pointer' }}
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};
