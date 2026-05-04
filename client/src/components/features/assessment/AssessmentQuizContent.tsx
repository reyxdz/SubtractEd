import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, X, Music, Palette, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Home } from 'lucide-react';
import { playSound } from '../../../utils/sound';
import { musicManager } from '../../../utils/music';
import { assessmentData } from './assessmentData';
import './AssessmentContent.css';

type Theme = 'violet' | 'green' | 'red' | 'blue';
type ModalState = 'none' | 'settings' | 'correct' | 'incorrect';

export const AssessmentQuizContent: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme>('violet');
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [modalState, setModalState] = useState<ModalState>('none');
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = assessmentData[currentIndex];
  const isLastQuestion = currentIndex === assessmentData.length - 1;

  // Focus input on load and question change
  useEffect(() => {
    if (modalState === 'none' && !isFinished) {
      inputRef.current?.focus();
    }
  }, [currentIndex, modalState, isFinished]);

  // Sync music settings with global music manager
  useEffect(() => {
    if (isMusicEnabled) {
      musicManager.play();
    } else {
      musicManager.pause();
    }
  }, [isMusicEnabled]);

  // Handle auto-fading feedback modals
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (modalState === 'correct' || modalState === 'incorrect') {
      timer = setTimeout(() => {
        setModalState('none');
        if (isLastQuestion) {
          setIsFinished(true);
        } else {
          setCurrentIndex(prev => prev + 1);
          setUserAnswer('');
        }
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [modalState, isLastQuestion]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim()) return;

    const numAnswer = Number(userAnswer.trim());
    
    if (numAnswer === currentQuestion.answer) {
      playSound.success();
      setScore(prev => prev + 1);
      setModalState('correct');
    } else {
      playSound.error();
      setModalState('incorrect');
    }
  };

  const handleRestart = () => {
    playSound.click();
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer('');
    setIsFinished(false);
    setModalState('none');
  };

  const progressPercentage = ((currentIndex) / assessmentData.length) * 100;

  return (
    <div className={`assessment-container theme-${activeTheme}`}>
      {/* Background Blobs */}
      <div className="ass-blob-1" />
      <div className="ass-blob-2" />
      <div className="ass-blob-3" />

      {/* Header */}
      <header className="ass-header">
        <button className="ass-back-btn" onClick={() => { playSound.click(); navigate('/'); }}>
          <ArrowLeft size={20} /> Back
        </button>

        {!isFinished && (
          <div className="ass-header-center">
            <span className="ass-counter">{currentIndex + 1}/{assessmentData.length}</span>
            <div className="ass-progress-track">
              <div 
                className="ass-progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="ass-header-right">
          <div className="ass-score-badge">Score: {score}</div>
          <button className="ass-settings-btn" onClick={() => { playSound.pop(); setModalState('settings'); }}>
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="ass-main">
        {isFinished ? (
          <div className="ass-card" style={{ padding: '60px 40px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Quiz Complete!</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '30px' }}>Here is your final score:</p>
            <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--ass-primary)', marginBottom: '40px', textShadow: '0 4px 15px var(--ass-glow)' }}>
              {score} / {assessmentData.length}
            </div>
            <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '400px' }}>
              <button className="ass-submit-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleRestart}>
                <RefreshCw size={20} /> Play Again
              </button>
              <button className="ass-submit-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--ass-secondary)', color: 'var(--ass-text)' }} onClick={() => navigate('/')}>
                <Home size={20} /> Exit
              </button>
            </div>
          </div>
        ) : (
          <div className="ass-card">
            <div className="ass-points-badge">1 point</div>
            <div className="ass-equation">{currentQuestion.question}</div>
            
            <form className="ass-input-group" onSubmit={handleSubmit}>
              <label className="ass-input-label">Type your answer below:</label>
              <div className="ass-input-row">
                <input
                  ref={inputRef}
                  type="number"
                  className="ass-input"
                  placeholder="Enter your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={modalState !== 'none'}
                />
                <button 
                  type="submit" 
                  className="ass-submit-btn"
                  disabled={!userAnswer.trim() || modalState !== 'none'}
                >
                  Submit Answer
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {modalState === 'settings' && (
        <div className="ass-modal-overlay">
          <div className="ass-settings-modal">
            <div className="ass-modal-header">
              <h2>Settings</h2>
              <button className="ass-close-btn" onClick={() => { playSound.pop(); setModalState('none'); }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="ass-setting-row">
              <div className="ass-setting-info">
                <div className="ass-setting-icon"><Music size={20} /></div>
                <div className="ass-setting-text">
                  <h4>Music</h4>
                  <p>Enable background music</p>
                </div>
              </div>
              <div 
                className={`ass-toggle ${isMusicEnabled ? 'active' : ''}`}
                onClick={() => { playSound.tick(); setIsMusicEnabled(!isMusicEnabled); }}
              >
                <div className="ass-toggle-knob" />
              </div>
            </div>

            <div className="ass-setting-row">
              <div className="ass-setting-info">
                <div className="ass-setting-icon"><Palette size={20} /></div>
                <div className="ass-setting-text">
                  <h4>Color Theme</h4>
                  <p>Choose your preferred theme</p>
                </div>
              </div>
              <div className="ass-theme-picker">
                <button 
                  className={`ass-theme-btn red ${activeTheme === 'red' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('red'); }}
                >
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff' }} />
                  Red
                </button>
                <button 
                  className={`ass-theme-btn green ${activeTheme === 'green' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('green'); }}
                >
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff' }} />
                  Green
                </button>
                <button 
                  className={`ass-theme-btn blue ${activeTheme === 'blue' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('blue'); }}
                >
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff' }} />
                  Blue
                </button>
                <button 
                  className={`ass-theme-btn violet ${activeTheme === 'violet' ? 'active' : ''}`}
                  style={{ background: '#7B2CBF' }}
                  onClick={() => { playSound.tick(); setActiveTheme('violet'); }}
                >
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff' }} />
                  Violet
                </button>
              </div>
            </div>

            <button 
              className="ass-submit-btn" 
              style={{ width: '100%', marginTop: '24px' }}
              onClick={() => { playSound.click(); setModalState('none'); }}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modals */}
      {(modalState === 'correct' || modalState === 'incorrect') && (
        <div className="ass-modal-overlay">
          <div className={`ass-feedback-modal ${modalState}`}>
            <div className="ass-feedback-icon">
              {modalState === 'correct' ? <CheckCircle2 size={64} /> : <XCircle size={64} />}
            </div>
            <h2>{modalState === 'correct' ? 'Correct!' : 'Incorrect!'}</h2>
            <p>
              {modalState === 'correct' 
                ? 'Great job! Moving to the next question...'
                : `The correct answer was ${currentQuestion.answer}. Moving on...`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
