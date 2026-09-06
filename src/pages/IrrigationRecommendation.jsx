import React, { useState } from 'react';
import { 
  Droplet, 
  Clock, 
  Calendar, 
  CloudSun, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Waves
} from 'lucide-react';
import { cropsList, soilTypes, irrigationScheduleMock } from '../data/mockData';

export const IrrigationRecommendation = () => {
  const [crop, setCrop] = useState('Tomato');
  const [soilType, setSoilType] = useState('Red Loam');
  const [growthStage, setGrowthStage] = useState('Flowering / Pegging');
  const [weatherCondition, setWeatherCondition] = useState('Partly Cloudy (Rain expected tomorrow)');
  const [waterSource, setWaterSource] = useState('Borewell with Inline Drip');

  const [schedule, setSchedule] = useState(
    irrigationScheduleMock.getRecommendation('Tomato', 'Red Loam', 'Flowering / Pegging', 'Rain expected')
  );

  const handleCalculate = (e) => {
    e.preventDefault();
    const result = irrigationScheduleMock.getRecommendation(crop, soilType, growthStage, weatherCondition);
    setSchedule(result);
  };

  return (
    <div className="irrigation-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <Droplet size={28} color="#0284c7" /> Irrigation Recommendation
        </h1>
        <p className="page-subtitle">
          Optimize crop moisture requirements based on plant growth phenology, soil retention dynamics, and forecasted rain events.
        </p>
      </div>

      <div className="advisor-layout-grid">
        {/* Left Inputs Form */}
        <div className="farm-card">
          <h2 className="card-section-title">Field & Moisture Parameters</h2>
          <p className="card-section-subtitle">Specify your crop stage and water setup.</p>

          <form onSubmit={handleCalculate} style={{ marginTop: '16px' }}>
            {/* 1. Crop Selection */}
            <div className="form-group">
              <label className="form-label">Crop Cultivated</label>
              <select className="form-select" value={crop} onChange={(e) => setCrop(e.target.value)}>
                {cropsList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* 2. Soil Type */}
            <div className="form-group">
              <label className="form-label">Soil Type</label>
              <select className="form-select" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                {soilTypes.map(st => (
                  <option key={st.id} value={st.name}>{st.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Crop Growth Stage */}
            <div className="form-group">
              <label className="form-label">Crop Phenological Stage</label>
              <select className="form-select" value={growthStage} onChange={(e) => setGrowthStage(e.target.value)}>
                <option value="Germination / Nursery (0-15 DAS)">Germination / Nursery (0-15 DAS)</option>
                <option value="Early Vegetative (16-35 DAS)">Early Vegetative (16-35 DAS)</option>
                <option value="Flowering / Pegging (36-60 DAS)">Flowering / Pegging (36-60 DAS)</option>
                <option value="Pod Development / Fruit Bulking (61-90 DAS)">Pod Development / Fruit Bulking (61-90 DAS)</option>
                <option value="Maturity & Pre-Harvest (90+ DAS)">Maturity & Pre-Harvest (90+ DAS)</option>
              </select>
            </div>

            {/* 4. Weather Context */}
            <div className="form-group">
              <label className="form-label">Short-Term Weather Outlook</label>
              <select className="form-select" value={weatherCondition} onChange={(e) => setWeatherCondition(e.target.value)}>
                <option value="Rain expected tomorrow (35mm)">Rain expected tomorrow (35-45mm)</option>
                <option value="Dry & Sunny (No rain)">Dry & Sunny (No rain for 5 days)</option>
                <option value="High Humidity & Mild Clouds">High Humidity & Mild Clouds</option>
              </select>
            </div>

            {/* 5. Irrigation System */}
            <div className="form-group">
              <label className="form-label">Irrigation System</label>
              <select className="form-select" value={waterSource} onChange={(e) => setWaterSource(e.target.value)}>
                <option value="Borewell with Inline Drip">Inline Drip Irrigation (2.4 LPH emitters)</option>
                <option value="Micro-Sprinkler System">Micro-Sprinkler System</option>
                <option value="Ridge & Furrow Surface Method">Ridge & Furrow Surface Method</option>
                <option value="Canal Basin Flooding">Canal Basin Flooding</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px', padding: '12px' }}>
              💧 Calculate Irrigation Schedule
            </button>
          </form>
        </div>

        {/* Right Output Dashboard */}
        <div className="irrigation-result-column">
          <div className="farm-card recommendation-card" style={{ borderTopColor: '#0284c7' }}>
            {/* Top Stat Ribbon */}
            <div className="rec-header-row">
              <div>
                <span className="badge badge-blue">Precision Hydrology</span>
                <div className="rec-crop-label" style={{ marginTop: '6px' }}>Recommended Irrigation</div>
                <h2 className="rec-crop-name" style={{ color: '#0369a1' }}>
                  {schedule.waterRequirement}
                </h2>
              </div>

              <div className="rec-match-pill" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
                <Clock size={24} color="#0284c7" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0369a1' }}>{schedule.duration}</div>
                <div className="match-label" style={{ color: '#0284c7' }}>Cycle Duration</div>
              </div>
            </div>

            {/* Next Scheduled Irrigation Banner */}
            <div className="sowing-window-strip" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
              <div className="sowing-icon-wrap" style={{ color: '#0284c7' }}>
                <Calendar size={22} color="#0284c7" />
              </div>
              <div>
                <div className="sowing-title" style={{ color: '#0369a1' }}>Next Scheduled Irrigation</div>
                <div className="sowing-dates" style={{ color: '#0f172a' }}>{schedule.nextIrrigation}</div>
              </div>
            </div>

            {/* Agronomic Rationale */}
            <div className="rec-rationale-section">
              <h3 className="rationale-heading">
                <Info size={18} color="#0284c7" /> Scientific Rationale
              </h3>
              <p style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, marginTop: '8px' }}>
                {schedule.rationale}
              </p>
            </div>

            {/* 7-Day Water Management Plan */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '10px' }}>
                📅 7-Day Irrigation Action Plan
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {schedule.next7DayPlan.map((plan, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '10px 14px', 
                      background: idx === 0 ? '#eff6ff' : '#ffffff', 
                      border: idx === 0 ? '1.5px solid #bfdbfe' : '1px solid #e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '0.84rem' 
                    }}
                  >
                    <strong style={{ minWidth: '90px', color: '#1e293b' }}>{plan.day}:</strong>
                    <span style={{ color: '#475569' }}>{plan.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
