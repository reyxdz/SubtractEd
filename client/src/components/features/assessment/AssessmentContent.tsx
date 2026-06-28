import React from 'react';
import { ArrowRight, Check, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroStudentImg from '../../../assets/student_clip_images/student_happy_taking_notes.png';
import './AssessmentLanding.css';

export const AssessmentContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="assessment-landing-page">
      <section className="assessment-landing-hero">
        <div className="assessment-landing-copy">
          <h1>Assessment Card</h1>
          <p>
            This section is intended for quizzes or evaluation tasks to measure student understanding of subtraction
            of integers.
          </p>

          <article className="assessment-feature-card">
            <div className="assessment-feature-icon" aria-hidden="true">
              <ClipboardCheck size={74} strokeWidth={1.8} />
              <div className="assessment-feature-icon-badge">
                <Check size={22} strokeWidth={3} />
              </div>
            </div>

            <h2>Check Your Understanding</h2>
            <p>
              Welcome to the Assessment Card. This section is intended to measure student understanding of subtraction of integers.
            </p>

            <button className="assessment-feature-cta" onClick={() => navigate('/assessment/quiz')}>
              <span>Start Assessment</span>
              <ArrowRight size={22} strokeWidth={3} />
            </button>
          </article>
        </div>

        <div className="assessment-landing-visual">
          <div className="assessment-landing-visual-frame">
            <img src={heroStudentImg} alt="Student ready for assessment" className="assessment-landing-student" />
          </div>
        </div>
      </section>
    </div>
  );
};
