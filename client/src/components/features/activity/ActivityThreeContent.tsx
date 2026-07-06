import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../common/Modal';
import { playSound } from '../../../utils/sound';
import { pickDifficultPairs, buildA3FromExpr, type A3Question, type A3QuestionPair, type Difficulty } from './activity3Data';
import { activity3Bank, activity3Hints, pickFiveWithHints, type QPair, type HintPair } from '../../../utils/questionBank';
import storeBg from '../../../assets/images/activity3_bg.png';
import { isActivityUnlocked, markActivityComplete } from '../../../utils/activityProgress';
import { ResultsSummary } from './ResultsSummary';
import { ProgressLegend } from '../../common/ProgressLegend';
import { saveSession, loadSession, clearSession, SESSION_KEYS } from '../../../utils/sessionState';
import './ActivityThreeContent.css';

type A3StoredAnswer = {
  keep: string; op: string; change: string; answer: string;
  subExp1: string; subExp2: string; subExp3: string; tryNum: 'first' | 'second';
};
type A3AllQuestions = (A3QuestionPair & { ftHint?: string; stHint?: string })[];
interface SavedActivity3 {
  allQuestions: A3AllQuestions;
  qIndex: number;
  tryNum: 'first' | 'second';
  consecutiveStFails: number;
  itemResults: string[];
  storedAnswers: Record<number, A3StoredAnswer>;
  startTime: number;
}

// ── Helpers ──
function normalizeValue(s: string): string {
  return s.replace(/\s+/g, '').replace(/[()]/g, '').replace(/[−–]/g, '-').toLowerCase();
}

// ── Step Cards (Left Panel) ──
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

// ── Build bank items into A3Question pairs ──
function buildBankQuestions(pairs: (QPair & HintPair)[]): (A3QuestionPair & { ftHint: string; stHint: string })[] {
  return pairs.map(p => ({
    ft: buildA3FromExpr(p.ftExpr, p.ftAns),
    st: buildA3FromExpr(p.stExpr, p.stAns),
    ftHint: p.ftHint,
    stHint: p.stHint,
  }));
}

