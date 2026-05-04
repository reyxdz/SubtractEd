import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MousePointerClick } from 'lucide-react';
import confusedStudentImg from '../../../assets/student_clip_images/student_scratching_head_wondering.png';
import happyStudentImg from '../../../assets/student_clip_images/student_cheerful_smiling.png';
import teacherImg from '../../../assets/teacher_clip_images/teacher_smiling_clapping.png';
import { TopBar } from '../../layout/TopBar';
import './GuideContent.css';

// Simple fade-in wrapper that animates on mount
const FadeInMount: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure CSS transition triggers after mount
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export const GuideContent: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleTap = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Auto-scroll when new content appears
  useEffect(() => {
    if (currentStep > 1 && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100); // Wait for render
    }
  }, [currentStep]);

  return (
    <div
      className="guide-page-container"
      onClick={handleTap}
      style={{ cursor: currentStep < 5 ? 'pointer' : 'default', minHeight: '100vh' }}
    >
      {/* Header */}
      <header className="guide-header">
        <button
          className="neo-btn back-chip"
          onClick={(e) => { e.stopPropagation(); navigate('/'); }}
        >
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill">Guide Card</h1>
        <div onClick={(e) => e.stopPropagation()}>
          <TopBar />
        </div>
      </header>

      {/* Step 1: Intro Scene (Student) */}
      {currentStep >= 1 && (
        <FadeInMount>
          <div className="speech-row left-only">
            <div className="character-box">
              <img src={confusedStudentImg} alt="Student confused" className="character-img" />
            </div>
            <div className="speech-card speech-cream left-tail">
              This is so confusing,<br />
              I cannot subtract integers.
            </div>
          </div>
        </FadeInMount>
      )}

      {/* Step 2: Intro Scene (Teacher) */}
      {currentStep >= 2 && (
        <FadeInMount>
          <div className="speech-row right-only">
            <div className="speech-card speech-white right-tail">
              Do not worry, Intoy. It is actually very simple. <strong>SubtractEd</strong> is here to help you.
            </div>
            <div className="character-box">
              <img src={teacherImg} alt="Teacher helpful" className="character-img" />
            </div>
          </div>
        </FadeInMount>
      )}

      {/* Step 3: Learning Competency */}
      {currentStep >= 3 && (
        <FadeInMount>
          <div className="competency-layout">
            <div className="character-box" style={{ paddingBottom: '10px' }}>
              <img src={happyStudentImg} alt="Student" style={{ width: '100px' }} className="character-img" />
            </div>
            <div className="competency-box">
              <div className="competency-header">
                <h3>Learning Competency</h3>
                <div style={{ color: 'var(--color-text-muted)' }}>📋</div>
              </div>
              <div className="competency-item">
                <div className="competency-check">
                  <Check size={20} strokeWidth={3} />
                </div>
                <div>
                  Subtract integers using concrete models such as counters and integer chips,
                  pictorial models such as bar models and number lines, and with integers written as numerals.
                </div>
              </div>
            </div>
            <div className="character-box" style={{ paddingBottom: '10px' }}>
              <img src={teacherImg} alt="Teacher" style={{ width: '100px' }} className="character-img" />
            </div>
          </div>
        </FadeInMount>
      )}

      {/* Step 4: Video Block */}
      {currentStep >= 4 && (
        <FadeInMount>
          <div className="video-wrapper" style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="video-title-pill">Introduction</div>
            <div
              className="video-player"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/EDCrtkT_JeA"
                title="SubtractEd Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: 'none', display: 'block' }}
              ></iframe>
            </div>
          </div>
        </FadeInMount>
      )}

      {/* Step 5: Footer Action */}
      {currentStep >= 5 && (
        <FadeInMount>
          <div className="complete-btn-wrapper">
            <button
              className="complete-btn"
              onClick={(e) => { e.stopPropagation(); navigate('/activity'); }}
            >
              Complete
            </button>
          </div>
        </FadeInMount>
      )}

      {/* Tap Hint */}
      {currentStep < 5 && (
        <div style={{ textAlign: 'center', opacity: 0.5, margin: '20px 0', animation: 'pulse-glow 2s infinite' }}>
          <MousePointerClick size={24} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
          Tap anywhere to continue...
        </div>
      )}

      {/* Invisible element to scroll to */}
      <div ref={bottomRef} style={{ height: '1px' }}></div>
    </div>
  );
};

