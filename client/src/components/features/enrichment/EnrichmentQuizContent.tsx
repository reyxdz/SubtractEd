import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, X, Music, Palette, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Home, Trophy } from 'lucide-react';
import { playSound } from '../../../utils/sound';
import { musicManager } from '../../../utils/music';
import { crosswordLevels, GRID_ROWS, GRID_COLS, CWCell } from './crosswordData';
import enrichmentBg from '../../../assets/images/enrichment_bg.png';
import './EnrichmentQuizContent.css';

type Theme = 'violet' | 'green' | 'red' | 'blue';
type ModalState = 'none' | 'settings' | 'correct' | 'incorrect' | 'level-complete';

export const EnrichmentQuizContent: React.FC = () => {
  const navigate = useNavigate();

  const [levelIndex, setLevelIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctCells, setCorrectCells] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [activeTheme, setActiveTheme] = useState<Theme>('violet');
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [modalState, setModalState] = useState<ModalState>('none');
  const [isFinished, setIsFinished] = useState(false);
  const [feedbackCell, setFeedbackCell] = useState<string | null>(null);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const currentLevel = crosswordLevels[levelIndex];

  // Build a map of all cells keyed by "row-col"
  const cellMap = useCallback(() => {
    const map: Record<string, CWCell & { shared?: boolean }> = {};
    for (const entry of currentLevel.entries) {
      for (const cell of entry.cells) {
        const key = `${cell.row}-${cell.col}`;
        if (map[key]) {
          // Shared cell (intersection) — keep the blank version
          if (cell.isBlank) map[key] = { ...cell, shared: true };
          else map[key] = { ...map[key], shared: true };
        } else {
          map[key] = cell;
        }
      }
    }
    return map;
  }, [currentLevel]);

  // Get all blank cells for the current level
  const blankCells = useCallback(() => {
    const blanks: CWCell[] = [];
    const seen = new Set<string>();
    for (const entry of currentLevel.entries) {
      for (const cell of entry.cells) {
        const key = `${cell.row}-${cell.col}`;
        if (cell.isBlank && !seen.has(key)) {
          blanks.push(cell);
          seen.add(key);
        }
      }
    }
    return blanks;
  }, [currentLevel]);

  // Reset answers when level changes
  useEffect(() => {
    setAnswers({});
    setCorrectCells(new Set());
    setFeedbackCell(null);
  }, [levelIndex]);

  // Sync music
  useEffect(() => {
    if (isMusicEnabled) musicManager.play();
    else musicManager.pause();
  }, [isMusicEnabled]);

  const totalBlanks = blankCells().length;
  const totalAllBlanks = crosswordLevels.reduce((sum, lvl) => {
    const seen = new Set<string>();
    for (const entry of lvl.entries) {
      for (const cell of entry.cells) {
        if (cell.isBlank) seen.add(`${cell.row}-${cell.col}`);
      }
    }
    return sum + seen.size;
  }, 0);

  const handleCellChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleCellSubmit = (key: string, cell: CWCell) => {
    const userVal = (answers[key] || '').trim();
    if (!userVal) return;

    const numVal = Number(userVal);
    const expected = typeof cell.value === 'number' ? cell.value : Number(cell.value);

    if (numVal === expected) {
      playSound.success();
      setScore(prev => prev + 1);
      setCorrectCells(prev => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      setFeedbackCell(key);
      setTimeout(() => setFeedbackCell(null), 800);

      // Check if all blanks in this level are correct
      const allBlanks = blankCells();
      const newCorrectCount = correctCells.size + 1;
      if (newCorrectCount >= allBlanks.length) {
        setTimeout(() => {
          if (levelIndex < crosswordLevels.length - 1) {
            setModalState('level-complete');
          } else {
            setIsFinished(true);
          }
        }, 1000);
      }
    } else {
      playSound.error();
      setFeedbackCell(key);
      setModalState('incorrect');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, key: string, cell: CWCell) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCellSubmit(key, cell);
    }
  };

  const handleNextLevel = () => {
    playSound.click();
    setModalState('none');
    setLevelIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    playSound.click();
    setLevelIndex(0);
    setScore(0);
    setAnswers({});
    setCorrectCells(new Set());
    setIsFinished(false);
    setModalState('none');
  };

  const scorePercentage = Math.round((score / totalAllBlanks) * 100);

  const getEncouragement = () => {
    if (scorePercentage >= 90) return "Outstanding! You're a subtraction master! 🏆";
    if (scorePercentage >= 75) return "Great job! Keep practicing! 🌟";
    if (scorePercentage >= 50) return "Good effort! You're getting there! 💪";
    return "Keep practicing! You'll improve! 📚";
  };

  // Render crossword grid
  const renderGrid = () => {
    const map = cellMap();
    const cells: React.ReactNode[] = [];

    // Entry number labels
    const entryLabels: Record<string, number> = {};
    for (const entry of currentLevel.entries) {
      const firstCell = entry.cells[0];
      const key = `${firstCell.row}-${firstCell.col}`;
      entryLabels[key] = entry.id;
    }

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const key = `${r}-${c}`;
        const cell = map[key];
        if (!cell) continue;

        const isCorrect = correctCells.has(key);
        const isOp = cell.value === '−' || cell.value === '=';
        const label = entryLabels[key];
        const isFeedback = feedbackCell === key;

        cells.push(
          <div
            key={key}
            className={`cw-cell ${isOp ? 'cw-op' : ''} ${cell.isBlank && !isCorrect ? 'cw-blank' : ''} ${isCorrect ? 'cw-correct' : ''} ${isFeedback && isCorrect ? 'cw-flash-green' : ''} ${isFeedback && !isCorrect && modalState === 'incorrect' ? 'cw-flash-red' : ''}`}
            style={{
              gridRow: r + 1,
              gridColumn: c + 1,
            }}
          >
            {label && <span className="cw-label">{label}</span>}
            {cell.isBlank && !isCorrect ? (
              <input
                ref={(el) => { inputRefs.current[key] = el; }}
                type="text"
                inputMode="numeric"
                className="cw-input"
                value={answers[key] || ''}
                onChange={(e) => handleCellChange(key, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, key, cell)}
                onBlur={() => handleCellSubmit(key, cell)}
                disabled={modalState !== 'none'}
                autoComplete="off"
              />
            ) : (
              <span className={`cw-value ${isOp ? 'cw-op-text' : ''}`}>
                {isCorrect && cell.isBlank ? cell.value : cell.value}
              </span>
            )}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div className={`enr-container theme-${activeTheme}`}>
      {/* Background */}
      <div className="enr-bg-layer">
        <img src={enrichmentBg} alt="" draggable="false" />
        <div className="enr-bg-overlay" />
      </div>

      <div className="enr-blob-1" />
      <div className="enr-blob-2" />

      {/* Header */}
      <header className="enr-header">
        <button className="enr-back-btn" onClick={() => { playSound.click(); navigate('/enrichment'); }}>
          <ArrowLeft size={16} /> Back
        </button>

        {!isFinished && (
          <div className="enr-header-center">
            <span className="enr-level-badge">{currentLevel.name}</span>
            <span className="enr-counter">{correctCells.size}/{totalBlanks}</span>
            <div className="enr-progress-track">
              <div className="enr-progress-fill" style={{ width: `${(correctCells.size / totalBlanks) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="enr-header-right">
          <div className="enr-score-badge">Score: {score}</div>
          <button className="enr-settings-btn" onClick={() => { playSound.pop(); setModalState('settings'); }}>
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="enr-main">
        {isFinished ? (
          <div className="enr-complete-card">
            <div className="enr-trophy"><Trophy size={40} color="white" /></div>
            <h2>Quiz Completed!</h2>
            <p className="enr-subtitle">Great effort! Here's how you did:</p>
            <div className="enr-score-box">
              <div className="enr-score-label">YOUR SCORE</div>
              <div className="enr-score-number">
                {score}<span className="enr-score-slash">/</span>{totalAllBlanks}
              </div>
              <div className="enr-percentage">{scorePercentage}%</div>
            </div>
            <p className="enr-encouragement">{getEncouragement()}</p>
            <div className="enr-complete-actions">
              <button className="enr-review-btn" onClick={handleRestart}>
                <RefreshCw size={16} /> Play Again
              </button>
              <button className="enr-finish-btn" onClick={() => { playSound.click(); navigate('/enrichment'); }}>
                <Home size={16} /> Finish
              </button>
            </div>
          </div>
        ) : (
          <div className="cw-wrapper">
            <div className="cw-instruction">
              Solve the subtraction equations and fill in the missing numbers. Press Enter to check each answer.
            </div>
            <div className="cw-grid" style={{
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            }}>
              {renderGrid()}
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {modalState === 'settings' && (
        <div className="enr-modal-overlay">
          <div className="enr-settings-modal">
            <div className="enr-modal-header">
              <h2>Settings</h2>
              <button className="enr-close-btn" onClick={() => { playSound.pop(); setModalState('none'); }}>
                <X size={18} />
              </button>
            </div>
            <div className="enr-setting-row">
              <div className="enr-setting-info">
                <div className="enr-setting-icon"><Music size={18} /></div>
                <div className="enr-setting-text"><h4>Music</h4><p>Turn background music on or off.</p></div>
              </div>
              <div className={`enr-toggle ${isMusicEnabled ? 'active' : ''}`}
                onClick={() => { playSound.tick(); setIsMusicEnabled(!isMusicEnabled); }}>
                <div className="enr-toggle-knob" />
              </div>
            </div>
            <div className="enr-setting-row" style={{ borderBottom: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '1vh' }}>
              <div className="enr-setting-info">
                <div className="enr-setting-icon"><Palette size={18} /></div>
                <div className="enr-setting-text"><h4>Color Theme</h4><p>Choose your favorite color theme.</p></div>
              </div>
              <div className="enr-theme-picker">
                {(['red', 'green', 'blue', 'violet'] as Theme[]).map(t => (
                  <button key={t} className={`enr-theme-btn ${t} ${activeTheme === t ? 'active' : ''}`}
                    onClick={() => { playSound.tick(); setActiveTheme(t); }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button className="enr-submit-btn"
              style={{ width: '100%', marginTop: '2vh', padding: '1.5vh 0', borderRadius: '9999px' }}
              onClick={() => { playSound.click(); setModalState('none'); }}>
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Incorrect Modal */}
      {modalState === 'incorrect' && (
        <div className="enr-modal-overlay">
          <div className="enr-feedback-modal incorrect">
            <div className="enr-feedback-icon"><XCircle size={48} /></div>
            <h2>Incorrect!</h2>
            <p>You can do better. Keep going!</p>
            <button className="enr-retry-btn" onClick={() => {
              playSound.click();
              setModalState('none');
              if (feedbackCell) {
                setAnswers(prev => ({ ...prev, [feedbackCell]: '' }));
                setTimeout(() => inputRefs.current[feedbackCell]?.focus(), 100);
              }
              setFeedbackCell(null);
            }}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Level Complete Modal */}
      {modalState === 'level-complete' && (
        <div className="enr-modal-overlay">
          <div className="enr-feedback-modal correct" style={{ position: 'relative', overflow: 'hidden' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="enr-confetti" style={{
                left: `${10 + Math.random() * 80}%`, top: `${Math.random() * 40}%`,
                background: ['#27ae60', '#2ecc71', '#f1c40f', '#e67e22'][i % 4],
                animationDelay: `${Math.random() * 0.5}s`,
              }} />
            ))}
            <div className="enr-feedback-icon"><CheckCircle2 size={48} /></div>
            <h2>{currentLevel.name} Complete!</h2>
            <p>Moving to the next level...</p>
            <button className="enr-retry-btn" style={{ background: 'linear-gradient(145deg, #27ae60, #1e8449)' }}
              onClick={handleNextLevel}>
              Next Level →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
