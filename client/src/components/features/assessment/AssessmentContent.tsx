import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';
import { TopBar } from '../../layout/TopBar';
import '../guide/GuideContent.css';

export const AssessmentContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-container">
      <header className="guide-header">
        <button className="neo-btn back-chip" onClick={() => navigate('/')}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill">Assessment Card</h1>
        <TopBar />
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '6rem', gap: '1.5rem' }}>
        <h1 style={{ color: 'var(--theme-primary)', fontSize: '2.5rem', margin: 0 }}>Check Your Understanding</h1>
        <p style={{ maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-text-dark)', margin: 0 }}>
          Welcome to the Assessment Card page. This section is intended for quizzes or evaluation tasks to measure student understanding of subtraction of integers.
        </p>
        <Button onClick={() => navigate('/assessment/quiz')} style={{ marginTop: '1rem', padding: '1rem 2rem' }}>
          Start Assessment
        </Button>
      </section>
    </div>
  );
};
