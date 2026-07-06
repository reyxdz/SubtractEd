import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { markActivityComplete } from '../../../utils/activityProgress';
import { ResultsSummary } from './ResultsSummary';
import { ProgressLegend } from '../../common/ProgressLegend';
import { activity1Bank, activity1Hints, pickFiveWithHints, pickFiveDiffPairs, activity1DiffBank, type QPair, type HintPair, type DiffPair } from '../../../utils/questionBank';
import { saveSession, loadSession, clearSession, SESSION_KEYS } from '../../../utils/sessionState';
import './ActivityOneContent.css';

type Level = 'Easy' | 'Moderate' | 'Difficult';



interface ItemState {
  pair: (QPair & HintPair) | null;       // bank pair for E/M, null for D
  tryNum: 'first' | 'second';
}

type A1StoredAnswer = {
  answer: string;
  positiveCount: string;
  negativeCount: string;
  chips: { id: string; type: 'positive' | 'negative'; isCancelled: boolean }[];
};
interface SavedActivity1 {
  levelItems: { Easy: (QPair & HintPair)[]; Moderate: (QPair & HintPair)[]; Difficult: DiffPair[] };
  itemStates: ItemState[];
  qIndex: number;
  consecutiveStFails: number;
  itemResults: string[];
  storedAnswers: Record<number, A1StoredAnswer>;
  startTime: number;
}

