import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpen,
  ClipboardCheck,
  LineChart,
  Pencil,
  RotateCcw,
  Rocket,
  Star,
} from 'lucide-react';
import './UserGuideModal.css';

interface UserGuideModalProps {
  isOpen: boolean;
  /** Called when the guide is closed. `doNotRemind` reflects the checkbox state. */
  onClose: (doNotRemind: boolean) => void;
}

const STEPS = [
  { icon: Rocket, accent: 'blue', text: 'Start on the Home Page and click Start Learning.' },
  { icon: BookOpen, accent: 'teal', text: 'Go to Guide to read and understand the lesson.' },
  { icon: Pencil, accent: 'green', text: 'Answer practice exercises in Activities.' },
  { icon: ClipboardCheck, accent: 'purple', text: 'Take quizzes in Assessments.' },
  { icon: Star, accent: 'orange', text: 'Complete extra tasks in Enrichment.' },
  { icon: BarChart3, accent: 'blue', text: 'Check your completion status in Your Progress.' },
  { icon: LineChart, accent: 'sky', text: 'Use View Progress to monitor your learning.' },
  { icon: RotateCcw, accent: 'red', text: 'Click Reset only if you want to start again.' },
] as const;

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  const [render, setRender] = useState(isOpen);
  const [doNotRemind, setDoNotRemind] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setDoNotRemind(false);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setRender(false);
    }
  };

  if (!render) return null;

  const handleContinue = () => onClose(doNotRemind);

  return (
    <div
      className={`guide-overlay ${isOpen ? 'open' : 'closed'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-title">
        <header className="guide-modal-header">
          <h2 id="guide-title" className="guide-modal-title">How to Use SubtractEd</h2>
        </header>

        <div className="guide-modal-body">
          <ol className="guide-steps">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={index} className={`guide-step guide-step-${step.accent}`}>
                  <span className="guide-step-number">{index + 1}</span>
                  <span className="guide-step-icon">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <span className="guide-step-text">{step.text}</span>
                </li>
              );
            })}
          </ol>

          <div className="guide-reminder">
            <span className="guide-reminder-icon">
              <BellRing size={26} strokeWidth={2.2} />
            </span>
            <p className="guide-reminder-text">
              <strong>Reminder:</strong> Read the instructions carefully, answer honestly,
              and complete all sections to reach 100% progress.
            </p>
          </div>
        </div>

        <footer className="guide-modal-footer">
          <label className="guide-remind-toggle">
            <input
              type="checkbox"
              checked={doNotRemind}
              onChange={(e) => setDoNotRemind(e.target.checked)}
            />
            <span>Do not remind me again</span>
          </label>

          <button type="button" className="guide-continue-btn" onClick={handleContinue}>
            <span>Continue</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </footer>
      </div>
    </div>
  );
};
