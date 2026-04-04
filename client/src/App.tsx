import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { HomeContent } from './components/features/home/HomeContent';

function App() {
  return (
    <MainLayout>
      <HomeContent />
    </MainLayout>
  );
}

export default App;
