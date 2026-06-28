import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, X, Music, Palette, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { playSound } from '../../../utils/sound';
import { musicManager } from '../../../utils/music';
import { assessmentData } from './assessmentData';
import { markAssessmentComplete } from '../../../utils/learningProgress';
import { AssessmentResultsSummary } from './AssessmentResultsSummary';
import { AssessmentChipVisual, AssessmentNumberLineVisual } from './components/AssessmentVisuals';
import './AssessmentContent.css';
import './components/AssessmentVisuals.css';

type Theme = 'green' | 'red' | 'blue';
type Result = 'correct' | 'incorrect' | 'pending';
type ModalState = 'none' | 'settings' | 'correct' | 'incorrect';

export const AssessmentQuizContent: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme>('blue');
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [modalState, setModalState] = useState<ModalState>('none');
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [history, setHistory] = useState<Result[]>(
    new Array(assessmentData.length).fill('pending')
  );

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
          setEndTime(new Date());
          setIsFinished(true);
        } else {
          setCurrentIndex(prev => prev + 1);
          setUserAnswer('');
        }
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [modalState, isLastQuestion]);

  useEffect(() => {
    if (!isFinished) return;

    markAssessmentComplete();
  }, [isFinished]);

  const handleSubmit = (answer?: string | number) => {
    const finalAnswer = answer !== undefined ? answer : userAnswer.trim();
    if (finalAnswer === '' && currentQuestion.type === 'short-answer') return;

    let isCorrect = false;
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = Number(finalAnswer) === currentQuestion.answer;
    } else {
      // For short-answer, case-insensitive comparison and trim whitespace
      isCorrect = finalAnswer.toString().toLowerCase().trim() === currentQuestion.answer.toString().toLowerCase().trim();
    }
    
    const newHistory = [...history];
    newHistory[currentIndex] = isCorrect ? 'correct' : 'incorrect';
    setHistory(newHistory);

    if (isCorrect) {
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
    setStartTime(new Date());
    setHistory(new Array(assessmentData.length).fill('pending'));
  };

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
            <div className="ass-progress-history">
              {history.map((result, index) => (
                <div 
                  key={index} 
                  className={`ass-history-item ${result} ${index === currentIndex ? 'active' : ''}`}
                >
                  {result === 'correct' && <CheckCircle2 size={16} />}
                  {result === 'incorrect' && <XCircle size={16} />}
                  {result === 'pending' && <div className="ass-pending-dot" />}
                </div>
              ))}
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
          <AssessmentResultsSummary 
            score={score}
            totalItems={assessmentData.length}
            history={history}
            startTime={startTime}
            endTime={endTime}
            onRestart={handleRestart}
            onExit={() => navigate('/')}
          />
        ) : (
          <div className="ass-card">
            <div className="ass-points-badge">1 point</div>
            <div className="ass-question-text">{currentQuestion.question}</div>
            
            {currentQuestion.imageUrl && (
              <div className="ass-question-image-container">
                <img src={currentQuestion.imageUrl} alt="Question Visual" className="ass-question-image" />
              </div>
            )}

            {currentQuestion.questionVisual && (
              <div className="ass-question-visual-container">
                {currentQuestion.questionVisual.type === 'chips' ? (
                  <AssessmentChipVisual {...currentQuestion.questionVisual.data} />
                ) : (
                  <AssessmentNumberLineVisual {...currentQuestion.questionVisual.data} />
                )}
              </div>
            )}

            {currentQuestion.type === 'multiple-choice' ? (
              <div className={`ass-options-grid ${currentQuestion.optionVisuals ? 'has-visuals' : ''}`}>
                {currentQuestion.options?.map((option, idx) => (
                  <button 
                    key={idx} 
                    className={`ass-option-btn ${currentQuestion.optionVisuals ? 'with-visual' : ''}`}
                    onClick={() => { playSound.tick(); handleSubmit(idx); }}
                    disabled={modalState !== 'none'}
                  >
                    <div className="ass-option-main">
                      <span className="ass-option-label">{String.fromCharCode(65 + idx)}</span>
                      {!currentQuestion.optionVisuals && <span className="ass-option-text">{option}</span>}
                    </div>
                    {currentQuestion.optionVisuals && (
                      <div className="ass-option-visual">
                        {currentQuestion.optionVisuals.type === 'chips' ? (
                          <AssessmentChipVisual {...currentQuestion.optionVisuals.data[idx]} />
                        ) : (
                          <AssessmentNumberLineVisual {...currentQuestion.optionVisuals.data[idx]} />
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <form className="ass-input-group" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <label className="ass-input-label">Type your answer below:</label>
                <div className="ass-input-row">
                  <input
                    ref={inputRef}
                    type="text"
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
            )}
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
                : `The correct answer was: ${
                    currentQuestion.type === 'multiple-choice'
                      ? `${String.fromCharCode(65 + (currentQuestion.answer as number))}. ${currentQuestion.options?.[currentQuestion.answer as number]}`
                      : currentQuestion.answer
                  }. Moving on...`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
