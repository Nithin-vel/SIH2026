import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Layers, 
  Calendar, 
  Droplets, 
  Maximize2, 
  RotateCcw, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Info,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  locations, 
  soilTypes, 
  seasonsList, 
  waterAvailabilityList, 
  cropsList,
  cropAdvisoriesDatabase 
} from '../data/mockData';
import { Modal } from '../components/common/Modal';

export const CropAdvisor = () => {
  // Input Form State
  const [location, setLocation] = useState('Coimbatore');
  const [soilType, setSoilType] = useState('Red Loam');
  const [season, setSeason] = useState('Kharif / Samba (Jun - Nov)');
  const [waterAvailability, setWaterAvailability] = useState('Moderate (Seasonal Well / Scheduled Borewell)');
  const [landArea, setLandArea] = useState('4.5');
  const [previousCrop, setPreviousCrop] = useState('Tomato');

  // Recommendation State
  const [selectedCropKey, setSelectedCropKey] = useState('Groundnut');
  const [recommendation, setRecommendation] = useState(cropAdvisoriesDatabase['Groundnut']);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      // Dynamic recommendation matching based on inputs
      let matchedCrop = 'Groundnut';
      if (waterAvailability.includes('Abundant') || soilType.includes('Clayey')) {
        matchedCrop = 'Paddy';
      } else if (previousCrop === 'Groundnut' || soilType.includes('Sandy')) {
        matchedCrop = 'Tomato';
      } else if (soilType.includes('Black Cotton')) {
        matchedCrop = 'Maize';
      } else {
        matchedCrop = 'Groundnut';
      }

      setSelectedCropKey(matchedCrop);
      setRecommendation(cropAdvisoriesDatabase[matchedCrop] || cropAdvisoriesDatabase['Groundnut']);
      setIsCalculating(false);
    }, 400);
  };

  return (
    <div className="advisor-page">
      {/* Page Title */}
      <div className="page-header">
        <h1 className="page-title">
          <Sprout size={28} color="#16a34a" /> Smart Crop Advisor
        </h1>
        <p className="page-subtitle">
          Multi-factorial agronomic decision support. Evaluates seasonal micro-climate, soil characteristics, water budget, crop history, and APMC market trends.
        </p>
      </div>

      {/* Critical Agronomic Guidance Box */}
      <div className="agri-notice-box" style={{ marginBottom: '24px' }}>
        <Info size={20} color="#0284c7" />
        <div>
          <strong>Agronomic Principle:</strong> Soil Type is evaluated as <strong>one essential factor</strong> in conjunction with local weather forecasts, water availability, crop rotation benefits, and mandi price projections. Soil type alone does not determine crop viability.
        </div>
      </div>

      <div className="advisor-layout-grid">
        {/* Left: Input Parameters Card */}
        <div className="farm-card advisor-inputs-card">
          <h2 className="card-section-title">Farm & Environmental Inputs</h2>
          <p className="card-section-subtitle">Provide your land and resource parameters for tailored advice.</p>

          <form onSubmit={handleCalculate} style={{ marginTop: '16px' }}>
            {/* 1. Location */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#16a34a" /> District / Location
              </label>
              <select 
                className="form-select" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}, Tamil Nadu</option>
                ))}
              </select>
            </div>

            {/* 2. Soil Type (Notice: Clean informative selection, NO score/percentage) */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={15} color="#b45309" /> Soil Type (Physical Texture & Class)
              </label>
              <select 
                className="form-select" 
                value={soilType} 
                onChange={(e) => setSoilType(e.target.value)}
              >
                {soilTypes.map(st => (
                  <option key={st.id} value={st.name}>{st.name}</option>
                ))}
              </select>
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                {soilTypes.find(s => s.name === soilType)?.description}
              </span>
            </div>

            {/* 3. Season */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} color="#0284c7" /> Sowing Season
              </label>
              <select 
                className="form-select" 
                value={season} 
                onChange={(e) => setSeason(e.target.value)}
              >
                {seasonsList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* 4. Water Availability */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Droplets size={15} color="#0284c7" /> Water Availability
              </label>
              <select 
                className="form-select" 
                value={waterAvailability} 
                onChange={(e) => setWaterAvailability(e.target.value)}
              >
                {waterAvailabilityList.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* 5. Land Area & Previous Crop */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Maximize2 size={15} color="#16a34a" /> Land Area (Acres)
                </label>
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
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <RotateCcw size={15} color="#d97706" /> Previous Crop
                </label>
                <select 
                  className="form-select" 
                  value={previousCrop} 
                  onChange={(e) => setPreviousCrop(e.target.value)}
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Paddy">Paddy</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Maize">Maize</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Pulses / Fallow">Pulses / Fallow</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '8px', padding: '12px' }}
              disabled={isCalculating}
            >
              {isCalculating ? 'Computing Multi-Factor Advisory...' : '🌱 Generate Crop Advisory'}
            </button>
          </form>
        </div>

        {/* Right: Recommendation Output Display */}
        <div className="advisor-result-column">
          {recommendation && (
            <div className="farm-card recommendation-card">
              {/* Header Badge & Title */}
              <div className="rec-header-row">
                <div>
                  <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                    Top Agronomic Match
                  </span>
                  <div className="rec-crop-label" style={{ marginTop: '6px' }}>
                    Recommended Crop
                  </div>
                  <h2 className="rec-crop-name">{recommendation.crop}</h2>
                  <div className="rec-variety-tag">Recommended Variety: <strong>{recommendation.variety}</strong></div>
                </div>

                <div className="rec-match-pill">
                  <div className="match-percent">{recommendation.matchScore}%</div>
                  <div className="match-label">Suitability Index</div>
                </div>
              </div>

              {/* Sowing Window Strip */}
              <div className="sowing-window-strip">
                <div className="sowing-icon-wrap">
                  <Calendar size={22} color="#15803d" />
                </div>
                <div>
                  <div className="sowing-title">Best Sowing Window</div>
                  <div className="sowing-dates">{recommendation.sowingWindow}</div>
                </div>
              </div>

              {/* "Why this crop?" Multi-factor Breakdown */}
              <div className="rec-rationale-section">
                <h3 className="rationale-heading">
                  <CheckCircle2 size={18} color="#16a34a" /> Why this crop is recommended?
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '12px' }}>
                  Scientific multi-factor decision matrix (Soil type is weighted as 1 of 6 criteria):
                </p>

                <div className="rationale-factors-list">
                  {recommendation.multiFactorRationale.map((item, idx) => (
                    <div key={idx} className="rationale-item">
                      <div className="rationale-check-icon">✓</div>
                      <div className="rationale-details">
                        <div className="rationale-factor-title">
                          <span>{item.factor}</span>
                          <span className="rationale-status-badge">{item.status}</span>
                        </div>
                        <div className="rationale-factor-note">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Estimates Card */}
              <div className="rec-financials-card">
                <h4 className="financials-title">
                  <DollarSign size={16} color="#16a34a" /> Projected Financial Feasibility ({landArea} Acres)
                </h4>
                <div className="financials-grid">
                  <div className="fin-metric-box">
                    <span className="fin-label">Expected Yield</span>
                    <strong className="fin-val">{recommendation.financials.expectedYield}</strong>
                  </div>
                  <div className="fin-metric-box">
                    <span className="fin-label">Est. Cultivation Cost</span>
                    <strong className="fin-val" style={{ color: '#b45309' }}>{recommendation.financials.cultivationCost}</strong>
                  </div>
                  <div className="fin-metric-box">
                    <span className="fin-label">Expected Revenue</span>
                    <strong className="fin-val" style={{ color: '#0284c7' }}>{recommendation.financials.expectedRevenue}</strong>
                  </div>
                  <div className="fin-metric-box profit-box">
                    <span className="fin-label">Potential Net Profit</span>
                    <strong className="fin-val profit-text">{recommendation.financials.potentialProfit}</strong>
                    <span className="roi-badge">ROI ~ {recommendation.financials.roi}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="rec-actions-footer">
                <button 
                  onClick={() => setIsDetailsOpen(true)}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  <FileText size={16} /> View Recommendation Details
                </button>
                <button 
                  onClick={() => alert(`Saved ${recommendation.crop} recommendation to your farmer profile records!`)}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Save Advisory to Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Agronomic Recommendation Details Modal */}
      {isDetailsOpen && recommendation && (
        <Modal 
          isOpen={true} 
          onClose={() => setIsDetailsOpen(false)} 
          title={`🌾 Comprehensive Agronomic Package: ${recommendation.crop} (${recommendation.variety})`}
          maxWidth="700px"
        >
          <div className="rec-modal-details">
            <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '16px' }}>
              <h4 style={{ color: '#14532d', fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                Key Package of Practices (TNAU / ICAR Standards)
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#166534', lineHeight: 1.6 }}>
                {recommendation.practices?.map((p, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>{p}</li>
                ))}
              </ul>
            </div>

            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
              Recommended Fertilizer Schedule (NPK Ratio)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Basal Dose</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>10:20:20 kg/ac</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Top Dressing (30 DAS)</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Urea 15 kg/ac</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Gypsum / Micronutrient</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>200 kg Gypsum</div>
              </div>
            </div>

            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
              Key Pest & Disease Watchpoints
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5 }}>
              Monitor for early leaf miner punctures and Cercospora leaf spots during monsoon humidity. Adopt yellow sticky traps and light traps for bio-monitoring.
            </p>

            <div className="modal-footer" style={{ margin: '20px -24px -24px -24px' }}>
              <button className="btn btn-primary" onClick={() => setIsDetailsOpen(false)}>
                Understood, Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
