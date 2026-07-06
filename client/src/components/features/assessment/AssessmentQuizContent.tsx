import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, X, Music, Palette, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { playSound } from '../../../utils/sound';
import { musicManager } from '../../../utils/music';
import { assessmentData, type AssessmentQuestion } from './assessmentData';
import { markAssessmentComplete } from '../../../utils/learningProgress';
import { saveSession, loadSession, clearSession, SESSION_KEYS } from '../../../utils/sessionState';
import { AssessmentResultsSummary } from './AssessmentResultsSummary';
import { AssessmentChipVisual, AssessmentNumberLineVisual } from './components/AssessmentVisuals';
import './AssessmentContent.css';
import './components/AssessmentVisuals.css';

type Theme = 'green' | 'red' | 'blue';
type Result = 'correct' | 'incorrect' | 'pending';
type ModalState = 'none' | 'settings' | 'correct' | 'incorrect';

// Fisher-Yates shuffle (returns a new array).
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle a single question's answer choices, keeping the correct answer,
// any parallel option visuals, and the A/B/C/D positions in sync.
function shuffleQuestionChoices(q: AssessmentQuestion): AssessmentQuestion {
  if (q.type !== 'multiple-choice' || !q.options) return q;

  const order = shuffleArray(q.options.map((_, i) => i));
  const newOptions = order.map((i) => q.options![i]);
  const newAnswer = typeof q.answer === 'number' ? order.indexOf(q.answer) : q.answer;

  const result: AssessmentQuestion = { ...q, options: newOptions, answer: newAnswer };
  if (q.optionVisuals) {
    result.optionVisuals = { ...q.optionVisuals, data: order.map((i) => q.optionVisuals!.data[i]) };
  }
  return result;
}

// SHUFFLE ALL — randomize both question order and each question's choices.
function buildShuffledAssessment(): AssessmentQuestion[] {
  return shuffleArray(assessmentData).map(shuffleQuestionChoices);
}

interface SavedAssessment {
  questions: AssessmentQuestion[];
  currentIndex: number;
  score: number;
  history: Result[];
  storedAnswers: Record<number, string | number>;
  startTime: number;
}

export const AssessmentQuizContent: React.FC = () => {
  const navigate = useNavigate();
  
  // Restore any in-progress session (once).
  const savedRef = useRef<SavedAssessment | null>(loadSession<SavedAssessment>(SESSION_KEYS.assessment));
  const saved = savedRef.current;

  // State
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(() => saved?.questions ?? buildShuffledAssessment());
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0);
  const [score, setScore] = useState(saved?.score ?? 0);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme>('blue');
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [modalState, setModalState] = useState<ModalState>('none');
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<Date>(saved ? new Date(saved.startTime) : new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [history, setHistory] = useState<Result[]>(
    saved?.history ?? new Array(questions.length).fill('pending')
  );
  const [storedAnswers, setStoredAnswers] = useState<Record<number, string | number>>(saved?.storedAnswers ?? {});

  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isReviewMode = history[currentIndex] !== 'pending';

  // Focus input on load and question change
  useEffect(() => {
    if (modalState === 'none' && !isFinished && !isReviewMode) {
      inputRef.current?.focus();
    }
  }, [currentIndex, modalState, isFinished, isReviewMode]);

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
    clearSession(SESSION_KEYS.assessment);
  }, [isFinished]);

  // Persist in-progress session so students resume where they left off.
  useEffect(() => {
    if (isFinished) return;
    saveSession<SavedAssessment>(SESSION_KEYS.assessment, {
      questions,
      currentIndex,
      score,
      history,
      storedAnswers,
      startTime: startTime.getTime(),
    });
  }, [questions, currentIndex, score, history, storedAnswers, startTime, isFinished]);

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
    setStoredAnswers(prev => ({ ...prev, [currentIndex]: finalAnswer }));

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
    const reshuffled = buildShuffledAssessment();
    setQuestions(reshuffled);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer('');
    setIsFinished(false);
    setModalState('none');
    setStartTime(new Date());
    setHistory(new Array(reshuffled.length).fill('pending'));
    setStoredAnswers({});
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
              {history.map((result, index) => {
                const isClickable = result !== 'pending' || index === history.findIndex(r => r === 'pending');
                return (
                  <div 
                    key={index} 
                    className={`ass-history-item ${result} ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      if (isClickable) {
                        playSound.tick();
                        setCurrentIndex(index);
                      }
                    }}
                    style={{ cursor: isClickable ? 'pointer' : 'default' }}
                  >
                    {result === 'correct' && <CheckCircle2 size={16} />}
                    {result === 'incorrect' && <XCircle size={16} />}
                    {result === 'pending' && <div className="ass-pending-dot" />}
                  </div>
                );
              })}
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
            totalItems={questions.length}
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
                {currentQuestion.options?.map((option, idx) => {
                  const isSelected = storedAnswers[currentIndex] === idx;
                  const btnClass = `ass-option-btn ${currentQuestion.optionVisuals ? 'with-visual' : ''} ${isReviewMode && isSelected ? 'selected' : ''}`;
                  return (
                  <button 
                    key={idx} 
                    className={btnClass}
                    onClick={() => { 
                      if (!isReviewMode) {
                        playSound.tick(); 
                        handleSubmit(idx); 
                      }
                    }}
                    disabled={modalState !== 'none' || isReviewMode}
                    style={isReviewMode && isSelected ? { outline: '3px solid #000' } : {}}
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
                  );
                })}
              </div>
            ) : (
              <form className="ass-input-group" onSubmit={(e) => { e.preventDefault(); if (!isReviewMode) handleSubmit(); }}>
                <label className="ass-input-label">Type your answer below:</label>
                <div className="ass-input-row">
                  <input
                    ref={inputRef}
                    type="text"
                    className="ass-input"
                    placeholder="Enter your answer here..."
                    value={isReviewMode ? String(storedAnswers[currentIndex] || '') : userAnswer}
                    onChange={(e) => {
                      if (!isReviewMode) setUserAnswer(e.target.value);
                    }}
                    disabled={modalState !== 'none'}
                    readOnly={isReviewMode}
                  />
                  {!isReviewMode && (
                    <button 
                      type="submit" 
                      className="ass-submit-btn"
                      disabled={!userAnswer.trim() || modalState !== 'none'}
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              </form>
            )}

            {isReviewMode && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                  className="ass-submit-btn"
                  onClick={() => {
                    playSound.click();
                    const nextIdx = history.findIndex(r => r === 'pending');
                    if (nextIdx !== -1) {
                      setCurrentIndex(nextIdx);
                    } else {
                      setEndTime(new Date());
                      setIsFinished(true);
                    }
                  }}
                >
                  Back to Current Question
                </button>
              </div>
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
