import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../layout/TopBar';
import { playSound } from '../../../utils/sound';
import enrichmentBg from '../../../assets/images/enrichment_bg.png';
import '../guide/GuideContent.css';

export const EnrichmentContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-page-container">
      <header className="guide-header">
        <button className="neo-btn back-chip" onClick={() => { playSound.click(); navigate('/'); }}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill">Enrichment Card</h1>
        <TopBar />
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '2rem', gap: '1.5rem', padding: '0 2rem' }}>
        <h1 style={{ color: 'var(--theme-primary)', fontSize: '2.2rem', margin: 0, fontWeight: 900 }}>
          🏴‍☠️ Treasure Hunt Math Crossword Puzzle
        </h1>
        <p style={{ maxWidth: '650px', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-dark)', margin: 0 }}>
          Test your subtraction skills with 6 challenging levels! Solve equations ranging from basic subtraction to double negatives. Each correct answer earns you 1 point. Can you complete all 66 questions?
        </p>

        <div style={{
          width: '100%',
          maxWidth: '700px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          border: '3px solid rgba(255,255,255,0.6)',
        }}>
          <img
            src={enrichmentBg}
            alt="Treasure Hunt Crossword"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <button
          onClick={() => { playSound.click(); navigate('/enrichment/quiz'); }}
          style={{
            background: 'linear-gradient(145deg, var(--theme-primary), var(--theme-accent))',
            color: 'white',
            border: 'none',
            padding: '16px 48px',
            borderRadius: '9999px',
            fontSize: '1.15rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            marginBottom: '2rem',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          🎯 Start Quiz
        </button>
      </section>
    </div>
  );
};
