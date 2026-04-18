import React, { useState } from 'react';
import { addUserReport } from '../../firebase/firestoreService';

export default function ReportButton({ zoneId, zoneName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('Crowd');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addUserReport({ zoneId, zoneName, type });
      setIsOpen(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Failed to submit report", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-label={`Report issue in ${zoneName}`}
        className="mt-4 w-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2 rounded transition-all focus:ring-2 focus:ring-pulse-red outline-none"
      >
        Report Issue
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-blue/80 backdrop-blur-sm" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="report-modal-title"
          onKeyDown={handleKeyDown}
        >
          <div className="bg-steel-gray border border-white/10 rounded-2xl p-6 w-full max-w-sm animate-fade-in shadow-2xl focus:outline-none" tabIndex="-1">
            <h3 id="report-modal-title" className="text-white font-display text-lg font-semibold mb-4">Report Issue in {zoneName}</h3>
            
            <div role="radiogroup" aria-labelledby="report-modal-title" className="space-y-3 mb-6">
              {['Crowd', 'Spill', 'Emergency'].map(opt => (
                <label 
                  key={opt} 
                  className={`flex items-center p-3 rounded cursor-pointer border transition-all ${type === opt ? 'bg-pulse-red/20 border-pulse-red text-pulse-red' : 'bg-night-blue border-white/10 text-gray-300 hover:border-white/30'}`}
                >
                  <input 
                    type="radio" 
                    name="reportType" 
                    className="w-4 h-4 mr-3 accent-pulse-red" 
                    checked={type === opt} 
                    onChange={() => setType(opt)} 
                  />
                  <span className="font-medium text-sm">{opt} Issue</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setIsOpen(false)} 
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded transition-colors font-medium text-sm focus:ring-2 focus:ring-white/20 outline-none"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1 bg-pulse-red hover:bg-red-600 text-white py-2 rounded transition-colors font-medium text-sm disabled:opacity-50 focus:ring-2 focus:ring-red-400 outline-none"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-field-green text-night-blue font-semibold px-4 py-2 rounded shadow-lg animate-slide-up z-50">
          Report submitted successfully
        </div>
      )}
    </>
  );
}
