import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { activity3Questions } from './activity3Data';
import type { Difficulty, A3Question } from './activity3Data';
import storeBg from '../../../assets/images/activity3_bg.png';
import './ActivityThreeContent.css';

// ── Helpers ────────────────────────────────────────────────────
function normalizeSentence(s: string): string {
  return s.replace(/\s+/g, '').replace(/[()]/g, '').replace(/−/g, '-').replace(/–/g, '-').toLowerCase();
}

function checkSentence(userInput: string, canonical: string): boolean {
  return normalizeSentence(userInput) === normalizeSentence(canonical);
}

// ── Scaffolding Steps ──────────────────────────────────────────
const StepCards: React.FC<{ question: A3Question; difficulty: Difficulty }> = ({ question, difficulty }) => {
  const { minuend, subtrahend } = question;
  const showExamples = difficulty === 'easy';
  const flippedSign = -subtrahend;

  return (
    <div className="a3-steps">
      <div className="a3-step">
        <div className="a3-step-num n1">1</div>
        <div className="a3-step-head keep">KEEP the Minuend!</div>
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

      <div className="a3-arrow">→</div>

      <div className="a3-step">
        <div className="a3-step-num n2">2</div>
        <div className="a3-step-head change-op">CHANGE the Operation!</div>
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

      <div className="a3-arrow">→</div>

      <div className="a3-step">
        <div className="a3-step-num n3">3</div>
        <div className="a3-step-head change-sign">CHANGE the Sign!</div>
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
  const total = activity3Questions[difficulty].length;
  const pct = ((qIndex + 1) / total) * 100;
  const showSteps = difficulty !== 'difficult';
  const showHint = difficulty !== 'difficult';

  useEffect(() => { setNewSentence(''); setAnswer(''); }, [difficulty, qIndex]);

  const handleCheck = useCallback(() => {
    if (!answer.trim()) return;
    const numAns = Number(answer.trim());
    const sentOk = checkSentence(newSentence, currentQ.newSentence);
    const ansOk = numAns === currentQ.answer;

    if (sentOk && ansOk) {
      playSound.success();
      setModalState({ isOpen: true, type: 'success', title: 'Great Job!', message: 'Your answer is correct!' });
    } else {
      playSound.error();
      setModalState({ isOpen: true, type: 'error', title: currentQ.errorTitle, message: currentQ.errorMessage, question: currentQ });
    }
  }, [answer, newSentence, currentQ]);

  const handleNext = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    if (qIndex < total - 1) { setQIndex(i => i + 1); }
    else if (difficulty === 'easy') { setDifficulty('moderate'); setQIndex(0); }
    else if (difficulty === 'moderate') { setDifficulty('difficult'); setQIndex(0); }
    else { navigate('/activity'); }
  }, [qIndex, total, difficulty, navigate]);

  const handleRetry = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    setAnswer(''); setNewSentence('');
  }, []);

  const handleDiff = useCallback((l: Difficulty) => {
    playSound.click(); setDifficulty(l); setQIndex(0);
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
          <button className={`a3-diff-pill pill-easy ${difficulty === 'easy' ? 'active' : ''}`} onClick={() => handleDiff('easy')}>Easy (1-5)</button>
          <button className={`a3-diff-pill pill-moderate ${difficulty === 'moderate' ? 'active' : ''}`} onClick={() => handleDiff('moderate')}>Moderate (6-10)</button>
          <button className={`a3-diff-pill pill-difficult ${difficulty === 'difficult' ? 'active' : ''}`} onClick={() => handleDiff('difficult')}>Difficult (11-15)</button>
        </div>

        {/* Directions */}
        <div className="a3-directions">
          <p>Use the <strong>KEEP-CHANGE-CHANGE</strong> rule to turn the subtraction sentence into an addition sentence. Follow the three steps, then write your new number sentence and answer.</p>
        </div>

        {/* Question + Sentence */}
        <div className="a3-question-card">
          <div className="a3-q-section">
            <div className="a3-q-badge">Question:</div>
            <p className="a3-q-text">{currentQ.question}</p>
          </div>
          <div className="a3-s-section">
            <div className="a3-s-badge">Number Sentence:</div>
            <div className="a3-s-display">{currentQ.sentence}</div>
          </div>
        </div>

        {/* Steps (Easy & Moderate) */}
        {showSteps && <StepCards question={currentQ} difficulty={difficulty} />}

        {/* Inputs */}
        <div className="a3-bottom">
          <div className="a3-sentence-box">
            <div className="a3-box-label">Write Your New Number Sentence:</div>
            <input className="a3-txt-input" type="text" value={newSentence}
              onChange={e => { playSound.tick(); setNewSentence(e.target.value); }}
              placeholder="e.g. 10 + (-3)" />
          </div>
          <div className="a3-answer-box">
            <div className="a3-box-label">Answer:</div>
            <input className="a3-num-input" type="text" value={answer}
              onChange={e => { playSound.tick(); setAnswer(e.target.value); }}
              onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
              placeholder="Enter your answer here" />
          </div>
        </div>

        {/* Footer */}
        <div className="a3-footer">
          {showHint && <button className="a3-hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}>💡 Hint</button>}
          <button className="a3-check-btn" onClick={handleCheck}>Check Answer</button>
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
          {modalState.question && (
            <>
              <div className="a3-remember">
                <div className="a3-remember-head">
                  <span>🤔✏️</span>
                  <span className="a3-remember-badge">Remember:</span>
                </div>
                <p>{modalState.question.rememberText}</p>
              </div>
              <div className="a3-fixit">
                <span className="a3-fixit-badge">Let's Fix It:</span>
                <p>{modalState.question.fixItText}</p>
              </div>
              <p className="a3-error-footer">Try again and write your new number sentence!</p>
            </>
          )}
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
