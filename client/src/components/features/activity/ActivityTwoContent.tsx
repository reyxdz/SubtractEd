import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { isActivityUnlocked, markActivityComplete } from '../../../utils/activityProgress';
import { ResultsSummary } from './ResultsSummary';
import { ProgressLegend } from '../../common/ProgressLegend';
import { activity2Bank, activity2Hints, pickFiveWithHints, pickFiveDiffPairs, activity2DiffBank, parseExpr, stripEquationRef, type QPair, type HintPair, type DiffPair } from '../../../utils/questionBank';
import { saveSession, loadSession, clearSession, SESSION_KEYS } from '../../../utils/sessionState';
import './ActivityTwoContent.css';
import '../guide/GuideContent.css';

// ── Question Data ──────────────────────────────
type Difficulty = 'easy' | 'moderate' | 'difficult';

type A2StoredAnswer = {
  answer: string;
  startValue: number;
  currentValue: number;
  moveValue: number;
  tryNum: 'first' | 'second';
};
interface SavedActivity2 {
  levelItems: { easy: (QPair & HintPair)[]; moderate: (QPair & HintPair)[]; difficult: DiffPair[] };
  tryNums: ('first' | 'second')[];
  qIndex: number;
  consecutiveStFails: number;
  itemResults: string[];
  storedAnswers: Record<number, A2StoredAnswer>;
  startTime: number;
}


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

  // Restore any in-progress session (once).
  const savedRef = useRef<SavedActivity2 | null>(loadSession<SavedActivity2>(SESSION_KEYS.activity(2)));
  const saved = savedRef.current;

  // Level progression
  const [qIndex, setQIndex] = useState(saved?.qIndex ?? 0);
  const [levelItems, setLevelItems] = useState<{ easy: (QPair & HintPair)[], moderate: (QPair & HintPair)[], difficult: DiffPair[] }>(saved?.levelItems ?? { easy: [], moderate: [], difficult: [] });
  const [tryNums, setTryNums] = useState<('first' | 'second')[]>(saved?.tryNums ?? Array(15).fill('first'));
  const [consecutiveStFails, setConsecutiveStFails] = useState(saved?.consecutiveStFails ?? 0);
  const [itemResults, setItemResults] = useState<string[]>(saved?.itemResults ?? Array(15).fill('unanswered'));
  const [storedAnswers, setStoredAnswers] = useState<Record<number, A2StoredAnswer>>(saved?.storedAnswers ?? {});

  const difficulty: Difficulty = qIndex < 5 ? 'easy' : qIndex < 10 ? 'moderate' : 'difficult';
  const levelOffset = qIndex < 5 ? 0 : qIndex < 10 ? 5 : 10;
  const localIndex = qIndex - levelOffset;
  const isDifficult = difficulty === 'difficult';

  // Current question resolved from items + try
  const currentQ = useMemo(() => {
    if (difficulty === 'difficult') return null;
    const pair = difficulty === 'easy' ? levelItems.easy[localIndex] : levelItems.moderate[localIndex];
    if (!pair) return null;
    const tryNum = tryNums[qIndex] ?? 'first';
    const exprStr = tryNum === 'first' ? pair.ftExpr : pair.stExpr;
    const parsed = parseExpr(exprStr);
    return { start: parsed.a, subtract: parsed.b, prompt: `Model ${exprStr} on the number line.` };
  }, [difficulty, levelItems, localIndex, tryNums, qIndex]);

  const currentDifficultPair = isDifficult ? (levelItems.difficult[localIndex] ?? null) : null;
  const currentDiffAns = currentDifficultPair
    ? (tryNums[qIndex] === 'first' ? currentDifficultPair.ftAns : currentDifficultPair.stAns)
    : 0;

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
  const [startTime] = useState(saved ? new Date(saved.startTime) : new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);

  const showHint = !isDifficult;
  const currentHint = (() => {
    if (isDifficult) return '';
    const pair = difficulty === 'easy' ? levelItems.easy[localIndex] : levelItems.moderate[localIndex];
    if (!pair) return '';
    const tryNum = tryNums[qIndex] ?? 'first';
    return tryNum === 'first' ? pair.ftHint : pair.stHint;
  })();
  const globalIdx = qIndex;
  const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  const isReviewMode = !!(itemResults[globalIdx] && itemResults[globalIdx] !== 'unanswered');

  // ── Clear timers ──
  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // ── Load question data (skip if resuming a saved session) ──
  useEffect(() => {
    if (saved) return;
    setLevelItems({
      easy: pickFiveWithHints(activity2Bank.easy, activity2Hints.easy),
      moderate: pickFiveWithHints(activity2Bank.moderate, activity2Hints.moderate),
      difficult: pickFiveDiffPairs(activity2DiffBank)
    });
  }, [saved]);

  // ── Persist in-progress session so students resume where they left off ──
  useEffect(() => {
    if (showSummary || levelItems.easy.length === 0) return;
    saveSession<SavedActivity2>(SESSION_KEYS.activity(2), {
      levelItems,
      tryNums,
      qIndex,
      consecutiveStFails,
      itemResults,
      storedAnswers,
      startTime: startTime.getTime(),
    });
  }, [levelItems, tryNums, qIndex, consecutiveStFails, itemResults, storedAnswers, startTime, showSummary]);

  const restoreState = useCallback(() => {
    if (storedAnswers[globalIdx]) {
      const stored = storedAnswers[globalIdx];
      setAnswer(stored.answer);
      setStartValue(stored.startValue);
      setCurrentValue(stored.currentValue);
      setMoveValue(stored.moveValue);
      setActiveTickValue(stored.currentValue);
    }
  }, [globalIdx, storedAnswers]);

  // ── Apply current question to number line ──
  useEffect(() => {
    if (isReviewMode) {
      restoreState();
      return;
    }
    if (currentQ) {
      clearTimers();
      setStartValue(currentQ.start);
      setCurrentValue(currentQ.start);
      setMoveValue(0);
      setActiveTickValue(currentQ.start);
      setAnswer('');
    }
  }, [currentQ, clearTimers, isReviewMode, restoreState]);

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
  }, [currentValue, clearTimers]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const newVal = getValueFromPointer(e.clientX);
    setCurrentValue(newVal);
    setMoveValue(startValue - newVal);
    setActiveTickValue(newVal);
  }, [isDragging, getValueFromPointer, startValue]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
  }, [isDragging, moveValue, startValue, currentValue]);

  // ── Tick click ──
  const handleTickClick = useCallback((val: number) => {
    playSound.tick();
    clearTimers();
    setStartValue(val);
    setCurrentValue(val);
    setMoveValue(0);
    setActiveTickValue(val);
  }, [clearTimers]);

  // ── Step buttons ──
  const handleStepLeft = useCallback(() => {
    playSound.pop();
    clearTimers();
    const newVal = clamp(currentValue - 1);
    setCurrentValue(newVal);
    setMoveValue(startValue - newVal);
    setActiveTickValue(newVal);
  }, [currentValue, startValue, clearTimers]);

  const handleStepRight = useCallback(() => {
    playSound.pop();
    clearTimers();
    const newVal = clamp(currentValue + 1);
    setCurrentValue(newVal);
    setMoveValue(startValue - newVal);
    setActiveTickValue(newVal);
  }, [currentValue, startValue, clearTimers]);

  // ── Reset ──
  const handleReset = useCallback(() => {
    playSound.pop();
    clearTimers();
    setStartValue(0);
    setCurrentValue(0);
    setMoveValue(0);
    setActiveTickValue(0);
  }, [clearTimers]);

  // ── Go to next item ──
  const goToNext = useCallback(() => {
    clearTimers();
    setShowingAnswer(false);
    const nextIdx = itemResults.findIndex(r => r === 'unanswered');
    if (nextIdx !== -1) {
      setQIndex(nextIdx);
    } else {
      setEndTime(new Date());
      setShowSummary(true);
    }
  }, [itemResults, clearTimers]);

  // ── Check answer ──
  const handleCheckAnswer = useCallback(() => {
    if (isReviewMode || !answer.trim()) return;
    // Difficult items use currentDifficultPair (currentQ is null there); others use currentQ.
    if (isDifficult ? !currentDifficultPair : !currentQ) return;
    const correctAnswer = isDifficult ? currentDiffAns : clamp(currentQ!.start - currentQ!.subtract);
    const userAnswer = Number(answer.trim());
    const tryNum = tryNums[qIndex] ?? 'first';

    const storeUserAns = () => {
      setStoredAnswers(prev => ({
        ...prev,
        [globalIdx]: { answer: answer.trim(), startValue, currentValue, moveValue, tryNum }
      }));
    };

    if (userAnswer === correctAnswer) {
      playSound.success();
      storeUserAns();
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
        message: isDifficult ? `Correct! The answer is ${correctAnswer}.` : `${currentQ!.start} - (${currentQ!.subtract}) = ${correctAnswer}`,
        showNext: true,
      });
    } else {
      if (tryNum === 'first') {
        playSound.pop();
        setTryNums(prev => {
          const next = [...prev];
          next[qIndex] = 'second';
          return next;
        });
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
        storeUserAns();
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
  }, [answer, currentQ, isDifficult, currentDifficultPair, currentDiffAns, tryNums, qIndex, consecutiveStFails, isReviewMode, startValue, currentValue, moveValue, globalIdx, playSound]);

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
          clearSession(SESSION_KEYS.activity(2));
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
                const isClickable = status !== 'unanswered' || i === itemResults.findIndex(r => r === 'unanswered');
                return (
                  <div 
                    key={i} 
                    className={`progress-circle ${status !== 'unanswered' ? status : ''} ${isCurrent ? 'current' : ''}`}
                    onClick={() => {
                      if (isClickable) {
                        playSound.tick();
                        setQIndex(i);
                      }
                    }}
                    style={{ cursor: isClickable ? 'pointer' : 'default' }}
                  >
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
            {/* Directions / Question Boxes */}
            <div className="a2-directions-box">
              <p><strong>Directions:</strong> {isDifficult ? 'Read the problem carefully and solve using the number line.' : 'Click any point on the number line to position the minuend, represented by the circle. Then, move left or right to model the subtrahend. Answer each item.'}</p>
            </div>

            {/* Question */}
            <div className="a2-question-box">
              {isDifficult ? (
                <p>{currentDifficultPair ? stripEquationRef(tryNums[qIndex] === 'first' ? currentDifficultPair.ftProb : currentDifficultPair.stProb) : ''}</p>
              ) : (
                <p>{currentQ ? `${currentQ.start} - (${currentQ.subtract}) =` : ''}</p>
              )}
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
                    onPointerDown={isReviewMode ? undefined : handlePointerDown}
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
                        onClick={() => { if (!isReviewMode) handleTickClick(val); }}
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


            </div>

            {/* Controls Row */}
            {!isReviewMode && (
              <div className="a2-controls-row">
                <button className="action-btn a2-step-left-btn" onClick={handleStepLeft}>← Move Left</button>
                <button className="action-btn a2-step-right-btn" onClick={handleStepRight}>Move Right →</button>
                <button className="action-btn a2-reset-btn" onClick={handleReset}>Reset</button>
                {showHint && (
                  <button className="action-btn hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}>Hint</button>
                )}
              </div>
            )}

            {/* Answer Card */}
            <div className="a2-answer-card">
              <div className="a2-answer-row">
                <label className="a2-answer-label">Answer:</label>
                <input
                  className="a2-answer-input"
                  type="text"
                  value={answer}
                  onChange={(e) => { 
                    if (!isReviewMode) {
                      playSound.tick(); 
                      setAnswer(e.target.value); 
                    }
                  }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCheckAnswer(); }}
                  placeholder="Enter your answer"
                  readOnly={isReviewMode}
                />
                {isReviewMode ? (
                  <button className="action-btn check-btn" onClick={() => {
                    playSound.click();
                    goToNext();
                  }}>
                    Back to Current Question
                  </button>
                ) : (
                  <button className="action-btn check-btn" onClick={handleCheckAnswer}>Check Answer</button>
                )}
              </div>
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
              {currentHint || currentQ?.prompt || 'Use the number line to model the expression.'}
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
