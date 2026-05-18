import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomeContent } from './components/features/home/HomeContent';
import { AboutContent } from './components/features/about/AboutContent';
import { GuideContent } from './components/features/guide/GuideContent';
import { ActivityContent } from './components/features/activity/ActivityContent';
import { ActivityOneContent } from './components/features/activity/ActivityOneContent';
import { ActivityTwoContent } from './components/features/activity/ActivityTwoContent';
import { ActivityThreeContent } from './components/features/activity/ActivityThreeContent';
import { ActivityVideoGatekeeper } from './components/features/activity/ActivityVideoGatekeeper';
import { AssessmentContent } from './components/features/assessment/AssessmentContent';
import { AssessmentQuizContent } from './components/features/assessment/AssessmentQuizContent';
import { EnrichmentContent } from './components/features/enrichment/EnrichmentContent';
import { EnrichmentQuizContent } from './components/features/enrichment/EnrichmentQuizContent';
import { ProgressContent } from './components/features/progress/ProgressContent';
import { playSound, getAudioContext } from './utils/sound';
import { musicManager } from './utils/music';
import { OfflineReadyBanner } from './components/common/OfflineReadyBanner';
import { isPrimaryNavPathUnlocked } from './utils/learningProgress';

type UnlockGuardProps = {
  path: string;
  children: JSX.Element;
};

const UnlockGuard = ({ path, children }: UnlockGuardProps) => {
  if (!isPrimaryNavPathUnlocked(path)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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
      
      const isActivityPage = /^\/(activity\/[123]|assessment\/quiz|enrichment\/quiz)$/.test(location.pathname);
      
      // Play click sound if it's a clickable element AND we are NOT on Activity 1 page
      // (because Activity 1 will have its own specific sound bindings)
      if (isClickable && !isActivityPage) {
        playSound.click();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [location.pathname]);

  // Handle route-based music switching
  useEffect(() => {
    // Match exactly /activity/1, /activity/2, /activity/3 or /assessment/quiz
    const isActivityGamePage = /^\/(activity\/[123]|assessment\/quiz|enrichment\/quiz)$/.test(location.pathname);
    
    if (isActivityGamePage) {
      musicManager.switchTrack('activity');
    } else {
      musicManager.switchTrack('main');
    }
  }, [location.pathname]);

  return (
    <>
      <OfflineReadyBanner />
      <Routes>
        <Route path="/activity/1" element={<UnlockGuard path="/activity/1"><ActivityOneContent /></UnlockGuard>} />
        <Route path="/activity/2" element={<UnlockGuard path="/activity/2"><ActivityTwoContent /></UnlockGuard>} />
        <Route path="/activity/3" element={<UnlockGuard path="/activity/3"><ActivityThreeContent /></UnlockGuard>} />
        <Route path="/assessment/quiz" element={<UnlockGuard path="/assessment/quiz"><AssessmentQuizContent /></UnlockGuard>} />
        <Route path="/enrichment/quiz" element={<UnlockGuard path="/enrichment/quiz"><EnrichmentQuizContent /></UnlockGuard>} />
      </Routes>
      <Routes>
        <Route path="/activity/1" element={null} />
        <Route path="/activity/2" element={null} />
        <Route path="/activity/3" element={null} />
        <Route path="/assessment/quiz" element={null} />
        <Route path="/enrichment/quiz" element={null} />
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/about" element={<AboutContent />} />
              <Route path="/guide" element={<GuideContent />} />
              <Route path="/progress" element={<ProgressContent />} />
              <Route path="/activity" element={<UnlockGuard path="/activity"><ActivityContent /></UnlockGuard>} />
              <Route path="/activity/:id/intro" element={<UnlockGuard path="/activity/intro"><ActivityVideoGatekeeper /></UnlockGuard>} />
              <Route path="/assessment" element={<UnlockGuard path="/assessment"><AssessmentContent /></UnlockGuard>} />
              <Route path="/enrichment" element={<UnlockGuard path="/enrichment"><EnrichmentContent /></UnlockGuard>} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </>
  );
}

export default App;

