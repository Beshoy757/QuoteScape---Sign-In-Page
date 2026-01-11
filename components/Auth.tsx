
import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, ShieldCheck, Home } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (name: string, role: 'contractor' | 'lead') => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'contractor' | 'lead'>('lead');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate against a backend here.
    // For this demo, we use the provided name or a default.
    onLoginSuccess(name || (role === 'contractor' ? 'Alex Contractor' : 'Jamie Homeowner'), role);
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Left Side: Visual/Branding (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 to-transparent z-10" />
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&q=80&w=1600)' }} 
        />
        
        <div className="relative z-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">TerraForm AI</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Designing the future of <br />
            <span className="text-emerald-400">Outdoor Living.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-md">
            The all-in-one platform for landscapers to visualize designs, capture leads, and close deals in minutes.
          </p>
        </div>

        <div className="relative z-20 flex gap-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            Trusted by <span className="text-white font-semibold">2,000+</span> landscaping <br />
            professionals worldwide.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 lg:p-20 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-slate-900">TerraForm AI</span>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="mt-2 text-slate-500">
              {isLogin ? 'Sign in to access your dashboard' : 'Start your 14-day free trial today'}
            </p>
          </div>

          {/* Toggle Role */}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setRole('lead')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  role === 'lead' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Home size={18} /> Homeowner
              </button>
              <button
                type="button"
                onClick={() => setRole('contractor')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  role === 'contractor' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <ShieldCheck size={18} /> Contractor
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                {isLogin && <button type="button" className="text-xs text-emerald-600 hover:underline">Forgot password?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 active:scale-95"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-medium">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg> Facebook
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-emerald-600 hover:underline transition-all"
            >
              {isLogin ? 'Sign up for free' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
