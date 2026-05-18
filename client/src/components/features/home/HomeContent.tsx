import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Pencil,
  Rocket,
  Sparkles,
  Star,
  UsersRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import subtractedLogo from '../../../assets/subtracted_logo.png';
import textLogo from '../../../assets/images/text_logo.png';
import harryAvatar from '../../../assets/researchers/harryArnold.png';
import imaeAvatar from '../../../assets/researchers/imaeCuesta.png';
import { useLearningProgressMetrics } from '../../../hooks/useLearningProgressMetrics';
import { useNavigationUnlockState } from '../../../hooks/useNavigationUnlockState';
import { resetLearningProgress } from '../../../utils/learningProgress';
import './HomeContent.css';

const LEARNING_CARDS = [
  { id: 1, title: 'Guide Card', icon: BookOpen, accent: 'blue', path: '/guide', unlockKey: 'guide' },
  { id: 2, title: 'Activity Card', icon: Pencil, accent: 'green', path: '/activity', unlockKey: 'activities' },
  { id: 3, title: 'Assessment Card', icon: ClipboardCheck, accent: 'purple', path: '/assessment', unlockKey: 'assessments' },
  { id: 4, title: 'Enrichment Card', icon: Star, accent: 'yellow', path: '/enrichment', unlockKey: 'enrichment' },
] as const;

const REFERENCES = [
  {
    label: 'Math Isip. Subtraction of Integers.',
    href: 'https://www.youtube.com/watch?v=Er79fRnUK24',
  },
  {
    label: 'Math with Mr. J. Parts of a Subtraction Problem.',
    href: 'https://www.youtube.com/watch?v=EDCrtkT_JeA',
  },
  {
    label: 'DepEd Tambayan. Grade 6 Mathematics Module.',
    href: 'https://depedtambayan.net/grade-6-mathematics-module-subtracting-integers/',
  },
];

const RESEARCHERS = [
  {
    name: 'Harry Arnold C. Salele',
    image: harryAvatar,
    description:
      'Harry is currently a preservice teacher with a strong interest in making mathematics more accessible and engaging for students.',
  },
  {
    name: 'Imae Cuesta',
    image: imaeAvatar,
    description:
      'Imae is a third-year pre-service teacher with a deep passion for Mathematics and a strong focus on completing her university thesis work.',
  },
] as const;

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();
  const [openPanel, setOpenPanel] = React.useState<'researchers' | 'references' | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
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

  const togglePanel = (panel: 'researchers' | 'references') => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const handleResetProgress = () => {
    resetLearningProgress();
    setIsResetModalOpen(false);
  };

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-kicker">
            <Sparkles size={16} />
            <span>Strategic. Engaging. Effective.</span>
          </div>

          <h1 className="home-title">
            Master Integer
            <br />
            Subtraction
            <br />
            <span>the Smart Way</span>
          </h1>

          <p className="home-description">
            SubtractEd is a strategic intervention material designed to help students
            build confidence and mastery in subtraction of integers through guided
            lessons, engaging activities, and meaningful practice.
          </p>

          <Button className="home-hero-cta" onClick={() => navigate('/guide')}>
            <Rocket size={18} />
            <span>Start Learning</span>
          </Button>
        </div>

        <div className="home-hero-stage">
          <div className="home-logo-showcase">
            <img src={subtractedLogo} alt="SubtractEd logo" className="home-logo-mark" />
            <img src={textLogo} alt="SubtractEd" className="home-logo-wordmark-image" />
          </div>
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

      <section className="home-info-grid">
        <article className={`home-info-card info-card-blue${openPanel === 'researchers' ? ' is-open' : ''}`}>
          <div className="home-info-summary">
            <div className="home-info-topline">
              <div className="home-info-icon">
                <UsersRound size={30} />
              </div>
              <div className="home-info-heading-group">
                <h3>About the Researchers</h3>
                <p>
                  Meet the team behind SubtractEd, educators and researchers
                  passionate about helping students succeed in mathematics.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="home-corner-toggle"
              aria-expanded={openPanel === 'researchers'}
              aria-label="Toggle About the Researchers"
              onClick={() => togglePanel('researchers')}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="home-info-actions">
            <button type="button" className="home-inline-link" onClick={() => navigate('/about')}>
              <span>Learn More</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="home-info-content">
            <div className="home-info-expanded">
              <p>
                Harry Arnold C. Salele and Imae Cuesta are the researchers behind
                SubtractEd, bringing classroom-centered mathematics support into a
                more approachable and engaging format for students.
              </p>

              <div className="home-researcher-list">
                {RESEARCHERS.map((researcher) => (
                  <article key={researcher.name} className="home-researcher-item">
                    <img
                      src={researcher.image}
                      alt={researcher.name}
                      className="home-researcher-item-avatar"
                    />
                    <div className="home-researcher-item-copy">
                      <h4>{researcher.name}</h4>
                      <p>{researcher.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <button type="button" className="home-inline-link" onClick={() => navigate('/about')}>
                <span>Open About Page</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </article>

        <article className={`home-info-card info-card-lilac${openPanel === 'references' ? ' is-open' : ''}`}>
          <div className="home-info-summary">
            <div className="home-info-topline">
              <div className="home-info-icon home-info-docs">
                <ClipboardCheck size={28} />
              </div>
              <div className="home-info-heading-group">
                <h3>References</h3>
                <p>
                  Explore the research and resources that informed the development
                  of SubtractEd.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="home-corner-toggle"
              aria-expanded={openPanel === 'references'}
              aria-label="Toggle References"
              onClick={() => togglePanel('references')}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="home-info-actions">
            <button
              type="button"
              className="home-inline-link"
              onClick={() => window.open(REFERENCES[2].href, '_blank', 'noopener,noreferrer')}
            >
              <span>View References</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="home-info-content">
            <div className="home-info-expanded">
              <div className="home-reference-preview">
                {REFERENCES.map((reference) => (
                  <a key={reference.href} href={reference.href} target="_blank" rel="noopener noreferrer">
                    {reference.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </article>
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

    </div>
  );
};
