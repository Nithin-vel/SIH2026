'use client';

import { useState, useEffect } from 'react';
import { createSession, getNextQuestion, submitAnswer, getRecommendations } from '@/lib/api';

export default function AdvisorPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<any>('');
  
  useEffect(() => {
    // Initialize session on mount
    const init = async () => {
      setLoading(true);
      try {
        const session = await createSession();
        setSessionId(session.session_id);
        fetchNextQuestion(session.session_id);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    init();
  }, []);

  const fetchNextQuestion = async (sid: string) => {
    setLoading(true);
    try {
      const q = await getNextQuestion(sid);
      if (q.status === 'ready') {
        setCurrentQuestion(null);
        fetchRecommendations(sid);
      } else {
        setCurrentQuestion(q);
        setAnswer(''); // reset input
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchRecommendations = async (sid: string) => {
    setLoading(true);
    try {
      const recs = await getRecommendations(sid);
      setRecommendations(recs);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleAnswerSubmit = async () => {
    if (!sessionId || !currentQuestion) return;
    setLoading(true);
    try {
      // For location, we simulate sending a lat/lon object
      let submittedValue = answer;
      if (currentQuestion.type === 'location') {
        // In a real app, grab from browser geolocation or map picker
        submittedValue = { lat: 11.0168, lon: 76.9558 }; // Coimbatore mock
      } else if (currentQuestion.type === 'number') {
        submittedValue = parseFloat(answer);
      } else if (currentQuestion.type === 'boolean') {
        submittedValue = answer === 'true';
      }

      await submitAnswer(sessionId, currentQuestion.id, submittedValue);
      fetchNextQuestion(sessionId);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (loading && !currentQuestion && !recommendations) {
    return <div className="p-8 text-center">Initializing Advisor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Real-Time Crop Advisor</h1>
      
      {/* Question Engine UI */}
      {currentQuestion && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          
          <div className="mb-6">
            {currentQuestion.type === 'select' && (
              <select 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              >
                <option value="">Select an option...</option>
                {currentQuestion.options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
            
            {currentQuestion.type === 'boolean' && (
              <div className="flex gap-4">
                <button 
                  className={`px-6 py-2 rounded-lg border ${answer === 'true' ? 'bg-green-600 text-white' : 'bg-gray-50'}`}
                  onClick={() => setAnswer('true')}
                >Yes</button>
                <button 
                  className={`px-6 py-2 rounded-lg border ${answer === 'false' ? 'bg-green-600 text-white' : 'bg-gray-50'}`}
                  onClick={() => setAnswer('false')}
                >No</button>
              </div>
            )}
            
            {(currentQuestion.type === 'text' || currentQuestion.type === 'number' || currentQuestion.type === 'date') && (
              <input 
                type={currentQuestion.type} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer..."
              />
            )}
            
            {currentQuestion.type === 'location' && (
              <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
                <p>Click next to use your current GPS location (simulated for Coimbatore).</p>
                {/* A real app would have a map here */}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAnswerSubmit}
            disabled={loading || (currentQuestion.type !== 'location' && currentQuestion.type !== 'boolean' && !answer)}
            className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Next'}
          </button>
        </div>
      )}
      
      {/* Recommendations UI */}
      {recommendations && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-green-900 mb-2">Analysis Complete</h2>
            <div className="flex flex-wrap gap-4 text-sm mt-4">
              <span className="px-3 py-1 bg-white rounded-full border shadow-sm">
                Confidence: <strong className={recommendations.confidence > 80 ? 'text-green-600' : 'text-yellow-600'}>
                  {recommendations.confidence}%
                </strong>
              </span>
              {recommendations.dataSources?.map((ds: any, i: number) => (
                <span key={i} className="px-3 py-1 bg-white rounded-full border shadow-sm text-gray-600">
                  {ds.name}: {ds.source}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {recommendations.recommendedCrops?.map((rec: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{rec.crop}</h3>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 font-semibold uppercase">Suitability</div>
                      <div className="text-xl font-bold text-green-600">{rec.suitabilityScore.toFixed(0)}/100</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{rec.explanation}</p>
                  
                  {rec.risks?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-800 mb-2">Identified Risks:</h4>
                      <ul className="space-y-3">
                        {rec.risks.map((risk: any, i: number) => (
                          <li key={i} className="bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                            <strong>{risk.type.replace('_', ' ').toUpperCase()}</strong>: {risk.explanation}
                            <div className="mt-1 text-red-700 font-medium">Mitigation: {risk.mitigation}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Scoring Breakdown */}
                <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold text-gray-700 border-b pb-2">Score Breakdown</h4>
                  <div className="flex justify-between text-sm">
                    <span>Climate</span>
                    <span className="font-semibold">{rec.climateSuitability.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Soil</span>
                    <span className="font-semibold">{rec.soilSuitability.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Water</span>
                    <span className="font-semibold">{rec.waterSuitability.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
