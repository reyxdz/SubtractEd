import React from 'react';
import { ArrowLeft, BookOpen, ClipboardCheck, Pencil, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgressMetrics } from '../../../hooks/useLearningProgressMetrics';
import './ProgressContent.css';

type ProgressRow = {
  title: string;
  percentage: number;
  accent: 'blue' | 'green' | 'purple' | 'yellow';
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

function formatPercent(value: number) {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2)}%`;
}

export const ProgressContent: React.FC = () => {
  const navigate = useNavigate();
  const progress = useLearningProgressMetrics();
  const overallPercent = progress.exactPercentage;
  const overallLabel = formatPercent(overallPercent);

  const rows: ProgressRow[] = [
    { title: 'Guide Card', percentage: progress.guideCompleted ? 100 : 0, accent: 'blue', icon: BookOpen },
    { title: 'Activity Card', percentage: progress.activityPercentage, accent: 'green', icon: Pencil },
    { title: 'Assessment Card', percentage: progress.assessmentPercentage, accent: 'purple', icon: ClipboardCheck },
    { title: 'Enrichment Card', percentage: progress.enrichmentPercentage, accent: 'yellow', icon: Star },
  ];

  const headline = overallPercent === 100
    ? 'Excellent work!'
    : overallPercent >= 75
      ? 'Great progress!'
      : overallPercent >= 25
        ? 'Keep going!'
        : 'You are getting started!';

  const message = overallPercent === 100
    ? "You've mastered everything. Keep shining!"
    : `You've completed ${overallLabel} of your learning journey.`;

  const remainingActivityItems = progress.totalActivityItems - progress.completedActivityItems;
  const remainingAssessmentItems = progress.totalAssessmentItems - progress.completedAssessmentItems;
  const remainingEnrichmentItems = progress.totalEnrichmentItems - progress.completedEnrichmentItems;
  const subMessage = progress.guideCompleted && remainingActivityItems > 0
    ? `You still have ${remainingActivityItems} activity item${remainingActivityItems === 1 ? '' : 's'} to finish.`
    : !progress.guideCompleted
      ? 'Complete the Guide Card first to unlock the next steps.'
      : remainingAssessmentItems > 0
        ? `You still have ${remainingAssessmentItems} assessment item${remainingAssessmentItems === 1 ? '' : 's'} to finish.`
        : remainingEnrichmentItems > 0
          ? `You still have ${remainingEnrichmentItems} enrichment item${remainingEnrichmentItems === 1 ? '' : 's'} to finish.`
          : 'Your full learning journey is complete.';

  return (
    <div className="progress-page">
      <section className="progress-overview">
        <div className="progress-copy">
          <button type="button" className="progress-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>

          <h1>Your Progress</h1>
          <p>
            Track your learning journey and celebrate every step forward.
          </p>
        </div>

        <article className="progress-hero-card">
          <div
            className="progress-hero-ring"
            style={{ background: `conic-gradient(#3b82f6 0 ${overallPercent}%, #e4ecfb ${overallPercent}% 100%)` }}
          >
            <div className="progress-hero-ring-inner">
              <strong>{overallLabel}</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="progress-hero-text">
            <h2>{headline}</h2>
            <p>{message}</p>
            <p>{subMessage}</p>
          </div>
        </article>
      </section>

      <section className="progress-breakdown">
        <div className="progress-breakdown-heading">
          <h2>Progress Breakdown</h2>
          <p>See your progress for each card category.</p>
        </div>

        <div className="progress-breakdown-list">
          {rows.map((row) => {
            const Icon = row.icon;
            const percentLabel = formatPercent(row.percentage);

            return (
              <article key={row.title} className="progress-row-card">
                <div className={`progress-row-icon ${row.accent}`}>
                  <Icon size={34} strokeWidth={2.2} />
                </div>

                <div className="progress-row-title">{row.title}</div>

                <div className="progress-row-track">
                  <div
                    className={`progress-row-fill ${row.accent}`}
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>

                <div className={`progress-row-badge ${row.accent}`}>
                  {percentLabel}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
