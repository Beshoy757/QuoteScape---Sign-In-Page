
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import AIDesigner from './components/AIDesigner';
import LeadCapture from './components/LeadCapture';
import ContractorDashboard from './components/ContractorDashboard';
import { ViewState, AuthState } from './types';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isLoggedIn: false
  });

  const [activeView, setActiveView] = useState<ViewState>(ViewState.AUTH);

  // Handle Login Success
  const handleLogin = (name: string, role: 'contractor' | 'lead') => {
    setAuth({
      user: { name, role },
      isLoggedIn: true
    });
    // Set initial view based on role
    setActiveView(role === 'contractor' ? ViewState.DASHBOARD : ViewState.AI_DESIGNER);
  };

  const handleLogout = () => {
    setAuth({ user: null, isLoggedIn: false });
    setActiveView(ViewState.AUTH);
  };

  // If not logged in, show Auth screen
  if (!auth.isLoggedIn) {
    return <Auth onLoginSuccess={handleLogin} />;
  }

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      user={auth.user} 
      onLogout={handleLogout}
    >
      {activeView === ViewState.DASHBOARD && <ContractorDashboard />}
      {activeView === ViewState.AI_DESIGNER && <AIDesigner />}
      {activeView === ViewState.LEAD_CAPTURE && <LeadCapture />}
    </Layout>
  );
};

export default App;
