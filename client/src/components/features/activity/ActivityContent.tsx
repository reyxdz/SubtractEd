import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../common/Card';
import './ActivityContent.css';
import '../guide/GuideContent.css'; // Reuse header styles

export const ActivityContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-container">
      <header className="guide-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className="guide-title">Activity Card</h1>
        <div style={{ width: '80px' }}></div>
      </header>

      <section className="video-section">
        <h2 style={{ color: 'var(--color-text-dark)', margin: 0 }}>Watch the video before starting the activities.</h2>
        <div className="video-frame" style={{ maxWidth: '600px' }}>
          <div className="play-button">▶</div>
        </div>
      </section>

      <div className="activity-options-grid">
        <Card className="activity-option-card" onClick={() => {}}>
          <div className="activity-emoji">🛒</div>
          <h3>Activity 1</h3>
          <p>Sari-sari store theme with neighborhood items, local buying situations, and a Filipino tindahan feel.</p>
        </Card>
        
        <Card className="activity-option-card" onClick={() => {}}>
          <div className="activity-emoji">📝</div>
          <h3>Activity 2</h3>
          <p>Guided written practice using clear steps and learner-friendly subtraction tasks.</p>
        </Card>

        <Card className="activity-option-card" onClick={() => {}}>
          <div className="activity-emoji">🔍</div>
          <h3>Activity 3</h3>
          <p>Challenge and discovery tasks that help students inspect patterns and solve problems.</p>
        </Card>
      </div>
    </div>
  );
};
