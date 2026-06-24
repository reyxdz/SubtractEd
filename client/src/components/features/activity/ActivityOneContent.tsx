import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { markActivityComplete } from '../../../utils/activityProgress';
import { activity1Bank, pickFivePairs, type QPair } from '../../../utils/questionBank';
import './ActivityOneContent.css';

// ── Difficult-level static questions (word problems) ──
interface DifficultItem {
  problem: string;
  sentence: string;
  answer: string;
  hint: string;
}

const difficultItems: DifficultItem[] = [
  { problem: 'You have 6 pesos, but you need to pay a debt of -14 pesos (subtracting a negative). What is your total value now?', sentence: '6 − (−14) = ?', answer: '20', hint: '' },
  { problem: 'It is 10°C in Baguio. The temperature "drops" by 18 degrees. What is the new temperature?', sentence: '10 − 18 = ?', answer: '-8', hint: '' },
  { problem: 'You owe the store 5 pesos (−5). You then buy a snack worth 12 pesos on credit. What is your total debt?', sentence: '−5 − 12 = ?', answer: '-17', hint: '' },
  { problem: 'A fish is swimming at −3 meters. It dives down another 15 meters. What is its new depth?', sentence: '−3 − 15 = ?', answer: '-18', hint: '' },
  { problem: 'A student has a score of −8 in a game. They get another 12 points deducted for a mistake. What is the final score?', sentence: '−8 − 12 = ?', answer: '-20', hint: '' },
];

type Level = 'Easy' | 'Moderate' | 'Difficult';

const LEVEL_ORDER: Level[] = ['Easy', 'Moderate', 'Difficult'];

interface ItemState {
  pair: QPair | null;       // bank pair for E/M, null for D
  tryNum: 'first' | 'second';
}

// ── Component ─────────────────────────────────
export const ActivityOneContent: React.FC = () => {
  const navigate = useNavigate();

  // Level progression
  const [level, setLevel] = useState<Level>('Easy');
  const [items, setItems] = useState<QPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemStates, setItemStates] = useState<ItemState[]>([]);
  const [consecutiveStFails, setConsecutiveStFails] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [itemResults, setItemResults] = useState<string[]>(Array(15).fill('unanswered'));

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
    message: string;
    showNext: boolean;
  }>({ isOpen: false, type: 'info', title: '', message: '', showNext: false });
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [videoRedirectModal, setVideoRedirectModal] = useState(false);

  // Initialize items when level changes
  useEffect(() => {
    if (level === 'Difficult') {
      setItems([]);
      setItemStates(difficultItems.map(() => ({ pair: null, tryNum: 'first' })));
    } else {
      const bank = level === 'Easy' ? activity1Bank.easy : activity1Bank.moderate;
      const picked = pickFivePairs(bank);
      setItems(picked);
      setItemStates(picked.map(() => ({ pair: null, tryNum: 'first' })));
    }
    setCurrentIndex(0);
    setConsecutiveStFails(0);
    setShowingAnswer(false);
    resetInputs();
  }, [level]);

  const currentPair: QPair | null = items[currentIndex] ?? null;
  const currentDifficult: DifficultItem | undefined = level === 'Difficult' ? difficultItems[currentIndex] : undefined;
  const currentItemState: ItemState = itemStates[currentIndex] ?? { pair: null, tryNum: 'first' };
  const isDifficult = level === 'Difficult';

  const totalItems = level === 'Difficult' ? difficultItems.length : items.length;
  const levelOffset = LEVEL_ORDER.indexOf(level) * 5;
  const globalIdx = levelOffset + currentIndex;

  // Build display values
  const currentProblem = (() => {
    if (isDifficult && currentDifficult) return currentDifficult.problem;
    if (currentPair) {
      const expr = currentItemState.tryNum === 'first' ? currentPair.ftExpr : currentPair.stExpr;
      return `${expr} = ?`;
    }
    return '';
  })();

  const currentSentence = (() => {
    if (isDifficult && currentDifficult) return currentDifficult.sentence;
    if (currentPair) {
      const expr = currentItemState.tryNum === 'first' ? currentPair.ftExpr : currentPair.stExpr;
      return `${expr} = ?`;
    }
    return '';
  })();

  const currentAnswer = (() => {
    if (isDifficult && currentDifficult) return currentDifficult.answer;
    if (currentPair) {
      const ans = currentItemState.tryNum === 'first' ? currentPair.ftAns : currentPair.stAns;
      return String(ans);
    }
    return '';
  })();

  const currentHint = (() => {
    if (isDifficult && currentDifficult) return currentDifficult.hint;
    return '';
  })();

  const showHint = !isDifficult || currentHint !== '';

  function resetInputs() {
    setAnswer('');
    setChips([]);
    setPositiveCount('');
    setNegativeCount('');
    setShowingAnswer(false);
  }

  const goToNextItem = useCallback(() => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(prev => prev + 1);
      resetInputs();
    } else {
      // Level complete
      const levelIdx = LEVEL_ORDER.indexOf(level);
      if (levelIdx < LEVEL_ORDER.length - 1) {
        setLevel(LEVEL_ORDER[levelIdx + 1]);
      } else {
        markActivityComplete(1);
        navigate('/activity');
      }
    }
  }, [currentIndex, totalItems, level, navigate]);

  const handleShowHint = () => {
    playSound.pop();
    setHintModalOpen(true);
  };

  const handleCheckAnswer = () => {
    if (!answer.trim()) return;
    const cleanAnswer = answer.trim().replace(/\s+/g, '').replace(/[−–]/g, '-');

    if (cleanAnswer === currentAnswer) {
      playSound.success();
      const result = currentItemState.tryNum === 'first' ? 'correctFirst' : 'correctSecond';
      setItemResults(prev => {
        const next = [...prev];
        next[globalIdx] = result;
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
          if (next[currentIndex]) {
            next[currentIndex] = { ...next[currentIndex], tryNum: 'second' };
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
        setAnswer('');
      } else {
        // Second try incorrect
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
          message: `The correct answer is ${currentAnswer}. Let's move to the next question.`,
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
    playSound.tick();
    setChips(prev => prev.map(c => c.id === id ? { ...c, isCancelled: !c.isCancelled } : c));
  }, []);

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
          <div className="progress-circles-container">
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
          </div>

          <div className="activity-main-body">
            {/* Directions */}
            <div className="directions-box">
              <p>Directions: {isDifficult ? 'Convert the sentence into a number sentence.' : 'Solve the expression using the chips below.'} Use the buttons to form your expression, then enter the correct answer in the answer box.</p>
            </div>

            {/* Question Box */}
            <div className="question-box">
              <p>{currentProblem}</p>
            </div>

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
                      onChange={(e) => handlePositiveCountChange(e.target.value)}
                      placeholder={String(posChips.length)}
                      min="0"
                      max="50"
                      aria-label="Positive chip count"
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
                      onChange={(e) => handleNegativeCountChange(e.target.value)}
                      placeholder={String(negChips.length)}
                      min="0"
                      max="50"
                      aria-label="Negative chip count"
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
            <div className="action-buttons-row">
              <button className="nav-btn delete-pos-btn" onClick={handleDeletePositive}>Delete Positive</button>
              <button className="nav-btn delete-neg-btn" onClick={handleDeleteNegative}>Delete Negative</button>
              <button className="nav-btn clear-btn" onClick={handleClearAll}>Clear All</button>
            </div>

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
                    playSound.tick();
                    setAnswer(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder="Enter your answer here"
                />
              </div>
              <button className="input-btn check-btn" onClick={handleCheckAnswer}>Check Answer</button>
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
