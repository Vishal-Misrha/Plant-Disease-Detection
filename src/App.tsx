import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoBanner } from './components/DemoBanner';
import { HomePage } from './pages/HomePage';
import { DetectPage } from './pages/DetectPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { checkBackendHealth } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [demoModeActive, setDemoModeActive] = useState<boolean>(true);
  const [preselectedSample, setPreselectedSample] = useState<string | null>(null);

  useEffect(() => {
    // Check backend health periodically
    const verifyHealth = async () => {
      const health = await checkBackendHealth();
      setIsBackendConnected(health.online);
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleStartDetection = (sampleHint?: string) => {
    if (sampleHint) {
      setPreselectedSample(sampleHint);
    }
    setActiveTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf8] text-slate-800 antialiased font-sans">
      {/* Demo Mode & Backend Connectivity Banner */}
      <DemoBanner
        isBackendConnected={isBackendConnected}
        demoModeActive={demoModeActive}
        onToggleDemo={() => setDemoModeActive(!demoModeActive)}
      />

      {/* Sticky Glass Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBackendConnected={isBackendConnected}
      />

      {/* Page Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onStartDetection={() => handleStartDetection()}
            onSelectCropDemo={(crop) => handleStartDetection(crop)}
          />
        )}

        {activeTab === 'detect' && (
          <DetectPage
            onViewHistory={() => {
              setActiveTab('history');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            preselectedSample={preselectedSample}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            onStartDetection={() => handleStartDetection()}
            onViewHistory={() => {
              setActiveTab('history');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            onStartDetection={() => handleStartDetection()}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Modern Agricultural Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
