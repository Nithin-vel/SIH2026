import React, { useState } from 'react';
import { Wheat, Phone, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { currentUser } from '../data/mockData';

export const Login = ({ onSwitchToRegister }) => {
  const { login, setIsAdmin } = useAuth();
  const [phone, setPhone] = useState('9842176540');
  const [otp, setOtp] = useState('1234');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(currentUser);
      setIsSubmitting(false);
    }, 300);
  };

  const handleDemoFarmer = () => {
    setIsAdmin(false);
    login(currentUser);
  };

  const handleDemoAdmin = () => {
    setIsAdmin(true);
    login({ ...currentUser, name: 'SIH Evaluator / Agri Officer', role: 'admin' });
  };

  return (
    <div className="auth-container">
      <div className="farm-card auth-card">
        {/* Brand Banner */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="brand-logo-icon" style={{ margin: '0 auto 12px auto', width: '54px', height: '54px' }}>
            <Wheat size={30} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Farmogram <span className="brand-ai">AI</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
            Farmer Community & Precision Agricultural Decision Support
          </p>
        </div>

        {/* SIH One-Click Quick Login for Evaluator */}
        <div style={{ background: '#f0fdf4', border: '1.5px dashed #86efac', borderRadius: '12px', padding: '14px', marginBottom: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
            ⚡ SIH Hackathon Jury Fast Access
          </span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button 
              type="button" 
              onClick={handleDemoFarmer}
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
            >
              🌾 Enter as Farmer Murugan
            </button>
            <button 
              type="button" 
              onClick={handleDemoAdmin}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
            >
              🛡️ Enter as Admin / Jury
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} /> Registered Mobile Number
            </label>
            <input 
              type="tel" 
              className="form-input" 
              placeholder="+91 98421 76540" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} /> 4-Digit OTP / PIN
            </label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Demo OTP is pre-filled (1234)</span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', marginTop: '10px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying OTP...' : 'Login to Farmogram'}
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
