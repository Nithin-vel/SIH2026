import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  MapPin,
  CheckCircle2, 
  Info,
  ArrowLeft,
  Thermometer,
  Droplets,
  Layers
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import indianStatesData from '../data/indianStates.json';
import { CROPS_DB } from '../data/cropsDb.js';

const STATE_OPTIONS = indianStatesData.states.map(s => ({ label: s.state, value: s.state }));
const CITIES_BY_STATE = {};
indianStatesData.states.forEach(s => {
  CITIES_BY_STATE[s.state] = s.districts;
});

// --- ADAPTIVE QUESTION ENGINE ---
const QUESTIONS_KB = [
  { 
    id: "state", 
    question: "Which State is your field located in?", 
    type: "select", 
    options: STATE_OPTIONS,
    importance: 100 
  },
  { 
    id: "city", 
    question: "Which District/City is your field located in?", 
    type: "select", 
    options: [], // Populated dynamically
    importance: 99 
  },
  { 
    id: "water_availability", 
    question: "What is the primary source of water?", 
    type: "select", 
    options: [
      {label: "Rainfed (No Irrigation)", value: "rainfed"},
      {label: "Irrigated (Reliable Well/Canal)", value: "irrigated"},
      {label: "Partially Irrigated (Limited)", value: "partial"}
    ],
    importance: 98 
  },
  { id: "planting_date", question: "When do you intend to plant?", type: "date", importance: 97 },
  { id: "land_area", question: "What is the cultivable land area (in acres)?", type: "number", importance: 96 },
  { id: "has_soil_test", question: "Do you have a recent soil test report for this field?", type: "boolean", importance: 95 },
  { id: "soil_ph", question: "What is the exact soil pH from your report?", type: "number", required_when: {"has_soil_test": true}, importance: 94 }
];

const evaluateCondition = (condition, collectedData) => {
  for (const [key, value] of Object.entries(condition)) {
    if (collectedData[key] !== value) return false;
  }
  return true;
};

const getNextQuestion = (collectedData) => {
  let candidates = [];
  for (let q of QUESTIONS_KB) {
    if (collectedData[q.id] !== undefined) continue;
    if (q.required_when && !evaluateCondition(q.required_when, collectedData)) continue;
    candidates.push(q);
  }
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.importance - a.importance);
  return candidates[0];
};

// --- RECOMMENDATION ENGINE & REAL DATA ---
// CROPS_DB is imported from ../data/cropsDb.js

