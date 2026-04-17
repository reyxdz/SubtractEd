import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../../common/Button';
import './GuideContent.css';

export const GuideContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-container">
      <header className="guide-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className="guide-title">Guide Card</h1>
        <div style={{ width: '80px' }}></div> {/* Spacer for symmetry */}
      </header>

      <section className="objective-section">
        <div className="objective-card glass">
          <h2>Learning Competency</h2>
          <ul className="objective-list">
            <li>
              <div className="check-icon">
                <Check size={20} strokeWidth={3} />
              </div>
              <span>
                Subtract integers using concrete models such as counters and integer chips, 
                pictorial models such as bar models and number lines, and with integers written as numerals.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="video-section">
        <h2 style={{ color: 'var(--theme-primary)', marginTop: '1rem' }}>Introduction</h2>
        <div className="video-frame">
          <div className="play-button">▶</div>
        </div>
      </section>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button onClick={() => navigate('/activity')} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
          Next to Activity
        </Button>
      </div>
    </div>
  );
};
