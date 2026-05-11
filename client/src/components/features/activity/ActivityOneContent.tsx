import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { markActivityComplete } from '../../../utils/activityProgress';
import './ActivityOneContent.css';

// ── Question Data ─────────────────────────────────────────────
interface A1Item {
  levelShort: 'Easy' | 'Moderate' | 'Difficult';
  index: number;
  total: number;
  problem: string;
  sentence: string;
  answer: string;
  hint: string;
}

const activity1Items: A1Item[] = [
  // ── Easy (1-5) ──
  { levelShort: 'Easy', index: 1, total: 5, problem: 'You have 15 pesos. You bought a piece of turon for 9 pesos. How much is left?', sentence: '15 − 9 = ?', answer: '6', hint: 'Subtract the smaller amount from what you have.' },
  { levelShort: 'Easy', index: 2, total: 5, problem: 'A tricycle has 12 seats. 7 passengers are already inside. How many seats are still empty?', sentence: '12 − 7 = ?', answer: '5', hint: 'Subtract the passengers from the total seats.' },
  { levelShort: 'Easy', index: 3, total: 5, problem: 'You have 5 pesos in your pocket, but you need to pay 12 pesos for a jeepney fare. If you give all your money, how much is your "utang" (debt)?', sentence: '5 − 12 = ?', answer: '-7', hint: 'Since you spend more than you have, the result will be negative.' },
  { levelShort: 'Easy', index: 4, total: 5, problem: 'A vendor has 8 sticks of banana cue. A customer wants to buy 15 sticks. How many more sticks does the vendor need to cook?', sentence: '8 − 15 = ?', answer: '-7', hint: 'Subtracting a larger number results in a negative value representing what is "missing."' },
  { levelShort: 'Easy', index: 5, total: 5, problem: 'Your phone has 3 pesos of load. You sent a text that costs 10 pesos using emergency load. What is your new balance?', sentence: '3 − 10 = ?', answer: '-7', hint: 'Your balance will go below zero.' },

  // ── Moderate (6-10) ──
  { levelShort: 'Moderate', index: 1, total: 5, problem: 'You owe your brother 18 pesos. He takes away 10 pesos of your debt. What is your new balance?', sentence: '−18 − (−10) = ?', answer: '-8', hint: 'Subtracting a debt makes you owe less. It is the same as adding to your balance!' },
  { levelShort: 'Moderate', index: 2, total: 5, problem: 'A freezer is set at −15°C. You decrease the coldness by 6 degrees. What is the new temperature?', sentence: '−15 − (−6) = ?', answer: '-9', hint: 'When you subtract a negative temperature, the freezer gets warmer and moves closer to zero.' },
  { levelShort: 'Moderate', index: 3, total: 5, problem: 'A diver is 20 meters below sea level (−20). He reduces his depth by 15 meters. Where is he now?', sentence: '−20 − (−15) = ?', answer: '-5', hint: 'Subtracting a negative depth means the diver is rising toward the surface.' },
  { levelShort: 'Moderate', index: 4, total: 5, problem: 'Your GCash utang is 12 pesos. The bank removes a 5-peso penalty from your account. What is your balance now?', sentence: '−12 − (−5) = ?', answer: '-7', hint: 'Removing a "minus" from your account makes your balance more positive!' },
  { levelShort: 'Moderate', index: 5, total: 5, problem: 'A basketball team has a score deficit of −14. The referee cancels a 4-point penalty against them. What is their new deficit?', sentence: '−14 − (−4) = ?', answer: '-10', hint: 'When you subtract a penalty, the score improves (gets closer to zero).' },

  // ── Difficult (11-15) ──
  { levelShort: 'Difficult', index: 1, total: 5, problem: 'You have 6 pesos, but you need to pay a debt of −14 pesos (subtracting a negative). What is your total value now?', sentence: '6 − (−14) = ?', answer: '20', hint: '' },
  { levelShort: 'Difficult', index: 2, total: 5, problem: 'It is 10°C in Baguio. The temperature "drops" by 18 degrees. What is the new temperature?', sentence: '10 − 18 = ?', answer: '-8', hint: '' },
  { levelShort: 'Difficult', index: 3, total: 5, problem: 'You owe the store 5 pesos (−5). You then buy a snack worth 12 pesos on credit. What is your total debt?', sentence: '−5 − 12 = ?', answer: '-17', hint: '' },
  { levelShort: 'Difficult', index: 4, total: 5, problem: 'A fish is swimming at −3 meters. It dives down another 15 meters. What is its new depth?', sentence: '−3 − 15 = ?', answer: '-18', hint: '' },
  { levelShort: 'Difficult', index: 5, total: 5, problem: 'A student has a score of −8 in a game. They get another 12 points deducted for a mistake. What is the final score?', sentence: '−8 − 12 = ?', answer: '-20', hint: '' }
];

