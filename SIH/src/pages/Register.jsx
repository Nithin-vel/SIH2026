import React, { useState } from 'react';
import { Wheat, MapPin, Layers, Droplet, User, Phone, Sparkles, CheckCircle, ArrowRight, Lock, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { soilTypes, cropsList } from '../data/mockData';
import indianStatesData from '../data/indianStates.json';

const languages = [
  { id: 'hi', name: 'हिंदी', icon: 'अ' },
  { id: 'en', name: 'English', icon: 'A' },
  { id: 'ta', name: 'தமிழ்', icon: 'அ' },
  { id: 'te', name: 'తెలుగు', icon: 'అ' },
  { id: 'kn', name: 'ಕನ್ನಡ', icon: 'ಅ' },
  { id: 'ml', name: 'മലയാളം', icon: 'അ' }
];

const cropImages = {
  Paddy: 'https://images.unsplash.com/photo-1590080649774-67f7ff72a71d?w=200&h=200&fit=crop&q=80',
  Tomato: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&h=200&fit=crop&q=80',
  Groundnut: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop&q=80',
  Sugarcane: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=200&h=200&fit=crop&q=80',
  Cotton: 'https://images.unsplash.com/photo-1589926830501-c88c7f99d99c?w=200&h=200&fit=crop&q=80',
  Banana: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=200&h=200&fit=crop&q=80',
  Maize: 'https://images.unsplash.com/photo-1629853965576-0f81d1efd752?w=200&h=200&fit=crop&q=80',
  Turmeric: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&h=200&fit=crop&q=80'
};

const stateGeneratedImages = {
  'Andhra Pradesh': '/states/state_ap_1788599649263.jpg',
  'Arunachal Pradesh': '/states/state_ar_1788599844323.jpg',
  'Assam': '/states/state_as_1788599868722.jpg',
  'Bihar': '/states/state_br_1788599882525.jpg',
  'Chandigarh (UT)': '/states/state_chandigarh_1788702974709.jpg',
  'Chhattisgarh': '/states/state_chhattisgarh_1788702893093.jpg',
  'Dadra and Nagar Haveli (UT)': '/states/state_dadra_1788703000000.jpg',
  'Daman and Diu (UT)': '/states/state_daman_1788703000000.jpg',
  'Delhi (NCT)': '/states/state_delhi_1788702703801.jpg',
  'Goa': '/states/state_goa_1788702716890.jpg',
  'Gujarat': '/states/state_gj_1788599741869.jpg',
  'Haryana': '/states/state_haryana_1788702862769.jpg',
  'Himachal Pradesh': '/states/state_hp_1788702834479.jpg',
  'Jammu and Kashmir': '/states/state_jk_1788702850343.jpg',
  'Jharkhand': '/states/state_jharkhand_1788702879013.jpg',
  'Karnataka': '/states/state_ka_1788599769045.jpg',
  'Kerala': '/states/state_kl_1788599690136.jpg',
  'Lakshadweep (UT)': '/states/state_lakshadweep_1788703000000.jpg',
  'Madhya Pradesh': '/states/state_mp_1788702731526.jpg',
  'Maharashtra': '/states/state_mh_1788599662605.jpg',
  'Manipur': '/states/state_manipur_1788703000000.jpg',
  'Meghalaya': '/states/state_meghalaya_1788703000000.jpg',
  'Mizoram': '/states/state_mizoram_1788703000000.jpg',
  'Nagaland': '/states/state_nagaland_1788703000000.jpg',
  'Odisha': '/states/state_odisha_1788702742505.jpg',
  'Puducherry (UT)': '/states/state_puducherry_1788703000000.jpg',
  'Punjab': '/states/state_pb_1788599677100.jpg',
  'Rajasthan': '/states/state_rj_1788599754895.jpg',
  'Sikkim': '/states/state_sikkim_1788702906662.jpg',
  'Tamil Nadu': '/states/state_tn_1788599703795.jpg',
  'Telangana': '/states/state_telangana_1788702754652.jpg',
  'Tripura': '/states/state_tripura_1788703000000.jpg',
  'Uttar Pradesh': '/states/state_up_1788599728249.jpg',
  'Uttarakhand': '/states/state_uttarakhand_1788702767903.jpg',
  'West Bengal': '/states/state_wb_1788599782080.jpg'
};

const stateIcons = {
  'Andhra Pradesh': '🛕',
  'Karnataka': '🕌',
  'Kerala': '🌴',
  'Maharashtra': '🏙️',
  'Punjab': '🌾',
  'Tamil Nadu': '🛕',
  'Uttar Pradesh': '🕌',
  'Gujarat': '🦁',
  'Rajasthan': '🐪',
  'West Bengal': '🐅',
  'Assam': '🫖',
  'Himachal Pradesh': '🍎',
  'Goa': '🏖️'
};

const defaultStateIcon = '🗺️';

const soilImages = {
  'Alluvial Soil': 'https://images.unsplash.com/photo-1574895085449-74e5088c2271?w=200&h=200&fit=crop',
  'Black Soil': 'https://images.unsplash.com/photo-1580211155981-d249f3984d7f?w=200&h=200&fit=crop',
  'Red Soil': 'https://images.unsplash.com/photo-1518534063533-317112025350?w=200&h=200&fit=crop',
  'Laterite Soil': 'https://images.unsplash.com/photo-1463130456064-9273c660f7e4?w=200&h=200&fit=crop',
  'Desert Soil': 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?w=200&h=200&fit=crop',
  'Mountain Soil': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop'
};

export const Register = ({ onSwitchToLogin }) => {
  const { login } = useAuth();
  const { currentLang, setCurrentLang, t } = useLanguage();

  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [landArea, setLandArea] = useState('');
  const [soilType, setSoilType] = useState('');
  
  const [selectedCrops, setSelectedCrops] = useState([]);

  const availableDistricts = state 
    ? indianStatesData.states.find(s => s.state === state)?.districts || []
    : [];

  const toggleCrop = (crop) => {
    setSelectedCrops(prev => 
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const handleNext = (e) => {
    e?.preventDefault();
    if (step < 7) setStep(step + 1);
    else handleRegister();
  };

  const handleRegister = () => {
    const newFarmer = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      village: '',
      district,
      state: state,
      landArea,
      primaryCrops: selectedCrops,
      soilType,
      waterSource: 'Borewell with Drip',
      language: currentLang,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
      bio: 'Cultivating crops with smart water practices.',
      verified: false,
      role: 'farmer'
    };

    login(newFarmer);
  };

  return (
    <div className="auth-container auth-3d-bg">
      <div className="auth-card-3d" style={{ maxWidth: '600px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="brand-logo-3d">
            <img src="/logo.png" alt="Farmogram Logo" />
          </div>
          <h1 className="brand-title-3d">
            {t('farmer_onboarding')}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div 
                key={i} 
                style={{
                  height: '6px',
                  width: '32px',
                  borderRadius: '4px',
                  backgroundColor: i <= step ? '#16a34a' : '#e2e8f0',
                  transition: 'background-color 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleNext} className="auth-form-3d">
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>1. Basic Information</h2>
              <div className="form-group-3d">
                <label className="form-label">{t('full_name')} *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                  <input 
                    type="text" 
                    className="form-input-3d" 
                    placeholder="e.g., Ramasamy K." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <div className="form-group-3d">
                <label className="form-label">{t('mobile_number')} *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                  <input 
                    type="tel" 
                    className="form-input-3d" 
                    placeholder="+91 94432 10987" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Password / Security */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>2. Account Security</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>Mobile number verified successfully. Create a password for your account.</p>
              
              <div className="form-group-3d">
                <label className="form-label">{t('create_password')} *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                  <input 
                    type="password" 
                    className="form-input-3d" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Language */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>3. {t('select_language')}</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {languages.map(lang => (
                  <div 
                    key={lang.id}
                    onClick={() => setCurrentLang(lang.id)}
                    style={{
                      border: currentLang === lang.id ? '2px solid #16a34a' : '1px solid #e2e8f0',
                      backgroundColor: currentLang === lang.id ? '#f0fdf4' : '#ffffff',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      boxShadow: currentLang === lang.id ? '0 4px 6px -1px rgba(22, 163, 74, 0.2)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: currentLang === lang.id ? '#15803d' : '#64748b' }}>
                      {lang.icon}
                    </div>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Farm Location (State) */}
          {step === 4 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>4. Farm Location (State)</h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
                gap: '16px',
                maxHeight: '350px',
                overflowY: 'auto',
                padding: '4px'
              }}>
                {indianStatesData.states.map(s => {
                  const isSelected = state === s.state;
                  const generatedImg = stateGeneratedImages[s.state];
                  const fallbackIcon = stateIcons[s.state] || defaultStateIcon;

                  return (
                    <div 
                      key={s.state}
                      onClick={() => { setState(s.state); setDistrict(''); }}
                      style={{
                        border: isSelected ? '2px solid #16a34a' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                        borderRadius: '12px',
                        padding: '16px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? '0 4px 6px -1px rgba(22, 163, 74, 0.2)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        position: 'relative'
                      }}
                    >
                      {generatedImg ? (
                        <div style={{ 
                          width: '100px', 
                          height: '80px', 
                          backgroundImage: `url(${generatedImg})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }} />
                      ) : (
                        <div style={{ fontSize: '2.5rem', lineHeight: 1, height: '80px', display: 'flex', alignItems: 'center' }}>
                          {fallbackIcon}
                        </div>
                      )}
                      
                      <span style={{ fontWeight: 600, color: '#1e293b', textAlign: 'center', fontSize: '0.85rem' }}>{s.state}</span>
                      
                      {isSelected && (
                        <div style={{ position: 'absolute', top: '6px', right: '6px', backgroundColor: '#16a34a', borderRadius: '50%', padding: '2px', display: 'flex' }}>
                          <CheckCircle size={12} color="white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: District & Land */}
          {step === 5 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>5. District & Land Details</h2>
              <div className="grid-2">
                <div className="form-group-3d">
                  <label className="form-label">{t('district')} *</label>
                  <select 
                    className="form-input-3d select-3d" 
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  >
                    <option value="" disabled>{t('select_district')}</option>
                    {availableDistricts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group-3d">
                  <label className="form-label">{t('land_acres')}</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    className="form-input-3d" 
                    value={landArea} 
                    onChange={(e) => setLandArea(e.target.value)} 
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Soil Type */}
          {step === 6 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>6. {t('soil_type')}</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
                {soilTypes.map(st => {
                  const isSelected = soilType === st.name;
                  const imgUrl = soilImages[st.name];
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSoilType(st.name)}
                      style={{
                        position: 'relative',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid #16a34a' : '1px solid #e2e8f0',
                        boxShadow: isSelected ? '0 4px 6px -1px rgba(22, 163, 74, 0.3)' : 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <img src={imgUrl} alt={st.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }} />
                      <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, textAlign: 'center', color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                        {st.name}
                      </div>
                      {isSelected && (
                        <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#16a34a', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                          <CheckCircle size={14} color="white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: Crops */}
          {step === 7 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>7. {t('primary_crops')}</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                {cropsList.map(crop => {
                  const isSelected = selectedCrops.includes(crop);
                  return (
                    <div
                      key={crop}
                      onClick={() => toggleCrop(crop)}
                      style={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid #16a34a' : '1px solid #e2e8f0',
                        boxShadow: isSelected ? '0 4px 6px -1px rgba(22, 163, 74, 0.3)' : 'none',
                        transition: 'all 0.2s',
                        height: '110px'
                      }}
                    >
                      {cropImages[crop] ? (
                        <img 
                          src={cropImages[crop]} 
                          alt={crop} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Wheat size={32} color="#94a3b8" />
                        </div>
                      )}
                      
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        padding: '16px 8px 8px 8px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        textAlign: 'center'
                      }}>
                        {crop}
                      </div>

                      {isSelected && (
                        <div style={{ position: 'absolute', top: '6px', right: '6px', backgroundColor: '#16a34a', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle size={14} color="white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {step > 1 && (
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ flex: 1, padding: '12px' }}
                onClick={() => setStep(step - 1)}
              >
                {t('back')}
              </button>
            )}
            <button 
              type="submit" 
              className="btn-3d-submit" 
              style={{ flex: 2 }}
            >
              {step < 7 ? (
                <>
                  {t('next')} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </>
              ) : (
                t('create_profile')
              )}
            </button>
          </div>
        </form>

        {step === 1 && (
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#64748b' }}>
            Already registered?{' '}
            <button 
              type="button"
              onClick={onSwitchToLogin}
              style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: 700, cursor: 'pointer' }}
            >
              Login Here
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
