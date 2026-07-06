import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Calendar, Clock, Flag, Star, Download, RefreshCw, Home, CheckCircle2, XCircle } from 'lucide-react';
import './AssessmentResultsSummary.css';

export interface AssessmentResultsSummaryProps {
  score: number;
  totalItems: number;
  history: ('correct' | 'incorrect' | 'pending')[];
  startTime: Date;
  endTime: Date;
  onRestart: () => void;
  onExit: () => void;
}

export const AssessmentResultsSummary: React.FC<AssessmentResultsSummaryProps> = ({
  score,
  totalItems,
  history,
  startTime,
  endTime,
  onRestart,
  onExit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [hasEnteredName, setHasEnteredName] = useState(false);

  const handleDownloadReport = async () => {
    if (!modalRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(modalRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Assessment_Summary_Report.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const dateStr = endTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const startStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endStr = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const percentage = totalItems > 0 ? Math.round((score / totalItems) * 100) : 0;
  const incorrectCount = totalItems - score;

  if (!hasEnteredName) {
    return (
      <div className="ars-overlay">
        <div className="ars-modal ars-name-modal">
          <h2>Enter Your Name</h2>
          <p>Please enter your name to proceed to your results summary.</p>
          <form
            className="ars-name-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (studentName.trim()) setHasEnteredName(true);
            }}
          >
            <input
              type="text"
              className="ars-name-input"
              placeholder="Your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              autoFocus
            />
            <button type="submit" className="ars-btn-primary" disabled={!studentName.trim()}>
              Continue →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="ars-overlay">
      <div className="ars-modal" ref={modalRef}>
        <div className="ars-confetti-1"></div>
        <div className="ars-confetti-2"></div>
        <div className="ars-confetti-3"></div>
        <div className="ars-confetti-4"></div>

        <div className="ars-header">
          <div className="ars-title-section">
            <div className="ars-icon-star"><Star fill="currentColor" /></div>
            <div className="ars-titles">
              <h2>Assessment Results Summary</h2>
              <p>Student: <strong>{studentName}</strong> | Great job! You've completed the assessment.</p>
            </div>
          </div>
          <div className="ars-time-section">
            <div className="ars-time-block">
              <Calendar size={14} className="ars-icon" />
              <div className="ars-time-info">
                <span className="ars-time-label">Date</span>
                <span className="ars-time-val">{dateStr}</span>
              </div>
            </div>
            <div className="ars-time-block">
              <Clock size={14} className="ars-icon" />
              <div className="ars-time-info">
                <span className="ars-time-label">Start Time</span>
                <span className="ars-time-val">{startStr}</span>
              </div>
            </div>
            <div className="ars-time-block">
              <Flag size={14} className="ars-icon" />
              <div className="ars-time-info">
                <span className="ars-time-label">End Time</span>
                <span className="ars-time-val">{endStr}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ars-cards-row">
          <div className="ars-card card-blue-outline">
            <div className="ars-card-icon bg-blue"><CheckCircle2 size={24} /></div>
            <div className="ars-card-info">
              <span className="ars-card-num text-blue">{score}</span>
              <span className="ars-card-label">Correct<br/>Answers</span>
            </div>
          </div>
          <div className="ars-card card-red-outline">
            <div className="ars-card-icon bg-red"><XCircle size={24} /></div>
            <div className="ars-card-info">
              <span className="ars-card-num text-red">{incorrectCount}</span>
              <span className="ars-card-label">Incorrect<br/>Answers</span>
            </div>
          </div>
          <div className="ars-card card-summary">
            <div className="ars-card-icon bg-green">📋</div>
            <div className="ars-card-info v-center">
              <span className="ars-card-score">{score} / {totalItems}</span>
              <span className="ars-card-status">Total Score <span className="ars-percent-pill">{percentage}%</span></span>
            </div>
          </div>
        </div>

        <div className="ars-table-container">
          <table className="ars-table">
            <thead>
              <tr>
                <th>Item #</th>
                <th>Result</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((res, idx) => (
                <tr key={idx}>
                  <td className="ars-col-bold">{idx + 1}</td>
                  <td>
                    {res === 'correct' ? (
                      <div className="ars-result-text text-blue">
                        <CheckCircle2 size={16} /> Correct
                      </div>
                    ) : (
                      <div className="ars-result-text text-red">
                        <XCircle size={16} /> Incorrect
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={`ars-status-pill ${res === 'correct' ? 'status-correct' : 'status-incorrect'}`}>
                      {res === 'correct' ? 'Passed' : 'Failed'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ars-actions">
          <button className="ars-btn-outline" onClick={handleDownloadReport} disabled={isDownloading}>
            <Download size={18} /> {isDownloading ? 'Generating PDF...' : 'Download Report'}
          </button>
          <div className="ars-main-actions">
            <button className="ars-btn-secondary" onClick={onRestart}>
              <RefreshCw size={18} /> Play Again
            </button>
            <button className="ars-btn-primary" onClick={onExit}>
              <Home size={18} /> Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