const generateRecommendations = async (sessionData) => {
  let lat = 11.0;
  let lon = 77.0;
  let weatherData = null;
  let soilData = null;
  let locationName = `${sessionData.city}, ${sessionData.state}`;

  // 1. Geocoding
  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`);
    const geoJson = await geoRes.json();
    if (geoJson && geoJson.length > 0) {
      lat = parseFloat(geoJson[0].lat);
      lon = parseFloat(geoJson[0].lon);
      locationName = geoJson[0].display_name.split(',')[0];
    }
  } catch (e) { console.error("Geocoding failed", e); }

  // 2. Fetch Weather and Soil in parallel for speed
  const fetchWeather = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation`)
    .then(res => res.json())
    .then(wJson => { weatherData = wJson.current; })
    .catch(e => console.error("Weather API failed", e));

  let fetchSoil = Promise.resolve();
  if (!sessionData.has_soil_test) {
    fetchSoil = fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o&depth=0-5cm&value=mean`)
      .then(res => res.json())
      .then(sJson => {
        const phLayer = sJson.properties?.layers?.find(l => l.name === 'phh2o');
        if (phLayer && phLayer.depths[0]?.values?.mean) {
          soilData = { ph: phLayer.depths[0].values.mean / 10 };
        }
      })
      .catch(e => console.error("Soil API failed", e));
  } else {
    soilData = { ph: parseFloat(sessionData.soil_ph) };
  }

  await Promise.all([fetchWeather, fetchSoil]);
  
  // If fallback fails, default to 6.5
  if (!soilData) {
    soilData = { ph: 6.5 };
  }

  // Confidence calculation
  let confidence = 100.0;
  let missingInfo = [];
  if (!sessionData.has_soil_test) {
    confidence -= 15.0;
    missingInfo.push("Recent laboratory soil test");
  }

  let recommendations = CROPS_DB.map(crop => {
    let climateScore = 50;
    let soilScore = 50;
    let waterScore = 50;

    // Climate Eval: Exact midpoint penalty to prevent ties
    if (weatherData && weatherData.temperature_2m && crop.temp_range) {
      const temp = weatherData.temperature_2m;
      const optMid = (crop.temp_range.optimal_min + crop.temp_range.optimal_max) / 2;
      
      if (temp < crop.temp_range.min || temp > crop.temp_range.max) {
        climateScore = 20.0;
      } else {
        const distToMid = Math.abs(temp - optMid);
        // E.g. temp diff from exact optimal center * penalty factor
        // This ensures continuous fractional variance
        climateScore = Math.max(20.0, 95.0 - (distToMid * 1.5));
      }
    } else {
      climateScore = 60.0;
    }

    // Soil Eval: Exact midpoint penalty to prevent ties
    if (soilData && soilData.ph && crop.soil_ph_range) {
      const ph = soilData.ph;
      const optMid = (crop.soil_ph_range.optimal_min + crop.soil_ph_range.optimal_max) / 2;

      if (ph < crop.soil_ph_range.min || ph > crop.soil_ph_range.max) {
        soilScore = 30.0;
      } else {
        const distToMid = Math.abs(ph - optMid);
        soilScore = Math.max(30.0, 95.0 - (distToMid * 15.0)); 
      }
    } else {
      soilScore = 60.0; 
    }

    // Water Eval: Exact Crop Requirement vs Farm Availability Matrix
    if (sessionData.water_availability === "irrigated") {
      if (crop.water_requirement === "high") waterScore = 95;
      else if (crop.water_requirement === "medium") waterScore = 90;
      else waterScore = 80; // Over-irrigation isn't necessarily bad, but less resource efficient
    } else if (sessionData.water_availability === "partial") {
      if (crop.water_requirement === "high") waterScore = 40;
      else if (crop.water_requirement === "medium") waterScore = 85;
      else waterScore = 95;
    } else if (sessionData.water_availability === "rainfed") {
      if (crop.water_requirement === "high") waterScore = 15;
      else if (crop.water_requirement === "medium") waterScore = 55;
      else waterScore = 90;
    } else {
      waterScore = 50;
    }

    // Regional Relevance Multiplier
    const isRegional = crop.regions.includes(sessionData.state);
    let regionalBonus = isRegional ? 15 : 0; // Huge boost for native/regional crops

    let overall = (climateScore * 0.25) + (soilScore * 0.35) + (waterScore * 0.40);
    overall = Math.min(98, overall + regionalBonus); // Max 98, nothing is perfect

    // If it's not a regional crop and overall is low, it might not even make the list, which is good.

    let risks = [];
    if (sessionData.water_availability === "rainfed" && crop.water_requirement === "high") {
      risks.push({ type: "Drought Risk", mitigation: "Extremely vulnerable without supplemental irrigation." });
    }
    if (soilData && soilData.ph && (soilData.ph < crop.soil_ph_range.min || soilData.ph > crop.soil_ph_range.max)) {
      risks.push({ type: "Soil pH Mismatch", mitigation: `Current pH is ${soilData.ph.toFixed(1)}. Optimal is ${crop.soil_ph_range.min}-${crop.soil_ph_range.max}. Requires soil amendments.` });
    }
    
    // Dynamic Explanation Generation
    let exp = "";
    if (isRegional) {
      exp += `${crop.name} is a major commercial crop traditionally grown in ${sessionData.state}. `;
    } else {
      exp += `While not traditionally dominant in ${sessionData.state}, ${crop.name} can be grown here. `;
    }
    
    // Inject unique agronomic trait
    if (crop.agronomic_trait) {
      exp += `${crop.agronomic_trait} `;
    }
    
    let phText = sessionData.has_soil_test ? `inputted soil pH of ${soilData?.ph}` : `regionally estimated soil pH of ${soilData?.ph?.toFixed(1)}`;
    exp += `Based on your live local temperature of ${weatherData?.temperature_2m}°C and ${phText}, it has a ${overall.toFixed(1)}% suitability match. `;
    
    if (waterScore < 50) {
      exp += `However, your ${sessionData.water_availability} setup poses a significant water feasibility challenge for this crop.`;
    } else if (climateScore > 85 && soilScore > 85) {
      exp += `Your environment provides excellent agronomic conditions.`;
    }

    return {
      crop: crop.name,
      suitabilityScore: overall,
      confidence: confidence,
      soilSuitability: soilScore,
      waterSuitability: waterScore,
      climateSuitability: climateScore,
      risks: risks,
      realData: {
        temp: weatherData?.temperature_2m,
        ph: soilData?.ph
      },
      cropData: crop,
      explanation: exp
    };
  });

  recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  
  return {
    recommendedCrops: recommendations.slice(0, 5),
    confidence: confidence,
    missingInformation: missingInfo,
    locationName: locationName,
    weatherFetched: !!weatherData,
    soilFetched: !sessionData.has_soil_test && !!soilData
  };
};

const ScoreBar = ({ label, score, color, icon: Icon }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Icon size={14} color={color} /> {label}
      </span>
      <span style={{ color: score > 80 ? '#16a34a' : score < 50 ? '#ef4444' : '#d97706' }}>
        {score.toFixed(0)}%
      </span>
    </div>
    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${score}%`, background: color, transition: 'width 1s ease-out' }}></div>
    </div>
  </div>
);

