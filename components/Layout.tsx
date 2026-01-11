
import React from 'react';
import { Leaf, LogOut, LayoutDashboard, Palette, FileText, User } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  user: { name: string; role: string } | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">TerraForm AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {user?.role === 'contractor' && (
            <button
              onClick={() => onNavigate(ViewState.DASHBOARD)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeView === ViewState.DASHBOARD ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
          )}
          <button
            onClick={() => onNavigate(ViewState.AI_DESIGNER)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeView === ViewState.AI_DESIGNER ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}
          >
            <Palette size={20} /> AI Designer
          </button>
          <button
            onClick={() => onNavigate(ViewState.LEAD_CAPTURE)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeView === ViewState.LEAD_CAPTURE ? 'bg-emerald-600' : 'hover:bg-slate-800'}`}
          >
            <FileText size={20} /> Get a Quote
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-between items-center p-4 bg-slate-900 text-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500" />
          <span className="font-bold">TerraForm AI</span>
        </div>
        <button onClick={onLogout} className="text-slate-400">
          <LogOut size={20} />
        </button>
      </div>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden flex bg-white border-t border-slate-200 sticky bottom-0 p-2 justify-around items-center">
        {user?.role === 'contractor' && (
          <button onClick={() => onNavigate(ViewState.DASHBOARD)} className={`p-3 rounded-full ${activeView === ViewState.DASHBOARD ? 'text-emerald-600' : 'text-slate-400'}`}>
            <LayoutDashboard size={24} />
          </button>
        )}
        <button onClick={() => onNavigate(ViewState.AI_DESIGNER)} className={`p-3 rounded-full ${activeView === ViewState.AI_DESIGNER ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Palette size={24} />
        </button>
        <button onClick={() => onNavigate(ViewState.LEAD_CAPTURE)} className={`p-3 rounded-full ${activeView === ViewState.LEAD_CAPTURE ? 'text-emerald-600' : 'text-slate-400'}`}>
          <FileText size={24} />
        </button>
      </nav>
    </div>
  );
};

export default Layout;
