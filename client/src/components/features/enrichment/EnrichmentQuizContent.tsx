import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, X, Music, Palette, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Home, Trophy } from 'lucide-react';
import { playSound } from '../../../utils/sound';
import { musicManager } from '../../../utils/music';
import { enrichmentLevels, TOTAL_ENRICHMENT_QUESTIONS } from './enrichmentData';
import enrichmentBg from '../../../assets/images/enrichment_bg.png';
import './EnrichmentQuizContent.css';

type Theme = 'violet' | 'green' | 'red' | 'blue';
type ModalState = 'none' | 'settings' | 'correct' | 'incorrect';

export const EnrichmentQuizContent: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [levelIndex, setLevelIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme>('violet');
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [modalState, setModalState] = useState<ModalState>('none');
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Current level & question
  const currentLevel = enrichmentLevels[levelIndex];
  const currentQuestion = currentLevel.questions[qIndex];
  const totalQuestionsInLevel = currentLevel.questions.length;

  // Focus input on load and question change
  useEffect(() => {
    if (modalState === 'none' && !isFinished) {
      inputRef.current?.focus();
    }
  }, [qIndex, levelIndex, modalState, isFinished]);

  // Sync music settings with global music manager
  useEffect(() => {
    if (isMusicEnabled) {
      musicManager.play();
    } else {
      musicManager.pause();
    }
  }, [isMusicEnabled]);

  // Auto-advance on correct answer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (modalState === 'correct') {
      timer = setTimeout(() => {
        setModalState('none');
        setUserAnswer('');

        if (qIndex < totalQuestionsInLevel - 1) {
          // Next question in same level
          setQIndex(prev => prev + 1);
        } else if (levelIndex < enrichmentLevels.length - 1) {
          // Advance to next level
          setLevelIndex(prev => prev + 1);
          setQIndex(0);
        } else {
          // All levels complete
          setIsFinished(true);
        }
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [modalState, qIndex, totalQuestionsInLevel, levelIndex]);

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

  const handleRetry = () => {
    playSound.click();
    setModalState('none');
    setUserAnswer('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRestart = () => {
    playSound.click();
    setLevelIndex(0);
    setQIndex(0);
    setScore(0);
    setUserAnswer('');
    setIsFinished(false);
    setModalState('none');
  };

  // Progress: cumulative across all levels
  const questionsCompletedBefore = enrichmentLevels
    .slice(0, levelIndex)
    .reduce((sum, lvl) => sum + lvl.questions.length, 0);
  const totalCompleted = questionsCompletedBefore + qIndex;
  const progressPercentage = (totalCompleted / TOTAL_ENRICHMENT_QUESTIONS) * 100;

  const scorePercentage = Math.round((score / TOTAL_ENRICHMENT_QUESTIONS) * 100);

  const getEncouragement = () => {
    if (scorePercentage >= 90) return "Outstanding! You're a subtraction master! 🏆";
    if (scorePercentage >= 75) return "Great job! Keep practicing! 🌟";
    if (scorePercentage >= 50) return "Good effort! You're getting there! 💪";
    return "Keep practicing! You'll improve! 📚";
  };

  return (
    <div className={`enr-container theme-${activeTheme}`}>
      {/* Background */}
      <div className="enr-bg-layer">
        <img src={enrichmentBg} alt="" draggable="false" />
        <div className="enr-bg-overlay" />
      </div>

      {/* Decorative Blobs */}
      <div className="enr-blob-1" />
      <div className="enr-blob-2" />
      <div className="enr-blob-3" />

      {/* Header */}
      <header className="enr-header">
        <button className="enr-back-btn" onClick={() => { playSound.click(); navigate('/enrichment'); }}>
          <ArrowLeft size={18} /> Back
        </button>

        {!isFinished && (
          <div className="enr-header-center">
            <span className="enr-counter">{qIndex + 1}/{totalQuestionsInLevel}</span>
            <div className="enr-progress-track">
              <div className="enr-progress-fill" style={{ width: `${progressPercentage}%` }} />
            </div>
            <span className="enr-level-badge">{currentLevel.name}</span>
          </div>
        )}

        <div className="enr-header-right">
          <div className="enr-score-badge">Score: {score}</div>
          <button className="enr-settings-btn" onClick={() => { playSound.pop(); setModalState('settings'); }}>
            <Settings size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="enr-main">
        {isFinished ? (
          <div className="enr-complete-card">
            <div className="enr-trophy">
              <Trophy size={48} color="white" />
            </div>
            <h2>Quiz Completed!</h2>
            <p className="enr-subtitle">Great effort! Here's how you did:</p>

            <div className="enr-score-box">
              <div className="enr-score-label">YOUR SCORE</div>
              <div className="enr-score-number">
                {score}<span className="enr-score-slash">/</span>{TOTAL_ENRICHMENT_QUESTIONS}
              </div>
              <div className="enr-percentage">{scorePercentage}%</div>
            </div>

            <p className="enr-encouragement">{getEncouragement()}</p>

            <div className="enr-complete-actions">
              <button className="enr-review-btn" onClick={handleRestart}>
                <RefreshCw size={18} /> Play Again
              </button>
              <button className="enr-finish-btn" onClick={() => { playSound.click(); navigate('/enrichment'); }}>
                <Home size={18} /> Finish
              </button>
            </div>
          </div>
        ) : (
          <div className="enr-card">
            <div className="enr-points-badge">1 point</div>
            <div className="enr-equation">{currentQuestion.equation}</div>

            <form className="enr-input-group" onSubmit={handleSubmit}>
              <label className="enr-input-label">Type your answer below:</label>
              <div className="enr-input-row">
                <input
                  ref={inputRef}
                  type="number"
                  className="enr-input"
                  placeholder="Enter your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={modalState !== 'none'}
                />
                <button
                  type="submit"
                  className="enr-submit-btn"
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
        <div className="enr-modal-overlay">
          <div className="enr-settings-modal">
            <div className="enr-modal-header">
              <h2>Settings</h2>
              <button className="enr-close-btn" onClick={() => { playSound.pop(); setModalState('none'); }}>
                <X size={18} />
              </button>
            </div>

            <div className="enr-setting-row">
              <div className="enr-setting-info">
                <div className="enr-setting-icon"><Music size={18} /></div>
                <div className="enr-setting-text">
                  <h4>Music</h4>
                  <p>Turn background music on or off.</p>
                </div>
              </div>
              <div
                className={`enr-toggle ${isMusicEnabled ? 'active' : ''}`}
                onClick={() => { playSound.tick(); setIsMusicEnabled(!isMusicEnabled); }}
              >
                <div className="enr-toggle-knob" />
              </div>
            </div>

            <div className="enr-setting-row" style={{ borderBottom: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5vh' }}>
              <div className="enr-setting-info">
                <div className="enr-setting-icon"><Palette size={18} /></div>
                <div className="enr-setting-text">
                  <h4>Color Theme</h4>
                  <p>Choose your favorite color theme.</p>
                </div>
              </div>
              <div className="enr-theme-picker">
                <button
                  className={`enr-theme-btn red ${activeTheme === 'red' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('red'); }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                  Red
                </button>
                <button
                  className={`enr-theme-btn green ${activeTheme === 'green' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('green'); }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                  Green
                </button>
                <button
                  className={`enr-theme-btn blue ${activeTheme === 'blue' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('blue'); }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                  Blue
                </button>
                <button
                  className={`enr-theme-btn violet ${activeTheme === 'violet' ? 'active' : ''}`}
                  onClick={() => { playSound.tick(); setActiveTheme('violet'); }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                  Violet
                </button>
              </div>
            </div>

            <button
              className="enr-submit-btn"
              style={{ width: '100%', marginTop: '2vh', padding: '1.5vh 0', borderRadius: '9999px' }}
              onClick={() => { playSound.click(); setModalState('none'); }}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Correct Feedback Modal */}
      {modalState === 'correct' && (
        <div className="enr-modal-overlay">
          <div className="enr-feedback-modal correct" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Confetti dots */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="enr-confetti"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${Math.random() * 40}%`,
                  background: ['#27ae60', '#2ecc71', '#f1c40f', '#e67e22'][i % 4],
                  animationDelay: `${Math.random() * 0.5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
            <div className="enr-feedback-icon">
              <CheckCircle2 size={48} />
            </div>
            <h2>Correct!</h2>
            <p>Great job! Keep it up!</p>
          </div>
        </div>
      )}

      {/* Incorrect Feedback Modal */}
      {modalState === 'incorrect' && (
        <div className="enr-modal-overlay">
          <div className="enr-feedback-modal incorrect">
            <div className="enr-feedback-icon">
              <XCircle size={48} />
            </div>
            <h2>Incorrect!</h2>
            <p>You can do better. Keep going!</p>
            <button className="enr-retry-btn" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
