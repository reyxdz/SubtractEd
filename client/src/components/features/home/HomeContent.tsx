import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Pencil,
  Rocket,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { useLearningProgressMetrics } from '../../../hooks/useLearningProgressMetrics';
import { useNavigationUnlockState } from '../../../hooks/useNavigationUnlockState';
import { useUserGuide } from '../../../hooks/useUserGuide';
import { resetLearningProgress } from '../../../utils/learningProgress';
import './HomeContent.css';

const LEARNING_CARDS = [
  { id: 1, title: 'Guide Card', icon: BookOpen, accent: 'blue', path: '/guide', unlockKey: 'guide' },
  { id: 2, title: 'Activity Card', icon: Pencil, accent: 'green', path: '/activity', unlockKey: 'activities' },
  { id: 3, title: 'Assessment Card', icon: ClipboardCheck, accent: 'purple', path: '/assessment', unlockKey: 'assessments' },
  { id: 4, title: 'Enrichment Card', icon: Star, accent: 'yellow', path: '/enrichment', unlockKey: 'enrichment' },
] as const;

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
  const { openGuide } = useUserGuide();
  const unlockState = useNavigationUnlockState();
  const progress = useLearningProgressMetrics();
  const progressLabel = Number.isInteger(progress.exactPercentage)
    ? `${progress.exactPercentage}%`
    : `${progress.exactPercentage.toFixed(2)}%`;

  const progressHeading = progress.exactPercentage === 100
    ? 'All done!'
    : progress.exactPercentage >= 75
      ? 'Almost there!'
      : progress.exactPercentage >= 25
        ? 'Keep it up!'
        : 'Great start!';

  const progressMessage = progress.enrichmentCompleted
    ? 'You completed every card.'
    : !progress.guideCompleted
      ? 'Finish the guide to unlock more.'
      : progress.completedActivities < 3
        ? `${3 - progress.completedActivities} activit${3 - progress.completedActivities === 1 ? 'y' : 'ies'} left to finish.`
        : !progress.assessmentCompleted
          ? 'Assessment is ready for you.'
          : 'Finish enrichment to reach 100%.';


  const handleResetProgress = () => {
    resetLearningProgress();
    setIsResetModalOpen(false);
    // Re-show the "How to Use" guide after a reset, as for a first-time user.
    openGuide();
  };

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1 className="home-title">
            Welcome to SubtractEd!
          </h1>

          <p className="home-description">
            Let's continue your learning journey.
          </p>

          <Button className="home-hero-cta" onClick={() => navigate('/guide')}>
            <Rocket size={18} />
            <span>Start Learning</span>
          </Button>
        </div>


        <aside className="home-progress-card">
          <div className="home-progress-header">
            <BarChart3 size={18} />
            <span>Your Progress</span>
          </div>

          <div
            className="home-progress-ring"
            style={{ background: `conic-gradient(var(--theme-primary) 0 ${progress.exactPercentage}%, #e9effa ${progress.exactPercentage}% 100%)` }}
          >
            <div className="home-progress-ring-inner">
              <strong>{progressLabel}</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="home-progress-copy">
            <h2>{progressHeading}</h2>
            <p>{progressMessage}</p>
          </div>

          <div className="home-progress-actions">
            <button
              type="button"
              className="home-inline-link"
              onClick={() => navigate('/progress')}
            >
              <span>View Progress</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="home-inline-link home-inline-link-reset"
              onClick={() => setIsResetModalOpen(true)}
            >
              <span>Reset</span>
            </button>
          </div>
        </aside>
      </section>

      <section className="cards-grid">
        {LEARNING_CARDS.map((card) => {
          const IconComponent = card.icon;
          const unlocked = unlockState[card.unlockKey];

          return (
            <button
              key={card.id}
              type="button"
              className={`module-card${unlocked ? '' : ' is-locked'}`}
              onClick={unlocked ? () => navigate(card.path) : undefined}
              disabled={!unlocked}
            >
              <div className={`card-icon-wrapper card-icon-${card.accent}`}>
                <IconComponent size={34} strokeWidth={2.3} />
              </div>

              <div className="card-copy">
                <h2 className="card-title">{card.title}</h2>
              </div>

              <span className={`card-arrow card-arrow-${card.accent}`}>
                <ArrowRight size={16} />
              </span>
            </button>
          );
        })}
      </section>



      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Progress?"
        type="error"
        contentClassName="home-reset-dialog"
        actions={(
          <div className="home-reset-actions">
            <button
              type="button"
              className="home-reset-btn home-reset-btn-cancel"
              onClick={() => setIsResetModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="home-reset-btn home-reset-btn-confirm"
              onClick={handleResetProgress}
            >
              Reset Progress
            </button>
          </div>
        )}
      >
        <div className="home-reset-copy">
          <p>
            This will clear all saved progress for this user on this device.
          </p>
          <p>
            Guide, activities, assessment, and enrichment progress will all be reset to zero.
          </p>
        </div>
      </Modal>

      <footer className="home-footer">
        © 2026 SubtractEd. All rights reserved.
      </footer>
    </div>
  );
};