// ── Main Component ──
export const ActivityThreeContent: React.FC = () => {
  const navigate = useNavigate();

  // Restore any in-progress session (once).
  const savedRef = useRef<SavedActivity3 | null>(loadSession<SavedActivity3>(SESSION_KEYS.activity(3)));
  const saved = savedRef.current;

  const [allQuestions, setAllQuestions] = useState<A3AllQuestions>(saved?.allQuestions ?? []);
  const [qIndex, setQIndex] = useState(saved?.qIndex ?? 0);
  const [tryNum, setTryNum] = useState<'first' | 'second'>(saved?.tryNum ?? 'first');
  const [consecutiveStFails, setConsecutiveStFails] = useState(saved?.consecutiveStFails ?? 0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [itemResults, setItemResults] = useState<string[]>(saved?.itemResults ?? Array(15).fill('unanswered'));

  const [storedAnswers, setStoredAnswers] = useState<Record<number, A3StoredAnswer>>(saved?.storedAnswers ?? {});

  // Input boxes
  const [boxKeep, setBoxKeep] = useState('');
  const [boxOp, setBoxOp] = useState('');
  const [boxChange, setBoxChange] = useState('');
  const [boxAnswer, setBoxAnswer] = useState('');
  const [subExp1, setSubExp1] = useState('');
  const [subExp2, setSubExp2] = useState('');
  const [subExp3, setSubExp3] = useState('');
  const [activeStep, setActiveStep] = useState<number | null>(null);

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

  const keepRef = useRef<HTMLInputElement>(null);
  const opRef = useRef<HTMLInputElement>(null);
  const changeRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  const isReviewMode = !!(itemResults[qIndex] && itemResults[qIndex] !== 'unanswered');
  const difficulty: Difficulty = qIndex < 5 ? 'easy' : qIndex < 10 ? 'moderate' : 'difficult';
  const displayTryNum = isReviewMode ? storedAnswers[qIndex]?.tryNum || 'first' : tryNum;
  
  const currentPair = allQuestions[qIndex];
  const currentQ: A3Question | null = currentPair ? (displayTryNum === 'first' ? currentPair.ft : currentPair.st) : null;
  
  const showSteps = difficulty !== 'difficult';
  const showHint = difficulty !== 'difficult' && !isReviewMode;
  const globalIdx = qIndex;
  const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const currentHint = currentPair && difficulty !== 'difficult'
    ? (displayTryNum === 'first' ? currentPair.ftHint : currentPair.stHint) ?? ''
    : '';

  // ── Initialize items on mount (skip if resuming a saved session) ──
  useEffect(() => {
    if (saved) return;
    const easyBank = buildBankQuestions(pickFiveWithHints(activity3Bank.easy, activity3Hints.easy));
    const modBank = buildBankQuestions(pickFiveWithHints(activity3Bank.moderate, activity3Hints.moderate));
    const diffBank = pickDifficultPairs();
    setAllQuestions([...easyBank, ...modBank, ...diffBank]);
  }, [saved]);

  // ── Persist in-progress session so students resume where they left off ──
  useEffect(() => {
    if (showSummary || allQuestions.length === 0) return;
    saveSession<SavedActivity3>(SESSION_KEYS.activity(3), {
      allQuestions,
      qIndex,
      tryNum,
      consecutiveStFails,
      itemResults,
      storedAnswers,
      startTime: startTime.getTime(),
    });
  }, [allQuestions, qIndex, tryNum, consecutiveStFails, itemResults, storedAnswers, startTime, showSummary]);

  // ── Guard ──
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
    setSubExp1('');
    setSubExp2('');
    setSubExp3('');
    setActiveStep(null);
  }, []);

  // Restore existing answers if they exist
  useEffect(() => {
    if (storedAnswers[qIndex]) {
      const ans = storedAnswers[qIndex];
      setBoxKeep(ans.keep); setBoxOp(ans.op); setBoxChange(ans.change); setBoxAnswer(ans.answer);
      setSubExp1(ans.subExp1); setSubExp2(ans.subExp2); setSubExp3(ans.subExp3);
    } else {
      clearInputs();
    }
  }, [qIndex, storedAnswers, clearInputs]);

  // ── Go to next item ──
  const goToNext = useCallback(() => {
    setTryNum('first');
    setShowingAnswer(false);
    const nextIdx = itemResults.findIndex((r) => r === 'unanswered');
    if (nextIdx !== -1) {
      setQIndex(nextIdx);
    } else {
      setEndTime(new Date());
      setShowSummary(true);
    }
  }, [itemResults]);

  // ── Check answer ──
  const handleCheck = useCallback(() => {
    if (!currentQ || isReviewMode) return;
    
    if (difficulty === 'difficult') {
      if (!subExp1.trim() || !subExp2.trim() || !subExp3.trim() || !boxKeep.trim() || !boxOp.trim() || !boxChange.trim() || !boxAnswer.trim()) return;
    } else {
      if (!boxKeep.trim() || !boxOp.trim() || !boxChange.trim() || !boxAnswer.trim()) return;
    }

    const keepOk = normalizeValue(boxKeep) === normalizeValue(currentQ.expectedKeep);
    const opOk = normalizeValue(boxOp) === normalizeValue(currentQ.expectedOp);
    const changeOk = normalizeValue(boxChange) === normalizeValue(currentQ.expectedChange);

    const cleanAnswer = boxAnswer.replace(/\s+/g, '').replace(/[−–]/g, '-');
    const numAns = Number(cleanAnswer);
    const ansOk = numAns === currentQ.answer;

    let subExpOk = true;
    if (difficulty === 'difficult') {
      subExpOk = normalizeValue(subExp1) === String(currentQ.minuend) &&
                 normalizeValue(subExp2) === '-' &&
                 normalizeValue(subExp3) === String(currentQ.subtrahend);
    }

    const allOk = keepOk && opOk && changeOk && ansOk && subExpOk;

    const storeUserAns = () => {
      setStoredAnswers(prev => ({
        ...prev,
        [globalIdx]: { keep: boxKeep, op: boxOp, change: boxChange, answer: boxAnswer, subExp1, subExp2, subExp3, tryNum }
      }));
    };

    if (allOk) {
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
        title: 'Great Job!',
        message: 'Your answer is correct!',
        showNext: true,
      });
    } else {
      // Activity 3 difficult round has NO second try — a wrong answer is final.
      if (tryNum === 'first' && difficulty !== 'difficult') {
        playSound.pop();
        setTryNum('second');
        setModalState({
          isOpen: true,
          type: 'info',
          title: 'Try Again!',
          message: 'That was your first attempt. Here is a similar question for your second try.',
          showNext: false,
        });
        clearInputs();
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
          title: currentQ.errorTitle,
          message: (
            <>
              <strong>Answers are incorrect.</strong><br/><br/>
              The correct number sentence is <strong>{currentQ.newSentence} = {currentQ.answer}</strong>.
            </>
          ),
          showNext: true,
        });
      }
    }
  }, [currentQ, boxKeep, boxOp, boxChange, boxAnswer, subExp1, subExp2, subExp3, difficulty, tryNum, consecutiveStFails, isReviewMode, globalIdx, clearInputs]);

  const handleNext = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    if (showingAnswer || modalState.showNext) {
      goToNext();
    }
  }, [goToNext, showingAnswer, modalState.showNext]);

  const handleRetry = useCallback(() => {
    playSound.click();
    setModalState(p => ({ ...p, isOpen: false }));
    clearInputs();
  }, [clearInputs]);

  const handleVideoRedirect = useCallback(() => {
    playSound.click();
    setVideoRedirectModal(false);
    setConsecutiveStFails(0);
    navigate('/activity/3/intro');
  }, [navigate]);

  // Focus handlers
  const handleBoxFocus = useCallback((stepNum: number) => {
    setActiveStep(stepNum);
  }, []);

  const handleBoxBlur = useCallback(() => {
    setActiveStep(null);
  }, []);

  if (showSummary && endTime) {
    return (
      <ResultsSummary
        activityNum={3}
        itemResults={itemResults}
        startTime={startTime}
        endTime={endTime}
        onProceed={() => {
          markActivityComplete(3);
          clearSession(SESSION_KEYS.activity(3));
          navigate('/activity');
        }}
      />
    );
  }

  return (
    <div className="a3-page-container" style={{ '--a3-store-bg': `url(${storeBg})` } as React.CSSProperties}>
      <div className="a3-frame">
        {/* Header */}
        <div className="a3-header">
          <button className="a3-back-btn" onClick={() => { playSound.click(); navigate('/activity'); }}>
            ← Back
          </button>
          <div className="a3-title-section">
            <div className="a3-title-pill">Activity 3</div>
            <div className="current-difficulty-text">{difficultyLabel}</div>
          </div>
          <div className="a3-header-spacer"></div>
        </div>

        {/* Progress Circles */}
        <div className="progress-circles-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="progress-circles">
            {Array.from({ length: 15 }, (_, i) => {
              const status = itemResults[i];
              const itemNum = i + 1;
              const isCurrent = i === globalIdx;
              return (
                <div 
                  key={i} 
                  className={`progress-circle ${status !== 'unanswered' ? status : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => {
                    if (status !== 'unanswered') {
                      setQIndex(i);
                    } else if (i === itemResults.findIndex(r => r === 'unanswered')) {
                      setQIndex(i); // Navigating back to the current active unanswered question
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

        {/* Directions */}
        <div className="a3-directions">
          <p>
            <strong>Directions:</strong>{' '}
            {difficulty === 'difficult' 
              ? 'Convert the word problem into a subtraction expression. Then, using the KCC (Keep-Change-Change) rule, convert the subtraction expression into an addition expression and find the answer.'
              : 'Use the KEEP-CHANGE-CHANGE rule to turn the subtraction sentence into an addition sentence. Follow the three steps, then write your new number sentence and answer.'
            }
          </p>
        </div>

        {/* Main Content */}
        <div className={`a3-main-content ${showSteps ? 'with-steps' : 'no-steps'}`}>
          {showSteps && currentQ && <StepCards question={currentQ} difficulty={difficulty} activeStep={activeStep} />}

          {/* Question Card */}
          {currentQ && (
            <div className="a3-question-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              {difficulty === 'difficult' ? (
                <>
                  <div className="a3-q-badge" style={{ alignSelf: 'flex-start' }}>QUESTION:</div>
                  <div className="a3-q-text" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.4rem' }}>
                    {currentQ.question}
                  </div>
                  <div className="a3-sub-exp-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#333', textTransform: 'uppercase' }}>SUBTRACTION EXPRESSION</div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div className="a3-color-box green-box" style={{ width: '80px', height: '80px' }}>
                        <input type="text" value={subExp1} onChange={e => { playSound.tick(); setSubExp1(e.target.value); }} readOnly={isReviewMode} />
                      </div>
                      <div className="a3-color-box blue-box" style={{ width: '80px', height: '80px' }}>
                        <input type="text" value={subExp2} onChange={e => { playSound.tick(); setSubExp2(e.target.value); }} readOnly={isReviewMode} />
                      </div>
                      <div className="a3-color-box yellow-box" style={{ width: '80px', height: '80px' }}>
                        <input type="text" value={subExp3} onChange={e => { playSound.tick(); setSubExp3(e.target.value); }} readOnly={isReviewMode} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="a3-s-display" style={{ position: 'static', textAlign: 'center', fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 'bold', color: '#000' }}>
                  {currentQ.sentence}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Colored Input Boxes */}
        {currentQ && (
          <div className="a3-input-area">
            <div className="a3-sentence-boxes">
              <div className="a3-boxes-row" style={{ alignItems: 'flex-end', display: 'flex' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="a3-box-label-row">Write Your New Number Sentence:</div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
                        readOnly={isReviewMode}
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
                        readOnly={isReviewMode}
                      />
                    </div>
                  </div>
                </div>

                <div className="a3-equals-sign" style={{ paddingBottom: '16px' }}>=</div>

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
                      readOnly={isReviewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="a3-action-buttons" style={{ flexDirection: 'row' }}>
              {isReviewMode ? (
                <button className="a3-check-btn" onClick={() => {
                  playSound.click();
                  const nextIdx = itemResults.findIndex((r) => r === 'unanswered');
                  if (nextIdx !== -1) setQIndex(nextIdx);
                  else { setEndTime(new Date()); setShowSummary(true); }
                }}>Back to Current Question</button>
              ) : (
                <>
                  {showHint && <button className="a3-hint-btn" onClick={() => { playSound.pop(); setHintModalOpen(true); }}> Hint</button>}
                  <button className="a3-check-btn" onClick={handleCheck}>Check Answer</button>
                </>
              )}
            </div>
          </div>
        )}
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
        <Modal isOpen={modalState.isOpen} type="error" title={modalState.title} onClose={handleNext}
          actions={<button className="action-btn" onClick={handleNext} style={{ width: '100%', background: 'linear-gradient(145deg, #e57373, #d32f2f)', color: 'white', border: 'none' }}>Next Question</button>}>
          <p>{modalState.message}</p>
        </Modal>
      )}

      {/* Info / Second Try Modal */}
      {modalState.type === 'info' && (
        <Modal isOpen={modalState.isOpen} type="info" title={modalState.title} onClose={handleRetry}
          actions={<button className="action-btn" onClick={handleRetry} style={{ width: '100%', background: 'linear-gradient(145deg, #ffb74d, #ff9800)', color: 'white', border: 'none' }}>Got it!</button>}>
          <p>{modalState.message}</p>
        </Modal>
      )}

      {/* Hint Modal */}
      <Modal isOpen={hintModalOpen} type="info" title="Hint"
        onClose={() => { playSound.click(); setHintModalOpen(false); }}
        actions={<button className="action-btn" onClick={() => { playSound.click(); setHintModalOpen(false); }} style={{ width: '100%', background: '#00E5FF', color: 'white', border: 'none', fontWeight: 'bold', padding: '12px', borderRadius: '9999px', fontSize: '1rem' }}>Got it!</button>}>
        <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#1e293b' }}>
          {currentHint || currentQ?.hint || 'Use KEEP-CHANGE-CHANGE: keep the first number, change minus to plus, flip the sign of the second number.'}
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
