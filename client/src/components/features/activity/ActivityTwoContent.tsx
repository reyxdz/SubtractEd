import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { isActivityUnlocked, markActivityComplete } from '../../../utils/activityProgress';
import { ResultsSummary } from './ResultsSummary';
import { ProgressLegend } from '../../common/ProgressLegend';
import { activity2Bank, pickFivePairs, parseExpr, type QPair } from '../../../utils/questionBank';
import './ActivityTwoContent.css';
import '../guide/GuideContent.css';

// ── Question Data ──────────────────────────────
type Difficulty = 'easy' | 'moderate' | 'difficult';

interface Question {
  start: number;
  subtract: number;
  prompt: string;
}

const DIFFICULT_QUESTIONS: Question[] = [
  { start: -10, subtract: -5, prompt: 'Start at -10, then subtract -5.' },
  { start: -7, subtract: 6, prompt: 'Start at -7, then subtract 6.' },
  { start: 4, subtract: -9, prompt: 'Start at 4, then subtract -9.' },
  { start: -12, subtract: -3, prompt: 'Start at -12, then subtract -3.' },
  { start: 3, subtract: -7, prompt: 'Start at 3, then subtract -7.' }
];

const MIN = -15;
const MAX = 15;

function clamp(value: number) {
  return Math.max(MIN, Math.min(MAX, value));
}

function getPercent(value: number) {
  return ((clamp(value) - MIN) / (MAX - MIN)) * 100;
}

