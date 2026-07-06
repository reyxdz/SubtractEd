import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './ResultsSummary.css';

export interface ResultsSummaryProps {
  activityNum: number;
  itemResults: string[];
  startTime: Date;
  endTime: Date;
  onProceed: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  activityNum,
  itemResults,
  startTime,
  endTime,
  onProceed,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [hasEnteredName, setHasEnteredName] = useState(false);

  const handleDownloadReport = async () => {
    if (!modalRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      // Short delay incase of any reflows
      await new Promise(r => setTimeout(r, 100));
      
      const canvas = await html2canvas(modalRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Activity_${activityNum}_Summary_Report.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsDownloading(false);
    }
  };
  const dateStr = endTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const startStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endStr = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Exclude unanswered
  const answeredItems = itemResults.map((r, i) => ({ result: r, index: i })).filter(item => item.result !== 'unanswered');

  const correctFirst = answeredItems.filter(item => item.result === 'correctFirst').length;
  const correctSecond = answeredItems.filter(item => item.result === 'correctSecond').length;
  const wrongAnswers = answeredItems.filter(item => item.result === 'wrong').length;
  const totalCorrect = correctFirst + correctSecond;
  const totalItems = answeredItems.length;
  const percentage = totalItems > 0 ? Math.round((totalCorrect / totalItems) * 100) : 0;

  const renderFirstTryIcon = (res: string) => {
    if (res === 'correctFirst') return <span className="rs-check-green">✓</span>;
    if (res === 'correctSecond' || res === 'wrong') return <span className="rs-cross-red">✗</span>;
    return null;
  };

  const renderSecondTryIcon = (res: string, index: number) => {
    // If difficult (index >= 10), there was no second try attempt recorded.
    if (index >= 10) return null;
    if (res === 'correctSecond') return <span className="rs-check-orange">✓</span>;
    if (res === 'wrong') return <span className="rs-cross-red">✗</span>;
    return null;
  };

  const getResultText = (res: string) => {
    if (res === 'correctFirst') return 'Correct in First Try';
    if (res === 'correctSecond') return 'Correct in Second Try';
    if (res === 'wrong') return 'Wrong Answer';
    return '';
  };

  const getResultColorClass = (res: string) => {
    if (res === 'correctFirst') return 'rs-text-green';
    if (res === 'correctSecond') return 'rs-text-orange';
    if (res === 'wrong') return 'rs-text-red';
    return '';
  };

  if (!hasEnteredName) {
    return (
      <div className="rs-overlay">
        <div className="rs-modal rs-name-modal">
          <h2>Enter Your Name</h2>
          <p>Please enter your name to proceed to your results summary.</p>
          <form 
            className="rs-name-form" 
            onSubmit={(e) => {
              e.preventDefault();
              if (studentName.trim()) setHasEnteredName(true);
            }}
          >
            <input 
              type="text" 
              className="rs-name-input" 
              placeholder="Your Name" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)} 
              autoFocus
            />
            <button 
              type="submit" 
              className="rs-btn-primary" 
              disabled={!studentName.trim()}
            >
              Continue <span className="rs-btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="rs-overlay">
      <div className="rs-modal" ref={modalRef}>
        {/* Confetti decoration elements */}
        <div className="rs-confetti-1"></div>
        <div className="rs-confetti-2"></div>
        <div className="rs-confetti-3"></div>
        <div className="rs-confetti-4"></div>

        <div className="rs-header">
          <div className="rs-title-section">
            <div className="rs-icon-star">★</div>
            <div className="rs-titles">
              <h2>Activity {activityNum} Results Summary</h2>
              <p>Student: <strong>{studentName}</strong> | Great job! You've completed all the items.</p>
            </div>
          </div>
          <div className="rs-time-section">
            <div className="rs-time-block">
              <span className="rs-icon-cal">📅</span>
              <div className="rs-time-info">
                <span className="rs-time-label">Date</span>
                <span className="rs-time-val">{dateStr}</span>
              </div>
            </div>
            <div className="rs-time-block">
              <span className="rs-icon-clock">⏱️</span>
              <div className="rs-time-info">
                <span className="rs-time-label">Start Time</span>
                <span className="rs-time-val">{startStr}</span>
              </div>
            </div>
            <div className="rs-time-block">
              <span className="rs-icon-flag">🏁</span>
              <div className="rs-time-info">
                <span className="rs-time-label">End Time</span>
                <span className="rs-time-val">{endStr}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rs-cards-row">
          <div className="rs-card card-green">
            <div className="rs-card-icon bg-green">✓</div>
            <div className="rs-card-info">
              <span className="rs-card-num text-green">{correctFirst}</span>
              <span className="rs-card-label">Correct in<br/>First Try</span>
            </div>
          </div>
          <div className="rs-card card-orange">
            <div className="rs-card-icon bg-orange">✓</div>
            <div className="rs-card-info">
              <span className="rs-card-num text-orange">{correctSecond}</span>
              <span className="rs-card-label">Correct in<br/>Second Try</span>
            </div>
          </div>
          <div className="rs-card card-red">
            <div className="rs-card-icon bg-red">✗</div>
            <div className="rs-card-info">
              <span className="rs-card-num text-red">{wrongAnswers}</span>
              <span className="rs-card-label">Wrong<br/>Answers</span>
            </div>
          </div>
          <div className="rs-card card-blue-wide">
            <div className="rs-card-icon bg-blue">📋</div>
            <div className="rs-card-info v-center">
              <span className="rs-card-score">{totalCorrect} / {totalItems}</span>
              <span className="rs-card-status">Total Score <span className="rs-percent-pill">{percentage}%</span></span>
            </div>
          </div>
        </div>

        <div className="rs-table-container">
          <table className="rs-table">
            <thead>
              <tr>
                <th>Item #</th>
                <th>First Try</th>
                <th>Second Try</th>
                <th>Result</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {answeredItems.map((item) => (
                <tr key={item.index}>
                  <td className="rs-col-bold">{item.index + 1}</td>
                  <td>{renderFirstTryIcon(item.result)}</td>
                  <td>{renderSecondTryIcon(item.result, item.index)}</td>
                  <td className={getResultColorClass(item.result)}>{getResultText(item.result)}</td>
                  <td>
                    {item.result === 'correctFirst' || item.result === 'correctSecond' ? (
                      <div className="rs-status-pill status-correct">
                        <span className="rs-pill-icon">✓</span> Correct
                      </div>
                    ) : (
                      <div className="rs-status-pill status-wrong">
                        <span className="rs-pill-icon">✗</span> Wrong
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rs-actions">
          <button className="rs-btn-outline" onClick={handleDownloadReport} disabled={isDownloading}>
            <span className="rs-btn-icon">📥</span> {isDownloading ? 'Generating PDF...' : 'Download Report'}
          </button>
          <button className="rs-btn-primary" onClick={onProceed}>
            Proceed to Next Activity <span className="rs-btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
