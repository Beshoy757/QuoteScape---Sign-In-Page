
import React, { useState, useRef } from 'react';
// Added missing Palette import
import { Upload, Wand2, RefreshCw, Layers, Camera, Palette } from 'lucide-react';
import { visualizeLandscape } from '../services/geminiService';

const PRESET_STYLES = [
  "Modern Minimalist with Pavers",
  "English Country Garden",
  "Zen Oasis with Water Feature",
  "Mediterranean Villa Courtyard",
  "Kid-friendly Playful Backyard",
  "Desert Xeriscape with Succulents"
];

const AIDesigner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [visualizing, setVisualizing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisualize = async () => {
    if (!image || !prompt) return;
    setVisualizing(true);
    const output = await visualizeLandscape(image, prompt);
    if (output) setResult(output);
    setVisualizing(false);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Landscape Designer</h1>
        <p className="text-slate-500">Upload a photo of your yard and see it transformed instantly.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Camera size={20} className="text-emerald-600" /> 1. Upload Yard Photo
            </h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors overflow-hidden relative group"
            >
              {image ? (
                <>
                  <img src={image} className="w-full h-full object-cover" alt="Source" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white font-medium flex items-center gap-2"><RefreshCw size={18}/> Change Photo</span>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-slate-400 mb-2" />
                  <span className="text-slate-500">Click to upload or drag & drop</span>
                  <span className="text-xs text-slate-400 mt-1">JPG, PNG up to 10MB</span>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette size={20} className="text-emerald-600" /> 2. Describe Your Dream Design
            </h3>
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Add a modern slate patio, a stone firepit, and rows of lavender along the edges..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow h-32 resize-none"
              />
              
              <div className="flex flex-wrap gap-2">
                {PRESET_STYLES.map(style => (
                  <button
                    key={style}
                    onClick={() => setPrompt(style)}
                    className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-slate-600"
                  >
                    {style}
                  </button>
                ))}
              </div>

              <button
                onClick={handleVisualize}
                disabled={!image || !prompt || visualizing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                {visualizing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Visualizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" /> Generate Design Simulation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-4 min-h-[500px] flex flex-col shadow-2xl overflow-hidden">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Layers size={18} className="text-emerald-400" /> Visualization Output
            </h3>
            {result && (
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                AI Enhanced
              </span>
            )}
          </div>
          <div className="flex-1 bg-slate-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {result ? (
              <img src={result} className="w-full h-full object-cover animate-in fade-in duration-700" alt="Result" />
            ) : visualizing ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-400 text-sm animate-pulse">Reimagining your outdoor living space...</p>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <p className="mb-2">Your design will appear here</p>
                <p className="text-xs">Complete steps 1 and 2 to begin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDesigner;
