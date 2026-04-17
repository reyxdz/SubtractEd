import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import studentImg from '../../../assets/student_clip_images/student_scratching_head_wondering.png';
import teacherImg from '../../../assets/teacher_clip_images/teacher_smiling_clapping.png';
import { TopBar } from '../../layout/TopBar';
import './GuideContent.css';

// Intersection Observer wrapper component
const FadeInSection: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px" // Trigger slightly above bottom fold
    });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
      style={{ transitionDelay: `${isVisible ? delay : 0}ms` }}
    >
      {children}
    </div>
  );
};

export const GuideContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-page-container">
      {/* Header */}
      <header className="guide-header">
        <button className="neo-btn back-chip" onClick={() => navigate('/')}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill">Guide Card</h1>
        <TopBar />
      </header>

      {/* Intro Scene (Student) */}
      <FadeInSection delay={100}>
        <div className="speech-row left-only">
          <div className="character-box">
            <img src={studentImg} alt="Student confused" className="character-img" />
          </div>
          <div className="speech-card speech-cream left-tail">
            This is so confusing,<br />
            I cannot subtract integers.
          </div>
        </div>
      </FadeInSection>

      {/* Intro Scene (Teacher) */}
      <FadeInSection delay={200}>
        <div className="speech-row right-only">
          <div className="speech-card speech-white right-tail">
            Do not worry, Intoy. It is actually very simple. <strong>SubtractEd</strong> is here to help you.
          </div>
          <div className="character-box">
            <img src={teacherImg} alt="Teacher helpful" className="character-img" />
          </div>
        </div>
      </FadeInSection>

      {/* Learning Competency */}
      <FadeInSection delay={150}>
        <div className="competency-layout">
          <div className="character-box" style={{ paddingBottom: '10px' }}>
            {/* Same or different student avatar could be used here */}
            <img src={studentImg} alt="Student" style={{ width: '100px' }} className="character-img" />
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
      </FadeInSection>

      {/* Video Block */}
      <FadeInSection delay={200}>
        <div className="video-wrapper" style={{ textAlign: 'center' }}>
          <div className="video-title-pill">Introduction</div>
          <div className="video-player">
            <div className="video-screen">
              <div className="play-circle">
                <Play fill="currentColor" size={32} style={{ marginLeft: '4px' }} />
              </div>
            </div>
            <div className="video-controls">
              <span>0:00</span>
              <div className="progress-bar"></div>
              <span>🔊 ⛶</span>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Footer Action */}
      <FadeInSection delay={100}>
        <div className="complete-btn-wrapper">
          <button className="complete-btn" onClick={() => navigate('/activity')}>
            Complete
          </button>
        </div>
      </FadeInSection>

    </div>
  );
};