// ── Component ─────────────────────────────────────────────────
export const ActivityOneContent: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [chips, setChips] = useState<{ id: string; type: 'positive' | 'negative'; isCancelled: boolean }[]>([]);
  const [positiveCount, setPositiveCount] = useState('');
  const [negativeCount, setNegativeCount] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });
  const [hintModalOpen, setHintModalOpen] = useState(false);

  const currentItem = activity1Items[currentIndex];
  const isDifficult = currentItem.levelShort === 'Difficult';
  const showHint = !isDifficult && currentItem.hint !== '';

  const handleShowHint = () => {
    playSound.pop();
    setHintModalOpen(true);
  };

  const handleCheckAnswer = () => {
    if (!answer.trim()) return;
    const cleanAnswer = answer.trim().replace(/\s+/g, '').replace(/[−–]/g, '-');

    if (cleanAnswer === currentItem.answer) {
      playSound.success();
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Correct!',
        message: 'Great job! You got the right answer.'
      });
    } else {
      playSound.error();
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Incorrect',
        message: 'That is not the correct answer. Try again!'
      });
    }
  };

  const handleModalNext = () => {
    playSound.click();
    setModalState({ ...modalState, isOpen: false });
    if (currentIndex < activity1Items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setChips([]);
      setPositiveCount('');
      setNegativeCount('');
    } else {
      markActivityComplete(1);
      navigate('/activity');
    }
  };

  const handleModalRetry = () => {
    playSound.click();
    setModalState({ ...modalState, isOpen: false });
    setAnswer('');
  };

  // ── Chip Manipulation ──────────────────────────────────────
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

  // ── Editable Counter Handlers ──────────────────────────────
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

  // ── Chip Counts ────────────────────────────────────────────
  const posChips = chips.filter(c => c.type === 'positive');
  const negChips = chips.filter(c => c.type === 'negative');

  const progressPercentage = ((currentIndex + 1) / activity1Items.length) * 100;

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
            <div className="a1-title-pill">Activity 1</div>
            <div className="a1-header-right">
              <button
                className={`a1-diff-pill a1-pill-easy ${currentIndex < 5 ? 'active' : ''}`}
                style={{ cursor: 'default' }}
              >
                Easy (1-5)
              </button>
              <button
                className={`a1-diff-pill a1-pill-moderate ${currentIndex >= 5 && currentIndex < 10 ? 'active' : ''}`}
                style={{ cursor: 'default' }}
              >
                Moderate (6-10)
              </button>
              <button
                className={`a1-diff-pill a1-pill-difficult ${currentIndex >= 10 ? 'active' : ''}`}
                style={{ cursor: 'default' }}
              >
                Difficult (11-15)
              </button>
            </div>
          </header>

          {/* Progress Bar Area */}
          <div className="activity-progress-area">
            <div className="progress-text-row">
              <span className="item-count">Item {currentIndex + 1} of {activity1Items.length}</span>
              <span className="level-text">{currentItem.levelShort} Level</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="activity-main-body">
            {/* Directions Box */}
            <div className="directions-box">
              <p>Directions: Convert the sentence into a number sentence. Click the buttons to form your expression, then enter the correct answer in the answer box.</p>
            </div>

            {/* Question Box */}
            <div className="question-box">
              <p>{currentItem.problem}</p>
            </div>

            {/* Equation Display — Hidden in Difficult */}
            {!isDifficult && (
              <div className="equation-display">
                <h2>{currentItem.sentence}</h2>
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

            {/* Action Buttons — Delete Positive, Delete Negative, Clear All */}
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

      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        onClose={() => modalState.type === 'error' ? handleModalRetry() : handleModalNext()}
        actions={
          modalState.type === 'success' ? (
            <button className="action-btn" onClick={handleModalNext} style={{ width: '100%', background: 'linear-gradient(145deg, var(--theme-primary), var(--theme-accent))', color: 'white' }}>
              Next Question
            </button>
          ) : (
            <button className="action-btn" onClick={handleModalRetry} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white' }}>
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
          {currentItem.hint || 'No hint available for this level.'}
        </p>
      </Modal>
    </div>
  );
};
