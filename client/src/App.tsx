import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomeContent } from './components/features/home/HomeContent';
import { GuideContent } from './components/features/guide/GuideContent';
import { ActivityContent } from './components/features/activity/ActivityContent';
import { AssessmentContent } from './components/features/assessment/AssessmentContent';
import { EnrichmentContent } from './components/features/enrichment/EnrichmentContent';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/guide" element={<GuideContent />} />
        <Route path="/activity" element={<ActivityContent />} />
        <Route path="/assessment" element={<AssessmentContent />} />
        <Route path="/enrichment" element={<EnrichmentContent />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
