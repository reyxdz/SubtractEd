import React from 'react';
import { ArrowRight, ClipboardCheck, Lock, MoveHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroStudentImg from '../../../assets/student_clip_images/student_waving_smiling_holding_pencil.png';
import { getActivityProgress, isActivityUnlocked } from '../../../utils/activityProgress';
import './ActivityContent.css';

type ActivityCardData = {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
};

const ACTIVITY_CARDS: ActivityCardData[] = [
  { id: 1, title: 'Activity 1', subtitle: 'Integer Chip' },
  { id: 2, title: 'Activity 2', subtitle: 'Number line' },
  { id: 3, title: 'Activity 3', subtitle: 'Integer Rules' },
];

const IntegerChipIcon: React.FC = () => (
  <div className="activity-chip-icon" aria-hidden="true">
    <div className="activity-chip activity-chip-negative">−</div>
    <div className="activity-chip activity-chip-positive-left">+</div>
    <div className="activity-chip activity-chip-positive-right">+</div>
  </div>
);

const NumberLineIcon: React.FC = () => (
  <div className="activity-numberline-icon" aria-hidden="true">
    <div className="activity-numberline-track" />
    <div className="activity-numberline-tick tick-left" />
    <div className="activity-numberline-tick tick-mid-left" />
    <div className="activity-numberline-tick tick-zero" />
    <div className="activity-numberline-tick tick-mid-right" />
    <div className="activity-numberline-tick tick-right" />
    <MoveHorizontal size={20} className="activity-numberline-arrows" />
    <span className="activity-numberline-neg">−</span>
    <span className="activity-numberline-zero">0</span>
    <span className="activity-numberline-pos">+</span>
  </div>
);

const IntegerRulesIcon: React.FC = () => (
  <div className="activity-rules-icon" aria-hidden="true">
    <ClipboardCheck size={64} strokeWidth={1.8} />
  </div>
);

function renderCardIcon(activityId: 1 | 2 | 3) {
  if (activityId === 1) return <IntegerChipIcon />;
  if (activityId === 2) return <NumberLineIcon />;
  return <IntegerRulesIcon />;
}

export const ActivityContent: React.FC = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = React.useState<number[]>([]);

  React.useEffect(() => {
    setCompleted(getActivityProgress().completed);
  }, []);

  return (
    <div className="activity-showcase-page">
      <section className="activity-showcase-hero">
        <div className="activity-showcase-copy">
          <h1>Activity Card</h1>
          <p>
            Choose an activity to strengthen your understanding of integers through interactive practice and
            real-world examples.
          </p>

          <div className="activity-card-grid">
            {ACTIVITY_CARDS.map((card) => {
              const unlocked = isActivityUnlocked(card.id);
              const completedCard = completed.includes(card.id);

              return (
                <article
                  key={card.id}
                  className={`activity-showcase-card${unlocked ? '' : ' is-locked'}${completedCard ? ' is-complete' : ''}`}
                >
                  <div className="activity-showcase-card-inner">
                    <div className="activity-showcase-icon-wrap">
                      {renderCardIcon(card.id)}
                    </div>
                    <h2>{card.title}</h2>
                    <p>{card.subtitle}</p>

                    {unlocked ? (
                      <button
                        className="activity-showcase-cta"
                        onClick={() => navigate(`/activity/${card.id}/intro`)}
                      >
                        <span>Start Activity</span>
                        <ArrowRight size={22} strokeWidth={3} />
                      </button>
                    ) : (
                      <div className="activity-showcase-lock" aria-label={`${card.title} is locked`}>
                        <Lock size={42} strokeWidth={2.4} />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="activity-showcase-visual">
          <div className="activity-showcase-visual-frame">
            <img src={heroStudentImg} alt="Student ready for activities" className="activity-showcase-student" />
          </div>
        </div>
      </section>
    </div>
  );
};
