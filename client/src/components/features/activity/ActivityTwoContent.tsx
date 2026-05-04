import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../layout/TopBar';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import dogMarkerImg from '../../../assets/images/dog_marker.png';
import './ActivityTwoContent.css';
import '../guide/GuideContent.css';

// ── Question Data ──────────────────────────────────────────────
type Difficulty = 'easy' | 'moderate' | 'difficult';

interface Question {
  start: number;
  subtract: number;
  prompt: string;
}

const activity2Questions: Record<Difficulty, Question[]> = {
  easy: [
    { start: 10, subtract: 3, prompt: 'Place the dog at 10, then show 10 − 3.' },
    { start: 8, subtract: 2, prompt: 'Place the dog at 8, then show 8 − 2.' },
    { start: 12, subtract: 5, prompt: 'Place the dog at 12, then show 12 − 5.' },
    { start: 6, subtract: 4, prompt: 'Place the dog at 6, then show 6 − 4.' },
    { start: 14, subtract: 6, prompt: 'Place the dog at 14, then show 14 − 6.' }
  ],
  moderate: [
    { start: -4, subtract: 3, prompt: 'Start at -4, then subtract 3.' },
    { start: 5, subtract: -3, prompt: 'Start at 5, then subtract -3.' },
    { start: -6, subtract: -4, prompt: 'Start at -6, then subtract -4.' },
    { start: 7, subtract: -2, prompt: 'Start at 7, then subtract -2.' },
    { start: -3, subtract: 5, prompt: 'Start at -3, then subtract 5.' }
  ],
  difficult: [
    { start: -10, subtract: -5, prompt: 'Start at -10, then subtract -5.' },
    { start: -7, subtract: 6, prompt: 'Start at -7, then subtract 6.' },
    { start: 4, subtract: -9, prompt: 'Start at 4, then subtract -9.' },
    { start: -12, subtract: -3, prompt: 'Start at -12, then subtract -3.' },
    { start: 3, subtract: -7, prompt: 'Start at 3, then subtract -7.' }
  ]
};

const MIN = -15;
const MAX = 15;

// ── Helpers ────────────────────────────────────────────────────
function clamp(value: number) {
  return Math.max(MIN, Math.min(MAX, value));
}

function getPercent(value: number) {
  return ((clamp(value) - MIN) / (MAX - MIN)) * 100;
}

function formatNum(n: number) {
  return n < 0 ? `(${n})` : String(n);
}