// ── Component ──────────────────────────────────
export const ActivityTwoContent: React.FC = () => {
  const navigate = useNavigate();

  // Level progression
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [items, setItems] = useState<QPair[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [tryNum, setTryNum] = useState<'first' | 'second'>('first');
  const [consecutiveStFails, setConsecutiveStFails] = useState(0);
  const [itemResults, setItemResults] = useState<string[]>(Array(15).fill('unanswered'));

  // Current question resolved from items + try
  const currentQ = useMemo(
    () => getCurrentQuestion(difficulty, items, qIndex, tryNum),
    [difficulty, items, qIndex, tryNum]
  );

  // Number line state
  const [startValue, setStartValue] = useState(currentQ?.start ?? 0);
  const [currentValue, setCurrentValue] = useState(currentQ?.start ?? 0);
  const [moveValue, setMoveValue] = useState(0);
  const [activeTickValue, setActiveTickValue] = useState<number | null>(currentQ?.start ?? 0);

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
    message: React.ReactNode;
    showNext: boolean;
  }>({ isOpen: false, type: 'info', title: '', message: '', showNext: false });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [videoRedirectModal, setVideoRedirectModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [hintText, setHintText] = useState('');
  const [resultText, setResultText] = useState('');

  const totalQuestions = 5;
  const isDifficult = difficulty === 'difficult';
  const showHint = !isDifficult;
  const levelOffset = difficulty === 'easy' ? 0 : difficulty === 'moderate' ? 5 : 10;
  const globalIdx = levelOffset + qIndex;
  const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  // ── Clear timers ──
  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // ── Load question data ──
  useEffect(() => {
    if (difficulty === 'difficult') {
      setItems([]);
    } else {
      const bank = difficulty === 'easy' ? activity2Bank.easy : activity2Bank.moderate;
      setItems(pickFivePairs(bank));
    }
    setQIndex(0);
    setTryNum('first');
    setConsecutiveStFails(0);
    setShowingAnswer(false);
    setAnswer('');
  }, [difficulty]);

  // ── Apply current question to number line ──
  useEffect(() => {
    if (currentQ) {
      clearTimers();
      setStartValue(currentQ.start);
      setCurrentValue(currentQ.start);
      setMoveValue(0);
      setActiveTickValue(currentQ.start);
      setAnswer('');
      setHintText(`Target: ${currentQ.start} − (${currentQ.subtract}). Relocate the circle to begin.`);
      setResultText('Place the circle on the minuend, then move to show the subtraction.');
    }
  }, [currentQ, clearTimers]);

  // ── Guard ──
  useEffect(() => {
    if (!isActivityUnlocked(2)) {
      navigate('/activity');
    }
  }, [navigate]);

  // ── Position helpers ──
  const getValueFromPointer = useCallback((clientX: number) => {
    if (!ticksRef.current) return currentValue;
    const rect = ticksRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(rect.width, x));
    const rawPercent = x / rect.width;
    return clamp(Math.round(MIN + rawPercent * (MAX - MIN)));
  }, [currentValue]);

  // ── Drag handlers ──
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    clearTimers();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
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

  // ── Tick click ──
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

  // ── Step buttons ──
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

  // ── Reset ──
  const handleReset = useCallback(() => {
    playSound.pop();
    clearTimers();
    setStartValue(0);
    setCurrentValue(0);
    setMoveValue(0);
    setActiveTickValue(0);
    setResultText('Reset to 0.');
    setHintText('Relocate the circle to set a new minuend.');
  }, [clearTimers]);

  // ── Go to next item ──
  const goToNext = useCallback(() => {
    clearTimers();
    setAnswer('');
    setShowingAnswer(false);
    setTryNum('first');
    if (qIndex < totalQuestions - 1) {
      setQIndex(prev => prev + 1);
    } else if (difficulty === 'easy') {
      setDifficulty('moderate');
      setQIndex(0);
    } else if (difficulty === 'moderate') {
      setDifficulty('difficult');
      setQIndex(0);
    } else {
      setEndTime(new Date());
      setShowSummary(true);
    }
  }, [qIndex, totalQuestions, difficulty, navigate, clearTimers]);

  // ── Check answer ──
  const handleCheckAnswer = useCallback(() => {
    if (!answer.trim() || !currentQ) return;
    const correctAnswer = clamp(currentQ.start - currentQ.subtract);
    const userAnswer = Number(answer.trim());

    if (userAnswer === correctAnswer) {
      playSound.success();
      const result = tryNum === 'first' ? 'correctFirst' : 'correctSecond';
      setItemResults(prev => {
        const next = [...prev];
        next[globalIdx] = result;
        return next;
      });
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Correct!',
        message: `${currentQ.start} − (${currentQ.subtract}) = ${correctAnswer}`,
        showNext: true,
      });
    } else {
      if (tryNum === 'first') {
        playSound.pop();
        setTryNum('second');
        setModalState({
          isOpen: true,
          type: 'info',
          title: 'Try Again!',
          message: 'That was your first attempt. Here is a similar question for your second try.',
          showNext: false,
        });
        setAnswer('');
      } else {
        playSound.error();
        setItemResults(prev => {
          const next = [...prev];
          next[globalIdx] = 'wrong';
          return next;
        });
        const newFails = consecutiveStFails + 1;
        setConsecutiveStFails(newFails);

        if (newFails >= 3) {
          setVideoRedirectModal(true);
          setConsecutiveStFails(0);
          return;
        }

        setShowingAnswer(true);
        setModalState({
          isOpen: true,
          type: 'error',
          title: 'Incorrect',
          message: (
            <>
              The correct answer is <strong>{correctAnswer}</strong>. Let us move to the next question.
            </>
          ),
          showNext: true,
        });
      }
    }
  }, [answer, currentQ, tryNum, consecutiveStFails]);

  const handleModalNext = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    if (showingAnswer || modalState.showNext) {
      goToNext();
    }
  }, [goToNext, showingAnswer, modalState.showNext]);

  const handleModalRetry = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    setAnswer('');
  }, []);

  const handleVideoRedirect = useCallback(() => {
    playSound.click();
    setVideoRedirectModal(false);
    setConsecutiveStFails(0);
    navigate('/activity/2/intro');
  }, [navigate]);

  // ── Path highlight positions ──
  const startPercent = getPercent(startValue);
  const currentPercent = getPercent(currentValue);
  const pathLeft = Math.min(startPercent, currentPercent);
  const pathWidth = Math.abs(startPercent - currentPercent);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // ── Render ──
  if (showSummary && endTime) {
    return (
      <ResultsSummary
        activityNum={2}
        itemResults={itemResults}
        startTime={startTime}
        endTime={endTime}
        onProceed={() => {
          markActivityComplete(2);
          navigate('/activity');
        }}
      />
    );
  }

  return (
    <div className="activity-two-wrapper" onClick={(e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.a2-directions-box') || target.closest('.a2-question-box') || target.closest('.a2-numberline-card')) {
        playSound.pop();
      }
    }}>
      <div className="a2-shell">
        <div className="a2-awning"></div>
        <div className="a2-content-inner">

          {/* Header */}
          <header className="activity-two-header">
            <button className="a2-back-btn" onClick={() => { playSound.click(); navigate('/activity'); }}>
              ← Back
            </button>
            <div className="a2-title-section">
              <div className="a2-title-pill">Activity 2</div>
              <div className="current-difficulty-text">{difficultyLabel}</div>
            </div>
            <div className="a2-header-spacer"></div>
          </header>

          {/* Progress Circles */}
          <div className="progress-circles-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="progress-circles">
              {Array.from({ length: 15 }, (_, i) => {
                const status = itemResults[i];
                const itemNum = i + 1;
                const isCurrent = i === globalIdx;
                return (
                  <div key={i} className={`progress-circle ${status !== 'unanswered' ? status : ''} ${isCurrent ? 'current' : ''}`}>
                    {status === 'correctFirst' || status === 'correctSecond' ? (
                      <span className="circle-icon">&#10003;</span>
                    ) : status === 'wrong' ? (
                      <span className="circle-icon">&#10007;</span>
                    ) : (
                      <span className="circle-number">{itemNum}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <ProgressLegend />
          </div>

          <div className="a2-main-body">
            {/* Directions */}
            <div className="a2-directions-box">
              <p><strong>Directions:</strong> Click any point on the number line to position the minuend, represented by the circle. Then, move left or right to model the subtrahend. Answer each item.</p>
            </div>

            {/* Question */}
            <div className="a2-question-box">
              <p>{currentQ ? `${currentQ.start} − (${currentQ.subtract}) =` : ''}</p>
            </div>

            {/* Number Line Card */}
            <div className="a2-numberline-card">
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
                  {/* Circle Marker */}
                  <div
                    className={`a2-marker ${isDragging ? 'dragging' : ''}`}
                    style={{ left: `${getPercent(currentValue)}%` }}
                    onPointerDown={handlePointerDown}
                  ></div>

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
              </div>

              {difficulty === 'easy' && (
                <div className="a2-dynamic-prompts" style={{ marginTop: '10px', padding: '0 10px' }}>
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
              {showHint && (
                <button className="action-btn hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}>Hint</button>
              )}
            </div>
          </div>

          {/* Feedback Modal */}
          {modalState.type === 'success' && (
            <Modal
              isOpen={modalState.isOpen}
              type="success"
              title={modalState.title}
              onClose={handleModalNext}
              actions={
                <button className="action-btn next-btn" onClick={handleModalNext} style={{ width: '100%', background: 'linear-gradient(145deg, var(--theme-primary), var(--theme-accent))', color: 'white' }}>
                  Next Question
                </button>
              }
            >
              <p>{modalState.message}</p>
            </Modal>
          )}

          {modalState.type === 'error' && (
            <Modal
              isOpen={modalState.isOpen}
              type="error"
              title={modalState.title}
              onClose={handleModalNext}
              actions={
                <button className="action-btn retry-btn" onClick={handleModalNext} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white' }}>
                  Next Question
                </button>
              }
            >
              <p>{modalState.message}</p>
            </Modal>
          )}

          {modalState.type === 'info' && (
            <Modal
              isOpen={modalState.isOpen}
              type="info"
              title={modalState.title}
              onClose={handleModalRetry}
              actions={
                <button className="action-btn" onClick={handleModalRetry} style={{ width: '100%', background: 'linear-gradient(145deg, #ffb74d, #ff9800)', color: 'white' }}>
                  Got it!
                </button>
              }
            >
              <p>{modalState.message}</p>
            </Modal>
          )}

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
              {currentQ?.prompt || 'Use the number line to model the expression.'}
            </p>
          </Modal>

          {/* Video Redirect Modal */}
          <Modal
            isOpen={videoRedirectModal}
            type="info"
            title="Time to Review!"
            onClose={handleVideoRedirect}
            actions={
              <button
                className="action-btn"
                onClick={handleVideoRedirect}
                style={{ width: '100%', background: 'linear-gradient(145deg, #6a1b9a, #4a148c)', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '9999px', fontSize: '1rem' }}
              >
                Watch Video Tutorial
              </button>
            }
          >
            <p style={{ fontSize: '1.1rem', fontWeight: '500', color: '#1e293b' }}>
              It looks like you are having trouble. Let us review the video tutorial before continuing!
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

// ── Helper: resolve question from bank + try ──
function getCurrentQuestion(
  difficulty: Difficulty,
  items: QPair[],
  qIndex: number,
  tryNum: 'first' | 'second'
): Question | null {
  if (difficulty === 'difficult') {
    return DIFFICULT_QUESTIONS[qIndex] ?? null;
  }

  const pair = items[qIndex];
  if (!pair) return null;

  const exprStr = tryNum === 'first' ? pair.ftExpr : pair.stExpr;
  const parsed = parseExpr(exprStr);

  return {
    start: parsed.a,
    subtract: parsed.b,
    prompt: `Model ${exprStr} on the number line.`,
  };
}