export const CropAdvisor = () => {
  const [collectedData, setCollectedData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [answer, setAnswer] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const firstQ = getNextQuestion({});
    setCurrentQuestion(firstQ);
  }, []);

  const handleNext = async () => {
    if (!currentQuestion) return;
    setLoading(true);
    
    let submittedValue = answer;
    if (currentQuestion.type === 'boolean') {
      submittedValue = answer === 'true';
    } else if (currentQuestion.type === 'number') {
      submittedValue = parseFloat(answer);
    }

    const newCollected = { ...collectedData, [currentQuestion.id]: submittedValue };
    setCollectedData(newCollected);
    setQuestionHistory([...questionHistory, currentQuestion]);
    
    const nextQ = getNextQuestion(newCollected);
    
    if (nextQ) {
      setCurrentQuestion(nextQ);
      setAnswer('');
      setLoading(false);
    } else {
      setCurrentQuestion(null);
      const recs = await generateRecommendations(newCollected);
      setRecommendations(recs);
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (questionHistory.length === 0) return;
    
    const prevQ = questionHistory[questionHistory.length - 1];
    const newHistory = questionHistory.slice(0, -1);
    setQuestionHistory(newHistory);
    
    const newCollected = { ...collectedData };
    delete newCollected[prevQ.id];
    setCollectedData(newCollected);
    
    setCurrentQuestion(prevQ);
    setAnswer('');
    setRecommendations(null);
  };

  return (
    <div className="advisor-page">
      <div className="page-header">
        <h1 className="page-title">
          <Sprout size={28} color="#16a34a" /> Real-Time Crop Advisor
        </h1>
        <p className="page-subtitle">
          Adaptive agronomic engine.
        </p>
      </div>

      <div className="advisor-layout-grid" style={{ gridTemplateColumns: recommendations ? '1fr' : '1fr', maxWidth: recommendations ? '900px' : '600px', margin: '0 auto' }}>
        
        {/* Intro Page UI */}
        {!hasStarted && (
          <div className="farm-card" style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '50%' }}>
                <Sprout size={48} color="#16a34a" />
              </div>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              Welcome to the Smart Crop Advisor
            </h2>
            <p style={{ color: '#475569', marginBottom: '32px', lineHeight: 1.6, fontSize: '1.05rem', maxWidth: '400px', margin: '0 auto 32px auto' }}>
              We will ask you a few targeted questions about your field. We automatically pull real-time weather and geospatial soil data to provide you with the most accurate crop recommendations.
            </p>
            <button 
              className="btn btn-primary" 
              style={{ padding: '14px 40px', fontSize: '1.1rem', fontWeight: 600, borderRadius: '8px' }}
              onClick={() => setHasStarted(true)}
            >
              Start Questionnaire
            </button>
          </div>
        )}

        {/* Adaptive Question Engine UI */}
        {hasStarted && !recommendations && currentQuestion && (
          <div className="farm-card" style={{ padding: '32px' }}>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px' }}>
              {currentQuestion.question}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              {currentQuestion.type === 'select' && (
                <select className="form-select" value={answer} onChange={(e) => setAnswer(e.target.value)}>
                  <option value="">Select an option...</option>
                  {(currentQuestion.id === 'city' && collectedData.state 
                    ? CITIES_BY_STATE[collectedData.state].map(c => ({label: c, value: c})) 
                    : currentQuestion.options).map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              )}

              {currentQuestion.type === 'boolean' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    className={`btn ${answer === 'true' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setAnswer('true')}
                    style={{ flex: 1 }}
                  >Yes</button>
                  <button 
                    className={`btn ${answer === 'false' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setAnswer('false')}
                    style={{ flex: 1 }}
                  >No</button>
                </div>
              )}

              {(currentQuestion.type === 'text' || currentQuestion.type === 'number' || currentQuestion.type === 'date') && (
                <input 
                  type={currentQuestion.type} 
                  className="form-input" 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={currentQuestion.type === 'text' ? "e.g., Coimbatore" : ""}
                />
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {questionHistory.length > 0 && (
                <button 
                  className="btn btn-outline"
                  style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  onClick={handleBack}
                  disabled={loading}
                >
                  <ArrowLeft size={18} /> Back
                </button>
              )}
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '14px' }}
                onClick={handleNext}
                disabled={loading || !answer}
              >
                {loading ? 'Processing...' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {/* Results UI */}
        {recommendations && (
          <div className="advisor-result-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Action Bar & Global Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="#16a34a" /> {recommendations.locationName}
                </h3>
                <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Thermometer size={14} color="#3b82f6" /> {recommendations.weatherFetched ? "Live Weather" : "Default Weather"}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Layers size={14} color="#b45309" /> {collectedData.has_soil_test ? `User Provided pH: ${collectedData.soil_ph}` : (recommendations.soilFetched ? "Geo-Estimated Soil" : "Default Soil")}
                  </span>
                </div>
              </div>
              <button className="btn btn-outline" onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={16} /> Edit Inputs
              </button>
            </div>

            {/* Recommendations List */}
            <div style={{ display: 'grid', gap: '24px' }}>
              {recommendations.recommendedCrops.map((rec, idx) => (
                <div key={idx} className="farm-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: idx === 0 ? '4px solid #16a34a' : 'none', padding: '24px' }}>
                  
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      {idx === 0 && <span className="badge badge-green" style={{ marginBottom: '12px', display: 'inline-block' }}>Top Match</span>}
                      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>{rec.crop}</h2>
                      <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '4px', maxWidth: '500px' }}>{rec.explanation}</p>
                    </div>
                    <div style={{ textAlign: 'right', background: '#f8fafc', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overall Score</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: rec.suitabilityScore > 80 ? '#16a34a' : '#d97706' }}>
                        {rec.suitabilityScore.toFixed(1)}<span style={{ fontSize: '1rem', color: '#94a3b8' }}>/100</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Analytical Breakdown Bars */}
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Suitability Breakdown Analysis</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <ScoreBar label="Climate Alignment" score={rec.climateSuitability} color="#3b82f6" icon={Thermometer} />
                        {rec.realData.temp && (
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '-12px' }}>
                            Based on local temp: <strong>{rec.realData.temp}°C</strong><br/>
                            <span style={{opacity: 0.8}}>(Optimal: {rec.cropData.temp_range.optimal_min}-{rec.cropData.temp_range.optimal_max}°C)</span>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <ScoreBar label="Soil Chemistry" score={rec.soilSuitability} color="#b45309" icon={Layers} />
                        {rec.realData.ph && (
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '-12px' }}>
                            {collectedData.has_soil_test ? (
                              <>Based on pH: <strong>{rec.realData.ph.toFixed(1)}</strong></>
                            ) : (
                              <>Estimated based on region: <strong>{rec.realData.ph.toFixed(1)}</strong></>
                            )}
                            <br/>
                            <span style={{opacity: 0.8}}>(Optimal: {rec.cropData.soil_ph_range.optimal_min}-{rec.cropData.soil_ph_range.optimal_max})</span>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <ScoreBar label="Water Feasibility" score={rec.waterSuitability} color="#0284c7" icon={Droplets} />
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '-12px' }}>
                          Based on <strong>{collectedData.water_availability}</strong> inputs
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  {/* Risks Alert Box */}
                  {rec.risks.length > 0 && (
                    <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fecaca', display: 'flex', gap: '12px' }}>
                      <Info size={20} color="#b91c1c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h4 style={{ color: '#991b1b', fontWeight: 700, marginBottom: '4px' }}>Agronomic Risks Detected</h4>
                        <ul style={{ paddingLeft: '16px', color: '#7f1d1d', margin: 0, fontSize: '0.9rem' }}>
                          {rec.risks.map((r, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>
                              <strong>{r.type}:</strong> {r.mitigation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
            
            {recommendations.missingInformation.length > 0 && (
              <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.9rem', color: '#92400e', textAlign: 'center' }}>
                <strong>Data Confidence Level: {recommendations.confidence}%</strong> <br/>
                We used geospatial estimates for missing data. To improve accuracy, provide a <strong>{recommendations.missingInformation.join(', ')}</strong> in your next session.
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
};
