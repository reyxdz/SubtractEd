import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../layout/TopBar';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { activity3Questions, Difficulty, A3Question } from './activity3Data';
import storeBg from '../../../assets/images/store_bg.png';
import './ActivityThreeContent.css';
import './ActivityOneContent.css'; // reuse progress bar & action-btn styles
import '../guide/GuideContent.css';

// ── Helpers ────────────────────────────────────────────────────
function normalizeSentence(s: string): string {
  return s.replace(/\s+/g, '').replace(/[()]/g, '').replace(/−/g, '-').replace(/–/g, '-').toLowerCase();
}

function checkSentence(userInput: string, canonical: string): boolean {
  return normalizeSentence(userInput) === normalizeSentence(canonical);
}

// ── Scaffolding Steps Component ────────────────────────────────
interface StepCardsProps {
  question: A3Question;
  difficulty: Difficulty;
}

const StepCards: React.FC<StepCardsProps> = ({ question, difficulty }) => {
  const { minuend, subtrahend } = question;
  const showExamples = difficulty === 'easy';
  const flippedSign = -subtrahend;

  return (
    <div className="a3-steps-container">
      {/* Step 1: KEEP */}
      <div className="a3-step-card">
        <div className="a3-step-number step-1">1</div>
        <div className="a3-step-header header-keep">KEEP the Minuend!</div>
        <div className="a3-step-body">
          <div className="step-label">Keep the first number. Copy it.</div>
          {showExamples && (
            <div className="step-example">
              <span>Keep: </span>
              <span className="kept">{minuend}</span>
              <br />
              <span className="kept">{minuend}</span>
              <span> − </span>
              <span>({subtrahend})</span>
            </div>
          )}
        </div>
      </div>

      <div className="a3-step-arrow">→</div>

      {/* Step 2: CHANGE Operation */}
      <div className="a3-step-card">
        <div className="a3-step-number step-2">2</div>
        <div className="a3-step-header header-change-op">CHANGE the Operation!</div>
        <div className="a3-step-body">
          <div className="step-label">Change the minus (−) to plus (+).</div>
          {showExamples && (
            <div className="step-example">
              <span>Change: </span>
              <span>{minuend}</span>
              <span className="original"> − </span>
              <span>({subtrahend})</span>
              <br />
              <span>{minuend}</span>
              <span className="changed-op"> + </span>
              <span>({subtrahend})</span>
            </div>
          )}
        </div>
      </div>

      <div className="a3-step-arrow">→</div>

      {/* Step 3: CHANGE Sign */}
      <div className="a3-step-card">
        <div className="a3-step-number step-3">3</div>
        <div className="a3-step-header header-change-sign">CHANGE the Sign of the Subtrahend!</div>
        <div className="a3-step-body">
          <div className="step-label">Change {subtrahend} to {flippedSign}.</div>
          {showExamples && (
            <div className="step-example">
              <span>{minuend}</span>
              <span className="changed-op"> + </span>
              <span className="original">({subtrahend})</span>
              <br />
              <span>Change: </span>
              <span>{minuend}</span>
              <span className="changed-op"> + </span>
              <span className="changed-sign">{flippedSign}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
export const ActivityThreeContent: React.FC = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [qIndex, setQIndex] = useState(0);
  const [newSentence, setNewSentence] = useState('');
  const [answer, setAnswer] = useState('');

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    question?: A3Question;
  }>({ isOpen: false, type: 'info', title: '', message: '' });

  const [hintModalOpen, setHintModalOpen] = useState(false);

  const currentQ = activity3Questions[difficulty][qIndex];
  const totalQuestions = activity3Questions[difficulty].length;
  const progressPercentage = ((qIndex + 1) / totalQuestions) * 100;
  const showSteps = difficulty !== 'difficult';
  const showHint = difficulty !== 'difficult';

  // Reset inputs when question changes
  useEffect(() => {
    setNewSentence('');
    setAnswer('');
  }, [difficulty, qIndex]);

  const handleCheckAnswer = useCallback(() => {
    if (!answer.trim()) return;

    const numAnswer = Number(answer.trim());
    const sentenceOk = checkSentence(newSentence, currentQ.newSentence);
    const answerOk = numAnswer === currentQ.answer;

    if (sentenceOk && answerOk) {
      playSound.success();
      setModalState({
        isOpen: true, type: 'success',
        title: 'Great Job!',
        message: 'Your answer is correct!'
      });
    } else {
      playSound.error();
      setModalState({
        isOpen: true, type: 'error',
        title: currentQ.errorTitle,
        message: currentQ.errorMessage,
        question: currentQ
      });
    }
  }, [answer, newSentence, currentQ]);

  const handleNext = useCallback(() => {
    playSound.click();
    setModalState(prev => ({ ...prev, isOpen: false }));

    if (qIndex < totalQuestions - 1) {
      setQIndex(prev => prev + 1);
    } else {
      // Auto-advance to next difficulty
      if (difficulty === 'easy') {
        setDifficulty('moderate');
        setQIndex(0);
      } else if (difficulty === 'moderate') {
        setDifficulty('difficult');
        setQIndex(0);
      } else {
        navigate('/activity');
      }
    }
  }, [qIndex, totalQuestions, difficulty, navigate]);

  const handleRetry = useCallback(() => {
    playSound.click();
    setModalState(prev => ({ ...prev, isOpen: false }));
    setAnswer('');
    setNewSentence('');
  }, []);

  const handleDifficultyChange = useCallback((level: Difficulty) => {
    playSound.click();
    setDifficulty(level);
    setQIndex(0);
  }, []);

  return (
    <div className="a3-page-container" style={{ '--a3-store-bg': `url(${storeBg})` } as React.CSSProperties}>
      {/* Header */}
      <header className="guide-header activity-one-header">
        <button className="neo-btn back-chip" onClick={() => { playSound.click(); navigate('/activity'); }}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill activity-one-title">Activity 3</h1>
        <TopBar />
      </header>

      {/* Progress Bar */}
      <div className="activity-progress-area" style={{ padding: '0 16px' }}>
        <div className="progress-text-row">
          <span>Item {qIndex + 1} of {totalQuestions}</span>
          <span className="level-badge">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="a3-main-body">
        {/* Difficulty Pills */}
        <div className="difficulty-pills">
          <button className={`difficulty-pill pill-easy ${difficulty === 'easy' ? 'active' : ''}`} onClick={() => handleDifficultyChange('easy')}>Easy (1-5)</button>
          <button className={`difficulty-pill pill-moderate ${difficulty === 'moderate' ? 'active' : ''}`} onClick={() => handleDifficultyChange('moderate')}>Moderate (6-10)</button>
          <button className={`difficulty-pill pill-difficult ${difficulty === 'difficult' ? 'active' : ''}`} onClick={() => handleDifficultyChange('difficult')}>Difficult (11-15)</button>
        </div>

        {/* Directions */}
        <div className="a3-directions-banner">
          <p>Use the <strong>KEEP-CHANGE-CHANGE</strong> rule to turn the subtraction sentence into an addition sentence. Follow the three steps, then write your new number sentence and answer.</p>
        </div>

        {/* Question + Number Sentence */}
        <div className="a3-question-card">
          <div className="a3-question-section">
            <div className="a3-question-label">Question:</div>
            <p className="a3-question-text">{currentQ.question}</p>
          </div>
          <div className="a3-sentence-section">
            <div className="a3-sentence-label">Number Sentence:</div>
            <div className="a3-sentence-display">{currentQ.sentence}</div>
          </div>
        </div>

        {/* Scaffolding Steps (Easy & Moderate only) */}
        {showSteps && <StepCards question={currentQ} difficulty={difficulty} />}

        {/* Input Area */}
        <div className="a3-input-area">
          <div className="a3-sentence-input-card">
            <div className="a3-input-label">Write Your New Number Sentence:</div>
            <input
              className="a3-text-input"
              type="text"
              value={newSentence}
              onChange={(e) => { playSound.tick(); setNewSentence(e.target.value); }}
              placeholder="e.g. 10 + (-3)"
            />
          </div>
          <div className="a3-answer-input-card">
            <div className="a3-input-label">Answer:</div>
            <input
              className="a3-number-input"
              type="text"
              value={answer}
              onChange={(e) => { playSound.tick(); setAnswer(e.target.value); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCheckAnswer(); }}
              placeholder="Enter your answer here"
            />
          </div>
        </div>

        {/* Footer Controls */}
        <div className="a3-footer-controls">
          {showHint && (
            <button className="action-btn hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}>Hint</button>
          )}
          <button className="action-btn check-btn" onClick={handleCheckAnswer}>Check Answer</button>
        </div>
      </div>

      {/* Success Modal */}
      {modalState.type === 'success' && (
        <Modal
          isOpen={modalState.isOpen}
          type="success"
          title={modalState.title}
          onClose={handleNext}
          actions={
            <button className="action-btn" onClick={handleNext} style={{ width: '100%', background: 'linear-gradient(145deg, #4caf50, #388e3c)', color: 'white', border: 'none' }}>
              Continue
            </button>
          }
        >
          <p>{modalState.message}</p>
        </Modal>
      )}

      {/* Error Modal */}
      {modalState.type === 'error' && (
        <Modal
          isOpen={modalState.isOpen}
          type="error"
          title={modalState.title}
          onClose={handleRetry}
          actions={
            <button className="action-btn" onClick={handleRetry} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white', border: 'none' }}>
              Got It! I'll Try Again
            </button>
          }
        >
          <p>{modalState.message}</p>
          {modalState.question && (
            <>
              <div className="a3-error-remember">
                <div className="a3-error-remember-header">
                  <span>🤔✏️</span>
                  <span className="a3-error-remember-badge">Remember:</span>
                </div>
                <p>{modalState.question.rememberText}</p>
              </div>
              <div className="a3-error-fixit">
                <span className="a3-error-fixit-badge">Let's Fix It:</span>
                <p>{modalState.question.fixItText}</p>
              </div>
              <p className="a3-error-footer-text">Try again and write your new number sentence!</p>
            </>
          )}
        </Modal>
      )}

      {/* Hint Modal */}
      <Modal
        isOpen={hintModalOpen}
        type="info"
        title="Hint"
        onClose={() => { playSound.click(); setHintModalOpen(false); }}
        actions={
          <button className="action-btn" onClick={() => { playSound.click(); setHintModalOpen(false); }} style={{ width: '100%', background: 'linear-gradient(145deg, #4facfe, #00f2fe)', color: 'white', border: 'none' }}>
            Got it!
          </button>
        }
      >
        <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#1e293b' }}>
          {currentQ.hint || 'No hint available for this level.'}
        </p>
      </Modal>
    </div>
  );
};
