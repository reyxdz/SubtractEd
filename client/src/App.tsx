import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomeContent } from './components/features/home/HomeContent';
import { GuideContent } from './components/features/guide/GuideContent';
import { ActivityContent } from './components/features/activity/ActivityContent';
import { ActivityOneContent } from './components/features/activity/ActivityOneContent';
import { AssessmentContent } from './components/features/assessment/AssessmentContent';
import { EnrichmentContent } from './components/features/enrichment/EnrichmentContent';
import { playSound, getAudioContext } from './utils/sound';
import { musicManager } from './utils/music';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize audio context on first interaction if possible
    const initAudio = () => {
      getAudioContext();
      musicManager.play(); // Start background music on first user interaction
    };
    document.addEventListener('mousedown', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button') || target.closest('a') || target.closest('.card') || target.closest('.activity-option-card');
      
      const isActivityOnePage = location.pathname === '/activity/1';
      
      // Play click sound if it's a clickable element AND we are NOT on Activity 1 page
      // (because Activity 1 will have its own specific sound bindings)
      if (isClickable && !isActivityOnePage) {
        playSound.click();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [location.pathname]);

  // Handle route-based music switching
  useEffect(() => {
    // Match exactly /activity/1, /activity/2, or /activity/3
    const isActivityGamePage = /^\/activity\/[123]$/.test(location.pathname);
    
    if (isActivityGamePage) {
      musicManager.switchTrack('activity');
    } else {
      musicManager.switchTrack('main');
    }
  }, [location.pathname]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/guide" element={<GuideContent />} />
        <Route path="/activity" element={<ActivityContent />} />
        <Route path="/activity/1" element={<ActivityOneContent />} />
        <Route path="/assessment" element={<AssessmentContent />} />
        <Route path="/enrichment" element={<EnrichmentContent />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
