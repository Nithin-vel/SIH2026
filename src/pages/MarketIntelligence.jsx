import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  BarChart2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { marketCommodities, locations, cropsList } from '../data/mockData';
import { Modal } from '../components/common/Modal';

export const MarketIntelligence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedMandi, setSelectedMandi] = useState('All');
  const [activeTrendModal, setActiveTrendModal] = useState(null);

  const filteredCommodities = marketCommodities.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.mandi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || item.commodity === selectedCrop;
    const matchesMandi = selectedMandi === 'All' || item.district === selectedMandi;
    return matchesSearch && matchesCrop && matchesMandi;
  });

  return (
    <div className="market-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          <TrendingUp size={28} color="#16a34a" /> Market Intelligence & Mandi Rates
        </h1>
        <p className="page-subtitle">
          Real-time APMC mandi prices, volume arrivals, and 15-day price momentum across Tamil Nadu markets.
        </p>
      </div>

      {/* Top Ticker / Market Summary Strip */}
      <div className="market-summary-cards grid-4" style={{ marginBottom: '20px' }}>
        <div className="farm-card" style={{ padding: '16px 20px', borderLeft: '4px solid #16a34a' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Top Gainer Today</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>Tomato</span>
            <span className="badge badge-green">↑ 8.1%</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>₹ 2,800 / Quintal</div>
        </div>

        <div className="farm-card" style={{ padding: '16px 20px', borderLeft: '4px solid #d97706' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Cash Crop Star</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>Turmeric (Erode)</span>
            <span className="badge badge-amber">↑ 6.5%</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700, marginTop: '2px' }}>₹ 14,800 / Quintal</div>
        </div>

        <div className="farm-card" style={{ padding: '16px 20px', borderLeft: '4px solid #0284c7' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Highest Arrivals</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>Paddy (Thanjavur)</span>
            <span className="badge badge-blue">140 Tonnes</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>₹ 2,300 / Quintal</div>
        </div>

        <div className="farm-card" style={{ padding: '16px 20px', borderLeft: '4px solid #7c3aed' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Oilseed Trend</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>Groundnut Pod</span>
            <span className="badge badge-green">↑ 4.0%</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 700, marginTop: '2px' }}>₹ 6,500 / Quintal</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="farm-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search commodity (e.g. Tomato, Groundnut, Paddy)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px' }}
            />
          </div>

          {/* Crop Filter */}
          <div style={{ minWidth: '160px' }}>
            <select 
              className="form-select" 
              value={selectedCrop} 
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option value="All">All Commodities</option>
              {cropsList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Mandi District Filter */}
          <div style={{ minWidth: '160px' }}>
            <select 
              className="form-select" 
              value={selectedMandi} 
              onChange={(e) => setSelectedMandi(e.target.value)}
            >
              <option value="All">All Mandi Districts</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedCrop !== 'All' || selectedMandi !== 'All') && (
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCrop('All'); setSelectedMandi('All'); }}
              className="btn btn-secondary btn-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Mandi Commodities Grid */}
      <div className="grid-3" style={{ gap: '20px' }}>
        {filteredCommodities.map(item => {
          const isUp = item.trend === 'up';
          return (
            <div 
              key={item.id} 
              className="farm-card farm-card-interactive market-item-card"
              onClick={() => setActiveTrendModal(item)}
              style={{ cursor: 'pointer' }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{item.commodity}</h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.variety}</span>
                </div>
                <span className={`badge ${isUp ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.82rem', padding: '3px 8px' }}>
                  {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(item.changePercent)}%
                </span>
              </div>

              {/* Mandi Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: '#475569', marginBottom: '14px' }}>
                <MapPin size={13} color="#16a34a" /> {item.mandi} ({item.district})
              </div>

              {/* Price Row */}
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Current Modal Rate:</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Prev: ₹{item.previousPrice.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                  ₹ {item.currentPrice.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>/ Quintal</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                  <span>Min: ₹{item.minPrice.toLocaleString()}</span>
                  <span>Max: ₹{item.maxPrice.toLocaleString()}</span>
                  <span>Arrivals: {item.arrivalsTonnes} T</span>
                </div>
              </div>

              {/* Visual 6-point Mini Trend Sparkline Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>
                  <span>15-Day Price Trend</span>
                  <span style={{ color: isUp ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                    {isUp ? 'Bullish' : 'Bearish'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '36px', background: '#f8fafc', padding: '4px', borderRadius: '6px' }}>
                  {item.history.map((val, i) => {
                    const min = Math.min(...item.history);
                    const max = Math.max(...item.history);
                    const heightPercent = Math.max(20, Math.round(((val - min) / (max - min || 1)) * 80 + 20));
                    return (
                      <div 
                        key={i} 
                        style={{ 
                          flex: 1, 
                          height: `${heightPercent}%`, 
                          backgroundColor: isUp ? '#22c55e' : '#f87171', 
                          borderRadius: '2px',
                          opacity: (i + 3) / 9
                        }} 
                        title={`Day ${i+1}: ₹${val}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Click to view details */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '10px', fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>
                <span>View Mandi Analytics</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandi Commodity Detailed Modal */}
      {activeTrendModal && (
        <Modal 
          isOpen={true} 
          onClose={() => setActiveTrendModal(null)} 
          title={`📈 ${activeTrendModal.commodity} — ${activeTrendModal.mandi}`}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', padding: '14px 18px', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700 }}>CURRENT APMC MODAL RATE</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#14532d' }}>
                  ₹ {activeTrendModal.currentPrice.toLocaleString()} / Quintal
                </div>
              </div>
              <span className={`badge ${activeTrendModal.trend === 'up' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
                {activeTrendModal.trend === 'up' ? '↑' : '↓'} {Math.abs(activeTrendModal.changePercent)}% This Week
              </span>
            </div>

            <h4 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', marginBottom: '8px' }}>
              Arrivals & Quality Specifications
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Daily Arrivals</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{activeTrendModal.arrivalsTonnes} Tonnes</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Grade Rating</span>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>FAQ / Grade A</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Mandi Status</span>
                <div style={{ fontWeight: 700, color: '#16a34a' }}>Active Trading</div>
              </div>
            </div>

            <h4 style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', marginBottom: '8px' }}>
              Procurement & Selling Advice
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.5, background: '#fafafa', padding: '12px', borderRadius: '8px' }}>
              Demand from retail distribution centers in Coimbatore and Tirupur remains strong. With morning arrivals peaking at 6:30 AM, farmers bringing graded produce can expect to realize rates closer to the maximum band (₹{activeTrendModal.maxPrice.toLocaleString()}/q).
            </p>

            <div className="modal-footer" style={{ margin: '18px -24px -24px -24px' }}>
              <button className="btn btn-primary" onClick={() => setActiveTrendModal(null)}>
                Close Analytics
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
