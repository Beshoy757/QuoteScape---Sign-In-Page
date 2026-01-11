
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, DollarSign, MapPin, Calculator } from 'lucide-react';

const STEPS = [
  { id: 'contact', title: 'Basic Info' },
  { id: 'scope', title: 'Project Scope' },
  { id: 'budget', title: 'Timeline & Budget' }
];

const LeadCapture: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    sqft: 1000,
    features: [] as string[],
    budget: '$5k - $10k',
    timeline: 'Within 3 months'
  });

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in duration-300">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4">You're all set, {formData.name.split(' ')[0]}!</h2>
        <p className="text-slate-600 mb-8 text-lg">We've received your request. Based on your project, we estimate a price range of <span className="text-slate-900 font-bold">$8,400 - $12,600</span>. A specialist will reach out within 24 hours.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center">
          <div className="flex gap-4">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx <= step ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${idx <= step ? 'text-white' : 'text-slate-500'}`}>{s.title}</span>
              </div>
            ))}
          </div>
          <Calculator size={20} className="text-emerald-500" />
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          {step === 0 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold">Tell us about yourself</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Property Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
                  <input 
                    required 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" 
                    placeholder="123 Garden Lane, Emerald City"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold">Project Details</h2>
              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-700">Approximate Yard Size (sqft)</label>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  value={formData.sqft}
                  onChange={e => setFormData({...formData, sqft: parseInt(e.target.value)})}
                />
                <div className="text-center font-bold text-emerald-600 text-lg">{formData.sqft.toLocaleString()} sqft</div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-700">Desired Features</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Patio', 'Fire Pit', 'Retaining Wall', 'Lighting', 'Irrigation', 'Water Feature', 'Lawn Turf', 'Planting Beds'].map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        formData.features.includes(feature) 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold">Timeline & Expectations</h2>
              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-700">Projected Budget</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['<$5k', '$5k - $15k', '$15k+'].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({...formData, budget: b})}
                      className={`p-4 rounded-xl border-2 font-medium transition-all ${
                        formData.budget === b 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      <DollarSign size={16} className="inline mb-1" /> {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-slate-700">Preferred Start Date</label>
                <select 
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none"
                  value={formData.timeline}
                  onChange={e => setFormData({...formData, timeline: e.target.value})}
                >
                  <option>As soon as possible</option>
                  <option>Within 3 months</option>
                  <option>Next season</option>
                  <option>Just browsing for now</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 text-slate-500 font-medium hover:text-slate-800 transition-colors ${step === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors"
              >
                Next <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                Get My Estimate <CheckCircle2 size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
      
      <p className="text-center text-slate-400 text-sm mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default LeadCapture;
