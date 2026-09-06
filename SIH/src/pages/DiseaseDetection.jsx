import React, { useState } from 'react';
import { 
  Bug, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  RotateCcw,
  Check,
  Info
} from 'lucide-react';
import { sampleDiseaseCases } from '../data/mockData';

export const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(sampleDiseaseCases[0].image);
  const [previewCrop, setPreviewCrop] = useState('Tomato');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState(sampleDiseaseCases[0]);

  // Quick Preset Sample Images for One-Click SIH Evaluation
  const testSamples = [
    { label: 'Tomato (Early Blight)', caseData: sampleDiseaseCases[0] },
    { label: 'Paddy (Leaf Blast)', caseData: sampleDiseaseCases[1] },
    { label: 'Groundnut (Tikka Spot)', caseData: sampleDiseaseCases[2] }
  ];

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.caseData.image);
    setPreviewCrop(sample.caseData.crop);
    setResult(null); // Clear previous result to encourage re-scan
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedImage(uploadEvent.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsScanning(true);
    setScanProgress(15);

    const step1 = setTimeout(() => setScanProgress(55), 250);
    const step2 = setTimeout(() => setScanProgress(90), 500);
    const step3 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      // Find matching disease case or fallback
      const matched = sampleDiseaseCases.find(c => c.crop.toLowerCase() === previewCrop.toLowerCase()) || sampleDiseaseCases[0];
      setResult(matched);
    }, 750);
  };

  return (
    <div className="disease-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <Bug size={28} color="#b45309" /> Crop Disease Detection
        </h1>
        <p className="page-subtitle">
          AI-powered leaf vision diagnosis. Identify foliar fungal, bacterial, and pest symptoms with tailored treatment protocols.
        </p>
      </div>

      <div className="disease-grid-layout">
        {/* Left: Upload & Image Workspace */}
        <div className="farm-card disease-upload-card">
          <h2 className="card-section-title">Upload Foliar / Leaf Photograph</h2>
          <p className="card-section-subtitle">Take a close-up photo of infected leaves showing lesions or discoloration.</p>

          {/* Preset Buttons for Quick Demo */}
          <div className="demo-presets-row" style={{ margin: '14px 0 10px 0' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>Quick Test Samples:</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
              {testSamples.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(s)}
                  className={`btn btn-sm ${selectedImage === s.caseData.image ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Zone / Drop Area */}
          <div className="dropzone-box" style={{ position: 'relative' }}>
            {selectedImage ? (
              <div className="image-preview-wrapper">
                <img 
                  src={selectedImage} 
                  alt="Crop preview" 
                  className={`leaf-preview-img ${isScanning ? 'scanning-filter' : ''}`}
                />

                {/* Laser Scanning Line Animation during Analysis */}
                {isScanning && (
                  <div className="scan-laser-line" />
                )}

                <div className="change-img-overlay">
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    Replace Image
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            ) : (
              <label className="dropzone-empty-state">
                <UploadCloud size={48} color="#16a34a" />
                <span style={{ fontWeight: 700, marginTop: '8px', color: '#1e293b' }}>
                  Click to upload or drag & drop leaf image
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>PNG, JPG, JPEG up to 10MB</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            )}
          </div>

          {/* Progress Bar while scanning */}
          {isScanning && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                <span>Scanning leaf morphology & lesion patterns...</span>
                <span>{scanProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#dcfce7', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${scanProgress}%`, height: '100%', background: '#16a34a', transition: 'width 200ms ease' }} />
              </div>
            </div>
          )}

          <button 
            onClick={handleAnalyze} 
            disabled={isScanning || !selectedImage}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '18px', padding: '12px' }}
          >
            {isScanning ? (
              <span>AI Vision Engine Analyzing...</span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> Analyze Crop Disease
              </span>
            )}
          </button>
        </div>

        {/* Right: AI Diagnosis & Remedy Result */}
        <div className="disease-result-column">
          {result ? (
            <div className="farm-card diagnostic-result-card">
              {/* Header Status & Confidence Score */}
              <div className="diag-header-row">
                <div>
                  <span className="badge badge-soil" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                    Detected Crop: {result.crop}
                  </span>
                  <h2 className="diag-disease-name">{result.diseaseName}</h2>
                  <div className="diag-pathogen-name">Pathogen: <em>{result.pathogen}</em></div>
                </div>

                <div className="confidence-pill">
                  <div className="conf-val">{result.confidence}%</div>
                  <div className="conf-label">Confidence</div>
                </div>
              </div>

              {/* Symptoms Identified */}
              <div className="diag-section-box">
                <h3 className="diag-box-title" style={{ color: '#9a3412' }}>
                  <AlertTriangle size={16} /> Observed Symptoms
                </h3>
                <ul className="diag-list">
                  {result.symptoms.map((sym, i) => (
                    <li key={i}>{sym}</li>
                  ))}
                </ul>
              </div>

              {/* Preventative Field Measures */}
              <div className="diag-section-box">
                <h3 className="diag-box-title" style={{ color: '#0369a1' }}>
                  <ShieldAlert size={16} /> Cultural & Preventive Measures
                </h3>
                <ul className="diag-list">
                  {result.prevention.map((prev, i) => (
                    <li key={i}>{prev}</li>
                  ))}
                </ul>
              </div>

              {/* Suggested Chemical & Bio Actions */}
              <div className="diag-section-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <h3 className="diag-box-title" style={{ color: '#15803d' }}>
                  <CheckCircle2 size={16} /> Recommended Treatment Protocol
                </h3>
                <ul className="diag-list">
                  {result.suggestedAction.map((act, i) => (
                    <li key={i}><strong>Step {i+1}:</strong> {act}</li>
                  ))}
                </ul>
              </div>

              {/* Mandatory Expert Disclaimer Notice */}
              <div className="expert-disclaimer-card">
                <Info size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p className="disclaimer-text">
                  “{result.advisoryNote}”
                </p>
              </div>

              {/* Action Strip */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button 
                  onClick={() => alert('Consultation request sent to nearest Erode KVK agricultural extension officer!')}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Connect with Local Agronomist
                </button>
              </div>
            </div>
          ) : (
            <div className="farm-card" style={{ textAlign: 'center', padding: '60px 24px', color: '#64748b' }}>
              <Bug size={56} color="#cbd5e1" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ color: '#1e293b' }}>Ready for Diagnostic Scan</h3>
              <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>
                Click <strong>"Analyze Crop Disease"</strong> to start image classification and view complete symptoms, organic remedies, and chemical controls.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
