import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../layout/TopBar';
import './ActivityOneContent.css';
import '../guide/GuideContent.css'; // Reuse common header styles

export const ActivityOneContent: React.FC = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  return (
    <div className="guide-page-container">
      {/* Header */}
      <header className="guide-header activity-one-header">
        <button className="neo-btn back-chip" onClick={() => navigate('/activity')}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill activity-one-title">Activity 1</h1>
        <TopBar />
      </header>

      {/* Progress Bar Area */}
      <div className="activity-progress-area">
        <div className="progress-text-row">
          <span className="item-count">Item 6 of 15</span>
          <span className="level-badge">Moderate Level</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '40%' }}></div>
        </div>
      </div>

      <div className="activity-main-body">
        {/* Directions Box */}
        <div className="directions-box">
          <p>Directions: Convert the sentence into a number sentence. Click the buttons to form your expression, then enter the correct answer in the answer box.</p>
        </div>

        {/* Question Box */}
        <div className="question-box">
          <p>You have 8 pesos. You subtract your utang of -5 pesos. How much money do you have now?</p>
        </div>

        {/* Equation Display */}
        <div className="equation-display">
          <h2>8 - (-5)</h2>
        </div>

        {/* Game Area */}
        <div className="game-area-layout">
          {/* Main Working Area */}
          <div className="working-area-container">
            <div className="working-area-header">Working Area</div>
            <div className="working-area-content">
              {answer ? (
                <span className="working-answer-display">{answer}</span>
              ) : (
                <span className="placeholder-text">Type your answer below...</span>
              )}
            </div>
          </div>
        </div>

        {/* Input Controls */}
        <div className="input-controls-row">
          <div className="left-controls">
            <button className="action-btn clear-btn" onClick={() => setAnswer('')}>Clear</button>
            <button className="action-btn hint-btn">Hint</button>
          </div>
          
          <div className="input-field-wrapper">
            <span className="input-label">Answer:</span>
            <input 
              type="text" 
              className="answer-input" 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="-3"
            />
          </div>

          <div className="right-controls">
             <button className="action-btn check-btn">Check Answer</button>
          </div>
        </div>
      </div>
    </div>
  );
};
