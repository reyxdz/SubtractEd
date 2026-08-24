import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ClipboardCheck, MousePointerClick } from 'lucide-react';
import confusedStudentImg from '../../../assets/student_clip_images/student_scratching_head_wondering.png';
import heroStudentImg from '../../../assets/student_clip_images/student_has_an_idea.png';
import teacherImg from '../../../assets/teacher_clip_images/teacher_smiling_clapping.png';
import guideVideo from '../../../assets/videos/guide_page_video.mp4';
import { markGuideComplete } from '../../../utils/learningProgress';
import './GuideContent.css';

const FadeInMount: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
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
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleTap = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (currentStep > 1 && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [currentStep]);

  return (
    <div
      className="guide-page-container"
      onClick={handleTap}
      style={{ cursor: currentStep < 5 ? 'pointer' : 'default', minHeight: '100vh' }}
    >
      <div className="guide-shell">
        <section className="guide-hero-card">
          <div className="guide-hero-copy">
            <div className="guide-hero-heading">
              <h1 className="guide-title-display">Guide Card</h1>
              <p className="guide-title-description">
                Follow this guided lesson to understand how to subtract integers with confidence and clarity.
              </p>
            </div>

            {currentStep >= 1 && (
              <FadeInMount>
                <div className="guide-dialogue dialogue-student">
                  <div className="guide-dialogue-avatar">
                    <img src={confusedStudentImg} alt="Student confused" className="guide-dialogue-image" />
                  </div>
                  <div className="guide-dialogue-bubble guide-dialogue-bubble-cream guide-dialogue-bubble-left">
                    This is so confusing,
                    <br />
                    I cannot subtract integers.
                  </div>
                </div>
              </FadeInMount>
            )}

            {currentStep >= 2 && (
              <FadeInMount>
                <div className="guide-dialogue dialogue-teacher">
                  <div className="guide-dialogue-bubble guide-dialogue-bubble-white guide-dialogue-bubble-right">
                    Do not worry, Intoy. It is actually very simple. <strong>SubtractEd</strong> is here to help you.
                  </div>
                  <div className="guide-dialogue-avatar guide-dialogue-avatar-small">
                    <img src={teacherImg} alt="Teacher helpful" className="guide-dialogue-image" />
                  </div>
                </div>
              </FadeInMount>
            )}
          </div>

          <div className="guide-hero-figure">
            <div className="guide-hero-figure-frame">
              <img src={heroStudentImg} alt="Student learning confidently" className="guide-hero-image" />
            </div>
          </div>
        </section>

        <div className="guide-stage-stack">
          {currentStep >= 3 && (
            <FadeInMount>
              <section className="guide-panel guide-panel-competency">
                <div className="guide-competency-icon" aria-hidden="true">
                  <ClipboardCheck size={54} strokeWidth={2.2} />
                  <div className="guide-competency-icon-badge">
                    <Check size={20} strokeWidth={3} />
                  </div>
                </div>
                <div className="guide-competency-content">
                  <h2>Learning Competency</h2>
                  <p>
                    Subtract integers using concrete models such as counters and integer chips,
                    pictorial models such as bar models and number lines, and with integers written as numerals.
                  </p>
                  <h2 style={{ marginTop: '1rem' }}>Objectives</h2>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: '0.5rem 0' }}>
                    <li style={{ marginBottom: '0.25rem' }}><strong>Objective 1:</strong> Solve integer subtraction problems using virtual chips inside the digital workspace.</li>
                    <li style={{ marginBottom: '0.25rem' }}><strong>Objective 2:</strong> Solve integer subtraction problems by moving an interactive character along a horizontal number line.</li>
                    <li><strong>Objective 3:</strong> Solve integer subtraction problems written as numerals by executing the three-step Keep-Change-Change rule.</li>
                  </ul>
                  <h2 style={{ marginTop: '1rem' }}>Purpose of the Material</h2>
                  <p>
                    This material helps Grade 7 learners understand and solve integer subtraction problems using models, number lines, and simple rules. It aims to develop their skills in subtracting integers and applying these skills to solve mathematical problems.
                  </p>
                </div>
              </section>
            </FadeInMount>
          )}

          {currentStep >= 4 && (
            <FadeInMount>
              <section className="guide-panel guide-panel-video">
                <div className="guide-panel-chip">Introduction</div>
                <div className="guide-video-frame" onClick={(e) => e.stopPropagation()}>
                  <video
                    className="guide-video-element"
                    controls
                    preload="metadata"
                    onEnded={() => setIsVideoFinished(true)}
                  >
                    <source src={guideVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>
            </FadeInMount>
          )}

          {currentStep >= 5 && (
            <FadeInMount>
              <div className="complete-btn-wrapper">
                <button
                  className="complete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isVideoFinished) return;
                    markGuideComplete();
                    navigate('/activity');
                  }}
                  disabled={!isVideoFinished}
                  style={{ opacity: isVideoFinished ? 1 : 0.6, cursor: isVideoFinished ? 'pointer' : 'not-allowed' }}
                >
                  Complete
                </button>
                {!isVideoFinished && (
                  <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>
                    Note: You can only click “Complete” when you have FINISHED the video.
                  </p>
                )}
              </div>
            </FadeInMount>
          )}

          {currentStep < 5 && (
            <div className="guide-tap-hint">
              <MousePointerClick size={24} />
              <span>Tap anywhere to continue...</span>
            </div>
          )}
        </div>

        <div ref={bottomRef} style={{ height: '1px' }}></div>
      </div>
    </div>
  );
};
