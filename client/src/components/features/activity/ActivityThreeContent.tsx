import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { activity3Questions } from './activity3Data';
import type { Difficulty, A3Question } from './activity3Data';
import storeBg from '../../../assets/images/activity3_bg.png';
import { isActivityUnlocked, markActivityComplete } from '../../../utils/activityProgress';
import './ActivityThreeContent.css';

// ── Helpers ────────────────────────────────────────────────────
function normalizeValue(s: string): string {
  return s.replace(/\s+/g, '').replace(/[()]/g, '').replace(/[−–]/g, '-').toLowerCase();
}

// ── Step Cards (Left Panel) ────────────────────────────────────
const StepCards: React.FC<{
  question: A3Question;
  difficulty: Difficulty;
  activeStep: number | null;
}> = ({ question, difficulty, activeStep }) => {
  const { minuend, subtrahend } = question;
  const showExamples = difficulty === 'easy';
  const flippedSign = -subtrahend;

  return (
    <div className="a3-steps-panel">
      <div className={`a3-step-card ${activeStep === 1 ? 'highlighted' : ''}`}>
        <div className="a3-step-num n1">1</div>
        <div className="a3-step-head keep">KEEP THE MINUEND!</div>
        <div className="a3-step-body">
          <div className="label">Keep the first number. Copy it.</div>
          {showExamples && (
            <div className="example">
              Keep: <span className="kept">{minuend}</span><br />
              <span className="kept">{minuend}</span> − ({subtrahend})
            </div>
          )}
        </div>
      </div>

      <div className={`a3-step-card ${activeStep === 2 ? 'highlighted' : ''}`}>
        <div className="a3-step-num n2">2</div>
        <div className="a3-step-head change-op">CHANGE THE OPERATION!</div>
        <div className="a3-step-body">
          <div className="label">Change the minus (−) to plus (+).</div>
          {showExamples && (
            <div className="example">
              Change: {minuend} <span className="orig">−</span> ({subtrahend})<br />
              {minuend} <span className="cop">+</span> ({subtrahend})
            </div>
          )}
        </div>
      </div>

      <div className={`a3-step-card ${activeStep === 3 ? 'highlighted' : ''}`}>
        <div className="a3-step-num n3">3</div>
        <div className="a3-step-head change-sign">CHANGE THE SIGN!</div>
        <div className="a3-step-body">
          <div className="label">Change {subtrahend} to {flippedSign}.</div>
          {showExamples && (
            <div className="example">
              {minuend} <span className="cop">+</span> <span className="orig">({subtrahend})</span><br />
              Change: {minuend} <span className="cop">+</span> <span className="csign">{flippedSign}</span>
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
  const [boxKeep, setBoxKeep] = useState('');
  const [boxOp, setBoxOp] = useState('');
  const [boxChange, setBoxChange] = useState('');
  const [boxAnswer, setBoxAnswer] = useState('');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'info', title: '', message: '' });
  const [hintModalOpen, setHintModalOpen] = useState(false);

  const keepRef = useRef<HTMLInputElement>(null);
  const opRef = useRef<HTMLInputElement>(null);
  const changeRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  const currentQ = activity3Questions[difficulty][qIndex];
  const total = activity3Questions[difficulty].length;
  const pct = ((qIndex + 1) / total) * 100;
  const showSteps = difficulty !== 'difficult';
  const showHint = difficulty !== 'difficult';
  const showNumberSentence = difficulty !== 'difficult';

  useEffect(() => {
    if (!isActivityUnlocked(3)) {
      navigate('/activity');
    }
  }, [navigate]);

  const clearInputs = useCallback(() => {
    setBoxKeep('');
    setBoxOp('');
    setBoxChange('');
    setBoxAnswer('');
    setActiveStep(null);
  }, []);

  const handleCheck = useCallback(() => {
    if (!boxKeep.trim() || !boxOp.trim() || !boxChange.trim() || !boxAnswer.trim()) return;

    const keepOk = normalizeValue(boxKeep) === normalizeValue(currentQ.expectedKeep);
    const opOk = normalizeValue(boxOp) === normalizeValue(currentQ.expectedOp);
    const changeOk = normalizeValue(boxChange) === normalizeValue(currentQ.expectedChange);

    const cleanAnswer = boxAnswer.replace(/\s+/g, '').replace(/[−–]/g, '-');
    const numAns = Number(cleanAnswer);
    const ansOk = numAns === currentQ.answer;

    if (keepOk && opOk && changeOk && ansOk) {
      playSound.success();
      setModalState({ isOpen: true, type: 'success', title: 'Great Job!', message: 'Your answer is correct!' });
    } else {
      playSound.error();
      setModalState({
        isOpen: true,
        type: 'error',
        title: currentQ.errorTitle,
        message: currentQ.errorMessage
      });
    }
  }, [boxKeep, boxOp, boxChange, boxAnswer, currentQ]);

  const handleNext = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    clearInputs();
    if (qIndex < total - 1) { setQIndex(i => i + 1); }
    else if (difficulty === 'easy') { setDifficulty('moderate'); setQIndex(0); }
    else if (difficulty === 'moderate') { setDifficulty('difficult'); setQIndex(0); }
    else { markActivityComplete(3); navigate('/activity'); }
  }, [qIndex, total, difficulty, navigate, clearInputs]);

  const handleRetry = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    clearInputs();
  }, [clearInputs]);

  // Handle focus on colored boxes to highlight steps
  const handleBoxFocus = useCallback((stepNum: number) => {
    setActiveStep(stepNum);
  }, []);

  const handleBoxBlur = useCallback(() => {
    setActiveStep(null);
  }, []);

  return (
    <div className="a3-page-container" style={{ '--a3-store-bg': `url(${storeBg})` } as React.CSSProperties}>
      <div className="a3-frame">
        {/* Header */}
        <div className="a3-header">
          <button className="a3-back-btn" onClick={() => { playSound.click(); navigate('/activity'); }}>
            ← Back
          </button>
          <div className="a3-title-pill">Activity 3</div>
        </div>

        {/* Progress */}
        <div className="a3-progress">
          <div className="a3-progress-text">
            <span>Item {qIndex + 1} of {total}</span>
          </div>
          <div className="a3-progress-bar">
            <div className="a3-progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="a3-difficulty-row">
          <button className={`a3-diff-pill pill-easy ${difficulty === 'easy' ? 'active' : ''}`} style={{ cursor: 'default' }}>Easy (1-5)</button>
          <button className={`a3-diff-pill pill-moderate ${difficulty === 'moderate' ? 'active' : ''}`} style={{ cursor: 'default' }}>Moderate (6-10)</button>
          <button className={`a3-diff-pill pill-difficult ${difficulty === 'difficult' ? 'active' : ''}`} style={{ cursor: 'default' }}>Difficult (11-15)</button>
        </div>

        {/* Directions */}
        <div className="a3-directions">
          <p>Use the <strong>KEEP-CHANGE-CHANGE</strong> rule to turn the subtraction sentence into an addition sentence. Follow the three steps, then write your new number sentence and answer.</p>
        </div>

        {/* Main Content Area — Steps (left) + Question (right) */}
        <div className={`a3-main-content ${showSteps ? 'with-steps' : 'no-steps'}`}>
          {/* Steps panel (Easy & Moderate) */}
          {showSteps && <StepCards question={currentQ} difficulty={difficulty} activeStep={activeStep} />}

          {/* Question + Number Sentence Card */}
          <div className="a3-question-card">
            <div className="a3-q-section">
              <div className="a3-q-badge">Question:</div>
              <p className="a3-q-text">{currentQ.question}</p>
            </div>
            {showNumberSentence && (
              <div className="a3-s-section">
                <div className="a3-s-badge">Number Sentence:</div>
                <div className="a3-s-display">{currentQ.sentence}</div>
              </div>
            )}
          </div>
        </div>

        {/* Colored Input Boxes */}
        <div className="a3-input-area">
          <div className="a3-sentence-boxes">
            <div className="a3-box-label-row">Write Your New Number Sentence:</div>
            <div className="a3-boxes-row">
              <div className="a3-color-box green-box">
                <input
                  ref={keepRef}
                  type="text"
                  value={boxKeep}
                  onChange={e => { playSound.tick(); setBoxKeep(e.target.value); }}
                  onFocus={() => handleBoxFocus(1)}
                  onBlur={handleBoxBlur}
                  placeholder=""
                  aria-label="Keep the minuend"
                />
              </div>
              <div className="a3-color-box blue-box">
                <input
                  ref={opRef}
                  type="text"
                  value={boxOp}
                  onChange={e => { playSound.tick(); setBoxOp(e.target.value); }}
                  onFocus={() => handleBoxFocus(2)}
                  onBlur={handleBoxBlur}
                  placeholder=""
                  aria-label="Change the operation"
                />
              </div>
              <div className="a3-color-box yellow-box">
                <input
                  ref={changeRef}
                  type="text"
                  value={boxChange}
                  onChange={e => { playSound.tick(); setBoxChange(e.target.value); }}
                  onFocus={() => handleBoxFocus(3)}
                  onBlur={handleBoxBlur}
                  placeholder=""
                  aria-label="Change the sign"
                />
              </div>

              <div className="a3-equals-sign">=</div>

              <div className="a3-answer-section">
                <div className="a3-answer-label">Answer:</div>
                <div className="a3-color-box red-box">
                  <input
                    ref={answerRef}
                    type="text"
                    value={boxAnswer}
                    onChange={e => { playSound.tick(); setBoxAnswer(e.target.value); }}
                    onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
                    onFocus={() => setActiveStep(null)}
                    placeholder=""
                    aria-label="Final answer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="a3-action-buttons">
            <button className="a3-check-btn" onClick={handleCheck}>Check Answer</button>
            {showHint && <button className="a3-hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}>💡 Hint</button>}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {modalState.type === 'success' && (
        <Modal isOpen={modalState.isOpen} type="success" title={modalState.title} onClose={handleNext}
          actions={<button className="action-btn" onClick={handleNext} style={{ width: '100%', background: 'linear-gradient(145deg, #4caf50, #388e3c)', color: 'white', border: 'none' }}>Continue</button>}>
          <p>{modalState.message}</p>
        </Modal>
      )}

      {/* Error Modal */}
      {modalState.type === 'error' && (
        <Modal isOpen={modalState.isOpen} type="error" title={modalState.title} onClose={handleRetry}
          actions={<button className="action-btn" onClick={handleRetry} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white', border: 'none' }}>Got It! I'll Try Again</button>}>
          <p>{modalState.message}</p>
        </Modal>
      )}

      {/* Hint Modal */}
      <Modal isOpen={hintModalOpen} type="info" title="Hint"
        onClose={() => { playSound.click(); setHintModalOpen(false); }}
        actions={<button className="action-btn" onClick={() => { playSound.click(); setHintModalOpen(false); }} style={{ width: '100%', background: '#00E5FF', color: 'white', border: 'none', fontWeight: 'bold', padding: '12px', borderRadius: '9999px', fontSize: '1rem' }}>Got it!</button>}>
        <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#1e293b' }}>
          {currentQ.hint || 'No hint available for this level.'}
        </p>
      </Modal>
    </div>
  );
};
