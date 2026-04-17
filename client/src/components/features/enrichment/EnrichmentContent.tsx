import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../guide/GuideContent.css';

export const EnrichmentContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-container">
      <header className="guide-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className="guide-title">Enrichment Card</h1>
        <div style={{ width: '80px' }}></div>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '2rem', gap: '1.5rem' }}>
        <h1 style={{ color: 'var(--theme-primary)', fontSize: '2.5rem', margin: 0 }}>Go Beyond the Lesson</h1>
        <p style={{ maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-text-dark)', margin: 0 }}>
          Welcome to the Enrichment Card page. This section can be used for advanced practice, real-life applications, or challenge tasks for students who want to explore more.
        </p>
      </section>
    </div>
  );
};