// ── Component ─────────────────────────────────
export const ActivityOneContent: React.FC = () => {
  const navigate = useNavigate();

  // Restore any in-progress session (once).
  const savedRef = React.useRef<SavedActivity1 | null>(loadSession<SavedActivity1>(SESSION_KEYS.activity(1)));
  const saved = savedRef.current;

  // Level progression
  const [qIndex, setQIndex] = useState(saved?.qIndex ?? 0);
  const [levelItems, setLevelItems] = useState<{ Easy: (QPair & HintPair)[], Moderate: (QPair & HintPair)[], Difficult: DiffPair[] }>(saved?.levelItems ?? { Easy: [], Moderate: [], Difficult: [] });
  const [itemStates, setItemStates] = useState<ItemState[]>(saved?.itemStates ?? Array(15).fill({ pair: null, tryNum: 'first' }));
  const [consecutiveStFails, setConsecutiveStFails] = useState(saved?.consecutiveStFails ?? 0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [itemResults, setItemResults] = useState<string[]>(saved?.itemResults ?? Array(15).fill('unanswered'));
  const [storedAnswers, setStoredAnswers] = useState<Record<number, A1StoredAnswer>>(saved?.storedAnswers ?? {});

  // User input
  const [answer, setAnswer] = useState('');
  const [chips, setChips] = useState<{ id: string; type: 'positive' | 'negative'; isCancelled: boolean }[]>([]);
  const [positiveCount, setPositiveCount] = useState('');
  const [negativeCount, setNegativeCount] = useState('');

  // Modal
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: React.ReactNode;
    showNext: boolean;
  }>({ isOpen: false, type: 'info', title: '', message: '', showNext: false });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [videoRedirectModal, setVideoRedirectModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [startTime] = useState(saved ? new Date(saved.startTime) : new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);

  const level: Level = qIndex < 5 ? 'Easy' : qIndex < 10 ? 'Moderate' : 'Difficult';
  const levelOffset = qIndex < 5 ? 0 : qIndex < 10 ? 5 : 10;
  const localIndex = qIndex - levelOffset;
  const isDifficult = level === 'Difficult';

  const currentPair: (QPair & HintPair) | null = level === 'Difficult' ? null : (levelItems.Easy[localIndex] ?? levelItems.Moderate[localIndex] ?? null);
  const currentDifficult: DiffPair | undefined = level === 'Difficult' ? levelItems.Difficult[localIndex] : undefined;
  const currentItemState: ItemState = itemStates[qIndex] ?? { pair: null, tryNum: 'first' };

  // Initialize items on mount (skip if resuming a saved session)
  useEffect(() => {
    if (saved) return;
    setLevelItems({
      Easy: pickFiveWithHints(activity1Bank.easy, activity1Hints.easy),
      Moderate: pickFiveWithHints(activity1Bank.moderate, activity1Hints.moderate),
      Difficult: pickFiveDiffPairs(activity1DiffBank)
    });
  }, [saved]);

  // Persist in-progress session so students resume where they left off
  useEffect(() => {
    if (showSummary || levelItems.Easy.length === 0) return;
    saveSession<SavedActivity1>(SESSION_KEYS.activity(1), {
      levelItems,
      itemStates,
      qIndex,
      consecutiveStFails,
      itemResults,
      storedAnswers,
      startTime: startTime.getTime(),
    });
  }, [levelItems, itemStates, qIndex, consecutiveStFails, itemResults, storedAnswers, startTime, showSummary]);

  const clearInputs = useCallback(() => {
    setAnswer('');
    setChips([]);
    setPositiveCount('');
    setNegativeCount('');
    setShowingAnswer(false);
  }, []);

  const isReviewMode = !!(itemResults[qIndex] && itemResults[qIndex] !== 'unanswered');

  useEffect(() => {
    if (storedAnswers[qIndex]) {
      const stored = storedAnswers[qIndex];
      setAnswer(stored.answer);
      setPositiveCount(stored.positiveCount);
      setNegativeCount(stored.negativeCount);
      setChips(stored.chips);
    } else {
      clearInputs();
    }
  }, [qIndex, storedAnswers, clearInputs]);

  // Build display values
  const tryExpr = currentItemState.tryNum === 'first' ? currentPair?.ftExpr : currentPair?.stExpr;
  const tryAns = currentItemState.tryNum === 'first' ? currentPair?.ftAns : currentPair?.stAns;
  const tryHint = currentItemState.tryNum === 'first' ? currentPair?.ftHint : currentPair?.stHint;
  const tryDiffProb = currentItemState.tryNum === 'first' ? currentDifficult?.ftProb : currentDifficult?.stProb;
  const tryDiffAns = currentItemState.tryNum === 'first' ? currentDifficult?.ftAns : currentDifficult?.stAns;

  const currentProblem = isDifficult
    ? (tryDiffProb ?? '')
    : tryExpr != null ? `${tryExpr} = ?` : '';

  const currentSentence = isDifficult
    ? ''
    : tryExpr != null ? `${tryExpr} = ?` : '';

  const currentAnswer = isDifficult
    ? String(tryDiffAns ?? '')
    : String(tryAns ?? '');

  const currentHint = isDifficult ? '' : (tryHint ?? '');

  const showHint = !isDifficult && currentHint !== '';

  const goToNextItem = useCallback(() => {
    setShowingAnswer(false);
    const nextIdx = itemResults.findIndex(r => r === 'unanswered');
    if (nextIdx !== -1) {
      setQIndex(nextIdx);
    } else {
      setEndTime(new Date());
      setShowSummary(true);
    }
  }, [itemResults]);
  const handleShowHint = () => {
    playSound.pop();
    setHintModalOpen(true);
  };

  const handleCheckAnswer = () => {
    if (isReviewMode || !answer.trim()) return;
    const cleanAnswer = answer.trim().replace(/\s+/g, '').replace(/[−–]/g, '-');

    const storeUserAns = () => {
      setStoredAnswers(prev => ({
        ...prev,
        [qIndex]: { answer: answer.trim(), positiveCount, negativeCount, chips }
      }));
    };

    if (cleanAnswer === currentAnswer) {
      playSound.success();
      storeUserAns();
      const result = currentItemState.tryNum === 'first' ? 'correctFirst' : 'correctSecond';
      setItemResults(prev => {
        const next = [...prev];
        next[qIndex] = result;
        return next;
      });
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Correct!',
        message: 'Great job! You got the right answer.',
        showNext: true,
      });
    } else {
      if (currentItemState.tryNum === 'first') {
        // Switch to second try
        playSound.pop();
        setItemStates(prev => {
          const next = [...prev];
          if (next[qIndex]) {
            next[qIndex] = { ...next[qIndex], tryNum: 'second' };
          }
          return next;
        });
        setModalState({
          isOpen: true,
          type: 'info',
          title: 'Try Again!',
          message: 'That was your first attempt. Here is a similar question for your second try.',
          showNext: false,
        });
        clearInputs();
      } else {
        // Second try incorrect
        playSound.error();
        storeUserAns();
        setItemResults(prev => {
          const next = [...prev];
          next[qIndex] = 'wrong';
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
              The correct answer is <strong>{currentAnswer}</strong>. Let's move to the next question.
            </>
          ),
          showNext: true,
        });
      }
    }
  };

  const handleModalNext = () => {
    playSound.click();
    setModalState({ ...modalState, isOpen: false });
    if (showingAnswer || modalState.showNext) {
      goToNextItem();
    }
  };

  const handleModalRetry = () => {
    playSound.click();
    setModalState({ ...modalState, isOpen: false });
  };

  const handleVideoRedirect = () => {
    playSound.click();
    setVideoRedirectModal(false);
    setConsecutiveStFails(0);
    navigate('/activity/1/intro');
  };

  // ── Chip Manipulation ──
  const handleAddPositive = useCallback(() => {
    playSound.tick();
    setChips(prev => [...prev, { id: Math.random().toString(), type: 'positive', isCancelled: false }]);
  }, []);

  const handleAddNegative = useCallback(() => {
    playSound.tick();
    setChips(prev => [...prev, { id: Math.random().toString(), type: 'negative', isCancelled: false }]);
  }, []);

  const handleAddZeroPair = useCallback(() => {
    playSound.tick();
    const id = Math.random().toString();
    setChips(prev => [
      ...prev,
      { id: id + 'p', type: 'positive', isCancelled: false },
      { id: id + 'n', type: 'negative', isCancelled: false }
    ]);
  }, []);

  const handleDeletePositive = useCallback(() => {
    playSound.tick();
    setChips(prev => {
      const idx = prev.findLastIndex(c => c.type === 'positive');
      if (idx === -1) return prev;
      return prev.filter((_, i) => i !== idx);
    });
  }, []);

  const handleDeleteNegative = useCallback(() => {
    playSound.tick();
    setChips(prev => {
      const idx = prev.findLastIndex(c => c.type === 'negative');
      if (idx === -1) return prev;
      return prev.filter((_, i) => i !== idx);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    playSound.pop();
    setChips([]);
    setPositiveCount('');
    setNegativeCount('');
  }, []);

  const toggleChipCancellation = useCallback((id: string) => {
    if (isReviewMode) return;
    playSound.tick();
    setChips(prev => prev.map(c => c.id === id ? { ...c, isCancelled: !c.isCancelled } : c));
  }, [isReviewMode]);

  const handlePositiveCountChange = useCallback((val: string) => {
    setPositiveCount(val);
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0 || num > 50) return;
    setChips(prev => {
      const negatives = prev.filter(c => c.type === 'negative');
      const newPositives = Array.from({ length: num }, (_, i) => ({
        id: `pos-gen-${Date.now()}-${i}`,
        type: 'positive' as const,
        isCancelled: false
      }));
      return [...newPositives, ...negatives];
    });
  }, []);

  const handleNegativeCountChange = useCallback((val: string) => {
    setNegativeCount(val);
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0 || num > 50) return;
    setChips(prev => {
      const positives = prev.filter(c => c.type === 'positive');
      const newNegatives = Array.from({ length: num }, (_, i) => ({
        id: `neg-gen-${Date.now()}-${i}`,
        type: 'negative' as const,
        isCancelled: false
      }));
      return [...positives, ...newNegatives];
    });
  }, []);

  const posChips = chips.filter(c => c.type === 'positive');
  const negChips = chips.filter(c => c.type === 'negative');

  if (showSummary && endTime) {
    return (
      <ResultsSummary
        activityNum={1}
        itemResults={itemResults}
        startTime={startTime}
        endTime={endTime}
        onProceed={() => {
          markActivityComplete(1);
          clearSession(SESSION_KEYS.activity(1));
          navigate('/activity');
        }}
      />
    );
  }

  return (
    <div className="activity-one-wrapper" onClick={(e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.directions-box') || target.closest('.question-box') || target.closest('.equation-display')) {
        playSound.pop();
      }
    }}>
      <div className="sari-shell">
        <div className="sari-awning"></div>
        <div className="sari-content-inner">

          {/* Header */}
          <header className="activity-one-header">
            <button className="a1-back-btn" onClick={() => { playSound.click(); navigate('/activity'); }}>
              ← Back
            </button>
            <div className="a1-title-section">
              <div className="a1-title-pill">Activity 1</div>
              <div className="current-difficulty-text">{level}</div>
            </div>
            <div className="a1-header-spacer"></div>
          </header>

          {/* Progress Circles */}
          <div className="progress-circles-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="progress-circles">
              {Array.from({ length: 15 }, (_, i) => {
                const status = itemResults[i];
                const itemNum = i + 1;
                const isCurrent = i === qIndex;
                return (
                  <div 
                    key={i} 
                    className={`progress-circle ${status !== 'unanswered' ? status : ''} ${isCurrent ? 'current' : ''}`}
                    onClick={() => {
                      const firstUnanswered = itemResults.findIndex(r => r === 'unanswered');
                      if (status !== 'unanswered' || i === firstUnanswered) {
                        setQIndex(i);
                      }
                    }}
                    style={{ cursor: (status !== 'unanswered' || i === itemResults.findIndex(r => r === 'unanswered')) ? 'pointer' : 'default' }}
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

          <div className="activity-main-body">
            {/* Directions */}
            <div className="directions-box">
              <p><strong>Directions:</strong> {isDifficult ? 'Convert the sentence into a number sentence.' : 'Solve the math problem using the integer chips.'} Click the buttons to add chips to the Working Area. Enter your final answer in the box below.</p>
            </div>

            {/* Question Box (for Word Problems in Difficult Mode) */}
            {isDifficult && (
              <div className="question-box">
                <p>{currentProblem}</p>
              </div>
            )}

            {/* Equation Display */}
            {!isDifficult && (
              <div className="equation-display">
                <h2>{currentSentence}</h2>
              </div>
            )}

            {/* Game Area */}
            <div className="working-area-layout">
              <div className="side-tools">
                <button className="symbol-btn positive-btn" onClick={handleAddPositive}>
                  <span className="symbol-mark">+</span>
                  <span className="symbol-label">Positive</span>
                </button>
                <button className="symbol-btn zero-pair-btn" onClick={handleAddZeroPair}>
                  <span className="symbol-mark">+−</span>
                  <span className="symbol-label">Zero Pair</span>
                </button>
              </div>

              <div className="working-area-container">
                <span className="working-area-label">Working Area</span>

                <div className="working-area-half positive-half">
                  <span className="working-area-side-label">POSITIVE</span>
                  <div className="counter-input-wrap">
                    <input
                      type="number"
                      className="counter-input positive-counter"
                      value={positiveCount}
                      onChange={(e) => { if (!isReviewMode) handlePositiveCountChange(e.target.value); }}
                      placeholder={String(posChips.length)}
                      min="0"
                      max="50"
                      aria-label="Positive chip count"
                      readOnly={isReviewMode}
                    />
                  </div>
                  <div className="chips-container">
                    {posChips.map(chip => (
                      <div
                        key={chip.id}
                        className={`chip positive ${chip.isCancelled ? 'cancelled' : ''}`}
                        onClick={() => toggleChipCancellation(chip.id)}
                      >
                        +
                        {chip.isCancelled && <span className="cancel-x">×</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="working-area-half negative-half">
                  <span className="working-area-side-label">NEGATIVE</span>
                  <div className="counter-input-wrap">
                    <input
                      type="number"
                      className="counter-input negative-counter"
                      value={negativeCount}
                      onChange={(e) => { if (!isReviewMode) handleNegativeCountChange(e.target.value); }}
                      placeholder={String(negChips.length)}
                      min="0"
                      max="50"
                      aria-label="Negative chip count"
                      readOnly={isReviewMode}
                    />
                  </div>
                  <div className="chips-container">
                    {negChips.map(chip => (
                      <div
                        key={chip.id}
                        className={`chip negative ${chip.isCancelled ? 'cancelled' : ''}`}
                        onClick={() => toggleChipCancellation(chip.id)}
                      >
                        −
                        {chip.isCancelled && <span className="cancel-x">×</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="side-tools">
                <button className="symbol-btn negative-btn" onClick={handleAddNegative}>
                  <span className="symbol-mark">−</span>
                  <span className="symbol-label">Negative</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            {!isReviewMode && (
              <div className="action-buttons-row">
                <button className="nav-btn delete-pos-btn" onClick={handleDeletePositive}>Delete Positive</button>
                <button className="nav-btn delete-neg-btn" onClick={handleDeleteNegative}>Delete Negative</button>
                <button className="nav-btn clear-btn" onClick={handleClearAll}>Clear All</button>
              </div>
            )}

            {/* Input Controls */}
            <div className="input-controls-row">
              {showHint && <button className="input-btn hint-btn" onClick={handleShowHint}>Hint</button>}
              <div className="input-field-wrapper">
                <span className="input-label">Answer:</span>
                <input
                  type="text"
                  className="answer-input"
                  value={answer}
                  onChange={(e) => {
                    if (!isReviewMode) {
                      playSound.tick();
                      setAnswer(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder="Enter your answer here"
                  readOnly={isReviewMode}
                />
              </div>
              {isReviewMode ? (
                <button className="input-btn check-btn" onClick={() => {
                  playSound.click();
                  goToNextItem();
                }}>
                  Back to Current Question
                </button>
              ) : (
                <button className="input-btn check-btn" onClick={handleCheckAnswer}>Check Answer</button>
              )}
            </div>
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
            <button className="action-btn" onClick={handleModalNext} style={{ width: '100%', background: 'linear-gradient(145deg, var(--theme-primary), var(--theme-accent))', color: 'white' }}>
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
            <button className="action-btn" onClick={handleModalNext} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white' }}>
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
          {currentHint || 'Use the chips to model the expression. Cancel pairs to find the answer.'}
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
  );
};
