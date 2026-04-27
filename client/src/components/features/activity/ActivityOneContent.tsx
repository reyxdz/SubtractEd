import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../layout/TopBar';
import { Modal } from '../../common/Modal';
import { playSound } from '../../utils/sound';
import './ActivityOneContent.css';
import '../guide/GuideContent.css'; // Reuse common header styles

export const activity1Items = [
  { levelShort: 'Easy', index: 1, total: 5, problem: 'You have 15 pesos. You bought candy for 6 pesos. How much money do you have left?', sentence: '15 − 6', answer: '9', hint: 'Both are positive → subtract normally.' },
  { levelShort: 'Easy', index: 2, total: 5, problem: 'You have 18 pesos. You spent 7 pesos on merienda. How much is left?', sentence: '18 − 7', answer: '11', hint: 'Count backwards.' },
  { levelShort: 'Easy', index: 3, total: 5, problem: 'You have 12 pesos. You bought bread for 5 pesos. How much remains?', sentence: '12 − 5', answer: '7', hint: 'Subtract directly.' },
  { levelShort: 'Easy', index: 4, total: 5, problem: 'You have 5 pesos. You bought food for 9 pesos. How much money do you have now?', sentence: '5 − 9', answer: '-4', hint: 'Not enough money → result becomes negative.' },
  { levelShort: 'Easy', index: 5, total: 5, problem: 'You have 6 pesos. You spent 10 pesos. What is your money now?', sentence: '6 − 10', answer: '-4', hint: 'You go below zero.' },
  { levelShort: 'Moderate', index: 1, total: 5, problem: 'You have 8 pesos. You subtract your utang of -5 pesos. How much money do you have now?', sentence: '8 − (−5)', answer: '13', hint: 'Minus a negative → becomes addition.' },
  { levelShort: 'Moderate', index: 2, total: 5, problem: 'You have 6 pesos. You subtract your utang of -4 pesos. What is your money now?', sentence: '6 − (−4)', answer: '10', hint: 'Think: add instead.' },
  { levelShort: 'Moderate', index: 3, total: 5, problem: 'You have 10 pesos. You subtract -3 pesos (utang cleared). What is your total money?', sentence: '10 − (−3)', answer: '13', hint: 'Subtracting negative increases value.' },
  { levelShort: 'Moderate', index: 4, total: 5, problem: 'You have 7 pesos. You subtract -6 pesos. How much do you have now?', sentence: '7 − (−6)', answer: '13', hint: 'Change to addition.' },
  { levelShort: 'Moderate', index: 5, total: 5, problem: 'You have 9 pesos. You subtract -5 pesos. What is your new amount?', sentence: '9 − (−5)', answer: '14', hint: 'Minus negative → plus.' },
  { levelShort: 'Difficult', index: 1, total: 5, problem: 'You have -5 pesos. You subtract 6 pesos. What is your money now?', sentence: '-5 − 6', answer: '-11', hint: '' },
  { levelShort: 'Difficult', index: 2, total: 5, problem: 'You have -8 pesos. You subtract 4 pesos. What is your total now?', sentence: '-8 − 4', answer: '-12', hint: '' },
  { levelShort: 'Difficult', index: 3, total: 5, problem: 'You have -3 pesos. You subtract -7 pesos. How much money do you have now?', sentence: '-3 − (−7)', answer: '4', hint: '' },
  { levelShort: 'Difficult', index: 4, total: 5, problem: 'You have -10 pesos. You subtract -5 pesos. What is your new amount?', sentence: '-10 − (−5)', answer: '-5', hint: '' },
  { levelShort: 'Difficult', index: 5, total: 5, problem: 'You have -6 pesos. You subtract -8 pesos. What is your final money?', sentence: '-6 − (−8)', answer: '2', hint: '' }
];

export const ActivityOneContent: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
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
  
  const currentItem = activity1Items[currentIndex];

  const handleCheckAnswer = () => {
    if (!answer.trim()) return;

    if (answer.trim() === currentItem.answer) {
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
    } else {
      alert('Activity 1 completed!');
      navigate('/activity');
    }
  };

  const handleModalRetry = () => {
    playSound.click();
    setModalState({ ...modalState, isOpen: false });
    setAnswer('');
  };

  const progressPercentage = ((currentIndex + 1) / activity1Items.length) * 100;

  return (
    <div className="guide-page-container" onClick={(e) => {
      // Add sound to any generic unhandled clicks on cards/containers if they don't have their own sound
      const target = e.target as HTMLElement;
      if (target.closest('.directions-box') || target.closest('.question-box') || target.closest('.equation-display')) {
        playSound.pop();
      }
    }}>
      {/* Header */}
      <header className="guide-header activity-one-header">
        <button className="neo-btn back-chip" onClick={() => { playSound.click(); navigate('/activity'); }}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill activity-one-title" onClick={() => playSound.pop()}>Activity 1</h1>
        <div onClick={() => playSound.click()}><TopBar /></div>
      </header>

      {/* Progress Bar Area */}
      <div className="activity-progress-area">
        <div className="progress-text-row">
          <span className="item-count">Item {currentIndex + 1} of {activity1Items.length}</span>
          <span className="level-badge">{currentItem.levelShort} Level</span>
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

        {/* Equation Display */}
        <div className="equation-display">
          <h2>{currentItem.levelShort === 'Difficult' ? '___' : currentItem.sentence}</h2>
        </div>

        {/* Game Area */}
        <div className="game-area-layout">
          {/* Main Working Area */}
          <div className="working-area-container">
            <div className="working-area-header">Working Area</div>
            <div className="working-area-content">
              {answer ? (
                <span className="working-answer-display">{answer}</span>
              ) : (
                <span className="placeholder-text">Type your answer below...</span>
              )}
            </div>
          </div>
        </div>

        {/* Input Controls */}
        <div className="input-controls-row">
          <div className="left-controls">
            <button className="action-btn clear-btn" onClick={() => { playSound.pop(); setAnswer(''); }}>Clear</button>
            <button className="action-btn hint-btn" onClick={() => { playSound.pop(); alert(currentItem.hint || 'No hint for this round.'); }}>Hint</button>
          </div>
          
          <div className="input-field-wrapper" style={{ position: 'relative' }}>
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
                if (e.key === 'Enter') {
                  handleCheckAnswer();
                }
              }}
              placeholder="e.g. -3"
            />
          </div>

          <div className="right-controls">
             <button className="action-btn check-btn" onClick={handleCheckAnswer}>Check Answer</button>
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
    </div>
  );
};