// ── Component ──────────────────────────────────────────────────
export const ActivityTwoContent: React.FC = () => {
  const navigate = useNavigate();

  // Guided questions state
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [qIndex, setQIndex] = useState(0);

  // Number line state
  const [startValue, setStartValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [moveValue, setMoveValue] = useState(0);
  const [activeTickValue, setActiveTickValue] = useState<number | null>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const ticksRef = useRef<HTMLDivElement>(null);

  // Animation timeouts
  const timeoutsRef = useRef<number[]>([]);

  // Answer / Modal
  const [answer, setAnswer] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'info', title: '', message: '' });
  const [hintModalOpen, setHintModalOpen] = useState(false);

  // Free-play state removed
  const [hintText, setHintText] = useState('Drag the dog to the starting point. That becomes the minuend.');
  const [resultText, setResultText] = useState('');

  // Current question helper
  const currentQ = activity2Questions[difficulty][qIndex];
  const totalQuestions = activity2Questions[difficulty].length;
  const progressPercentage = ((qIndex + 1) / totalQuestions) * 100;

  // ── Clear timers ─────────────────────────────────────────────
  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // ── Load question ────────────────────────────────────────────
  const loadQuestion = useCallback(() => {
    clearTimers();
    const q = activity2Questions[difficulty][qIndex];
    setStartValue(q.start);
    setCurrentValue(q.start);
    setMoveValue(0);
    setActiveTickValue(q.start);
    setAnswer('');
    setHintText(`Target expression: ${q.start} − (${q.subtract}). Drag the dog to begin.`);
    setResultText('Place the dog on the minuend, then move to show the subtraction.');
  }, [difficulty, qIndex, clearTimers]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  // ── Position helpers ─────────────────────────────────────────
  const getValueFromPointer = useCallback((clientX: number) => {
    if (!ticksRef.current) return currentValue;
    const rect = ticksRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(rect.width, x));
    const rawPercent = x / rect.width;
    return clamp(Math.round(MIN + rawPercent * (MAX - MIN)));
  }, [currentValue]);

  // ── Drag handlers ────────────────────────────────────────────
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    clearTimers();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    // Set current position as the new start
    setStartValue(currentValue);
    setMoveValue(0);
    setHintText(`Minuend set to ${currentValue}. Drag slowly left or right.`);
  }, [currentValue, clearTimers]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const newVal = getValueFromPointer(e.clientX);
    setCurrentValue(newVal);
    setMoveValue(startValue - newVal);
    setActiveTickValue(newVal);
    setResultText(`Subtrahend modeled: ${startValue - newVal}`);
  }, [isDragging, getValueFromPointer, startValue]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const directionText = moveValue > 0 ? 'left to subtract a positive' : moveValue < 0 ? 'right to subtract a negative' : 'without moving';
    setHintText(`You moved ${directionText}. Equation: ${startValue} − (${moveValue}) = ${currentValue}.`);
  }, [isDragging, moveValue, startValue, currentValue]);

  // ── Tick click ───────────────────────────────────────────────
  const handleTickClick = useCallback((val: number) => {
    playSound.tick();
    clearTimers();
    setStartValue(val);
    setCurrentValue(val);
    setMoveValue(0);
    setActiveTickValue(val);
    setResultText(`Minuend set to ${val}.`);
    setHintText('Now move left or right to model the subtrahend.');
  }, [clearTimers]);

  // ── Step buttons ─────────────────────────────────────────────
  const handleStepLeft = useCallback(() => {
    playSound.pop();
    clearTimers();
    const newVal = clamp(currentValue - 1);
    setCurrentValue(newVal);
    setMoveValue(startValue - newVal);
    setActiveTickValue(newVal);
    setResultText(`Moved left by 1. Subtrahend is now ${startValue - newVal}.`);
    setHintText('Moving left makes the subtrahend more positive.');
  }, [currentValue, startValue, clearTimers]);

  const handleStepRight = useCallback(() => {
    playSound.pop();
    clearTimers();
    const newVal = clamp(currentValue + 1);
    setCurrentValue(newVal);
    setMoveValue(startValue - newVal);
    setActiveTickValue(newVal);
    setResultText(`Moved right by 1. Subtrahend is now ${startValue - newVal}.`);
    setHintText('Moving right makes the subtrahend more negative.');
  }, [currentValue, startValue, clearTimers]);

  // ── Reset ────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    playSound.pop();
    clearTimers();
    setStartValue(0);
    setCurrentValue(0);
    setMoveValue(0);
    setActiveTickValue(0);
    setResultText('Reset to 0.');
    setHintText('Drag the dog to set a new minuend.');
  }, [clearTimers]);



  // ── Check answer ─────────────────────────────────────────────
  const handleCheckAnswer = useCallback(() => {
    if (!answer.trim()) return;
    const correctAnswer = clamp(currentQ.start - currentQ.subtract);
    const userAnswer = Number(answer.trim());

    if (userAnswer === correctAnswer) {
      playSound.success();
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Correct!',
        message: `${currentQ.start} − (${currentQ.subtract}) = ${correctAnswer}`
      });
    } else {
      playSound.error();
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Incorrect',
        message: 'Check your movement on the number line and try again.'
      });
    }
  }, [answer, currentQ]);

  const handleModalNext = useCallback(() => {
    playSound.click();
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (qIndex < totalQuestions - 1) {
      setQIndex(prev => prev + 1);
    } else {
      alert(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level completed!`);
      navigate('/activity');
    }
  }, [qIndex, totalQuestions, difficulty, navigate]);

  const handleModalRetry = useCallback(() => {
    playSound.click();
    setModalState(prev => ({ ...prev, isOpen: false }));
    setAnswer('');
  }, []);





  // ── Cleanup on unmount ───────────────────────────────────────
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // ── Path highlight positions ─────────────────────────────────
  const startPercent = getPercent(startValue);
  const currentPercent = getPercent(currentValue);
  const pathLeft = Math.min(startPercent, currentPercent);
  const pathWidth = Math.abs(startPercent - currentPercent);

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="guide-page-container">
      {/* Header */}
      <header className="guide-header activity-one-header">
        <button className="neo-btn back-chip" onClick={() => { playSound.click(); navigate('/activity'); }}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill activity-one-title">Activity 2</h1>
        <TopBar />
      </header>

      {/* Progress Bar */}
      <div className="activity-progress-area">
        <div className="progress-text-row">
          <span className="item-count">Question {qIndex + 1} of {totalQuestions}</span>
          <span className="level-badge">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="a2-main-body">
        {/* Difficulty Pills */}
        <div className="difficulty-pills">
          <button
            className={`difficulty-pill pill-easy ${difficulty === 'easy' ? 'active' : ''}`}
            style={{ cursor: 'default' }}
          >Easy</button>
          <button
            className={`difficulty-pill pill-moderate ${difficulty === 'moderate' ? 'active' : ''}`}
            style={{ cursor: 'default' }}
          >Moderate</button>
          <button
            className={`difficulty-pill pill-difficult ${difficulty === 'difficult' ? 'active' : ''}`}
            style={{ cursor: 'default' }}
          >Difficult</button>
        </div>

        {/* Directions */}
        <div className="a2-directions-box">
          <p><strong>Directions:</strong> Drag the dog to choose the <strong>minuend</strong>. Then move left or right to model the <strong>subtrahend</strong>. Answer each item.</p>
        </div>

        {/* Question */}
        <div className="a2-question-box">
          <p>{currentQ.start} − ({currentQ.subtract}) =</p>
        </div>

        {/* Number Line Card */}
        <div className="a2-numberline-card">
          {/* Chips */}
          <div className="a2-chips-row">
            <div className="a2-result-chip">Result: {currentValue}</div>
            <div className="a2-expression-chip">{formatNum(startValue)} − {formatNum(moveValue)} = {currentValue}</div>
          </div>

          {/* Number Line */}
          <div
            className="a2-numberline-container"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Track */}
            <div className="a2-numberline-track"></div>

            {/* Path Highlight */}
            <div className="a2-path-highlight">
              {pathWidth > 0 && (
                <>
                  <div className="a2-path-bar" style={{ left: `${pathLeft}%`, width: `${Math.max(pathWidth, 0.25)}%` }}></div>
                  <div className="a2-path-cap" style={{ left: `${startPercent}%` }}></div>
                  <div className="a2-path-cap" style={{ left: `${currentPercent}%` }}></div>
                </>
              )}
            </div>

            {/* Ticks */}
            <div className="a2-ticks-container" ref={ticksRef}>
              {Array.from({ length: MAX - MIN + 1 }, (_, i) => {
                const val = MIN + i;
                const isActive = activeTickValue === val;
                const colorClass = val < 0 ? 'negative' : val > 0 ? 'positive' : 'zero';
                return (
                  <button
                    key={val}
                    className="a2-tick"
                    style={{ left: `${getPercent(val)}%` }}
                    onClick={() => handleTickClick(val)}
                    type="button"
                  >
                    <div className={`a2-tick-label ${colorClass} ${isActive ? 'active' : ''}`}>{val}</div>
                    <div className={`a2-tick-line ${val % 5 === 0 ? 'tall' : 'short'} ${val === 0 ? 'zero-line' : ''} ${isActive ? 'active' : ''}`}></div>
                    <div className={`a2-tick-dot ${colorClass === 'zero' ? 'zero-dot' : ''} ${colorClass} ${isActive ? 'active' : ''}`}></div>
                  </button>
                );
              })}
            </div>

            {/* Dog Marker */}
            <div
              className={`a2-marker ${isDragging ? 'dragging' : ''}`}
              style={{ left: `${getPercent(currentValue)}%` }}
              onPointerDown={handlePointerDown}
            >
              <img src={dogMarkerImg} alt="dog marker" draggable="false" />
            </div>
          </div>
          
          {difficulty === 'easy' && (
            <div className="a2-dynamic-prompts" style={{ marginTop: '20px', padding: '0 10px' }}>
              <p className="a2-hint-text">{hintText}</p>
              {resultText && <p className="a2-result-text">{resultText}</p>}
            </div>
          )}
        </div>

        {/* Answer Card */}
        <div className="a2-answer-card">
          <div className="a2-answer-row">
            <label className="a2-answer-label">Answer:</label>
            <input
              className="a2-answer-input"
              type="text"
              value={answer}
              onChange={(e) => { playSound.tick(); setAnswer(e.target.value); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCheckAnswer(); }}
              placeholder="Enter your answer"
            />
            <button className="action-btn check-btn" onClick={handleCheckAnswer}>Check Answer</button>
          </div>
        </div>

        {/* Controls Row */}
        <div className="a2-controls-row">
          <button className="action-btn a2-step-left-btn" onClick={handleStepLeft}>← Move Left</button>
          <button className="action-btn a2-step-right-btn" onClick={handleStepRight}>Move Right →</button>
          <button className="action-btn a2-reset-btn" onClick={handleReset}>Reset</button>
          {difficulty === 'easy' && (
            <button className="action-btn hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}>Hint</button>
          )}
        </div>


      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        onClose={() => modalState.type === 'error' ? handleModalRetry() : handleModalNext()}
        actions={
          modalState.type === 'success' ? (
            <button className="action-btn next-btn" onClick={handleModalNext} style={{ width: '100%', background: 'linear-gradient(145deg, var(--theme-primary), var(--theme-accent))', color: 'white' }}>
              Next Question
            </button>
          ) : (
            <button className="action-btn retry-btn" onClick={handleModalRetry} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white' }}>
              Retry
            </button>
          )
        }
      >
        <p>{modalState.message}</p>
      </Modal>

      {/* Hint Modal */}
      <Modal
        isOpen={hintModalOpen}
        type="info"
        title="Hint"
        onClose={() => { playSound.click(); setHintModalOpen(false); }}
        actions={
          <button
            className="action-btn"
            onClick={() => { playSound.click(); setHintModalOpen(false); }}
            style={{ width: '100%', background: '#00E5FF', color: 'white', border: 'none', fontWeight: 'bold', padding: '12px', borderRadius: '9999px', fontSize: '1rem' }}
          >
            Got it!
          </button>
        }
      >
        <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#1e293b' }}>
          {currentQ.prompt}
        </p>
      </Modal>
    </div>
  );
};
