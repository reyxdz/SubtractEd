import { getActivityProgress, resetActivityProgress, type ActivityId } from './activityProgress';
import { emitProgressUpdated } from './progressEvents';

const STORAGE_KEY = 'subtracted-learning-progress';

export interface LearningProgressState {
  guideCompleted: boolean;
  assessmentCompleted: boolean;
  enrichmentCompleted: boolean;
}

export interface NavigationUnlockState {
  home: boolean;
  guide: boolean;
  activities: boolean;
  assessments: boolean;
  enrichment: boolean;
  about: boolean;
}

const defaultState: LearningProgressState = {
  guideCompleted: false,
  assessmentCompleted: false,
  enrichmentCompleted: false,
};

const CARD_PROGRESS = 25;
const ACTIVITY_PROGRESS = CARD_PROGRESS / 3;

export interface LearningProgressMetrics {
  completedActivities: number;
  completedActivityIds: ActivityId[];
  exactPercentage: number;
  roundedPercentage: number;
  guideCompleted: boolean;
  assessmentCompleted: boolean;
  enrichmentCompleted: boolean;
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function saveLearningProgress(state: LearningProgressState) {
  if (!isBrowser()) return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  emitProgressUpdated();
}

export function getLearningProgress(): LearningProgressState {
  if (!isBrowser()) return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw) as Partial<LearningProgressState>;

    return {
      guideCompleted: parsed.guideCompleted === true,
      assessmentCompleted: parsed.assessmentCompleted === true,
      enrichmentCompleted: parsed.enrichmentCompleted === true,
    };
  } catch {
    return defaultState;
  }
}

export function markGuideComplete() {
  const state = getLearningProgress();
  if (state.guideCompleted) return;

  saveLearningProgress({
    ...state,
    guideCompleted: true,
  });
}

export function markAssessmentComplete() {
  const state = getLearningProgress();
  if (state.assessmentCompleted) return;

  saveLearningProgress({
    ...state,
    assessmentCompleted: true,
  });
}

export function markEnrichmentComplete() {
  const state = getLearningProgress();
  if (state.enrichmentCompleted) return;

  saveLearningProgress({
    ...state,
    enrichmentCompleted: true,
  });
}

export function getEnrichmentHighestUnlockedLevel(): number {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return 1;
  try {
    const raw = window.localStorage.getItem('subtracted-enrichment-highest-unlocked');
    if (!raw) return 1;
    const val = parseInt(raw, 10);
    return isNaN(val) ? 1 : val;
  } catch {
    return 1;
  }
}

export function setEnrichmentHighestUnlockedLevel(level: number) {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return;
  try {
    window.localStorage.setItem('subtracted-enrichment-highest-unlocked', level.toString());
  } catch {}
}

export function getEnrichmentJustUnlockedLevel(): number | null {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('subtracted-enrichment-just-unlocked');
    if (!raw) return null;
    const val = parseInt(raw, 10);
    return isNaN(val) ? null : val;
  } catch {
    return null;
  }
}

export function setEnrichmentJustUnlockedLevel(level: number | null) {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return;
  try {
    if (level === null) {
      window.localStorage.removeItem('subtracted-enrichment-just-unlocked');
    } else {
      window.localStorage.setItem('subtracted-enrichment-just-unlocked', level.toString());
    }
  } catch {}
}

export function resetLearningProgress() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(STORAGE_KEY);
  resetActivityProgress();
  emitProgressUpdated();
}

export function areAllActivitiesComplete() {
  return getActivityProgress().completed.length === 3;
}

export function getLearningProgressMetrics(): LearningProgressMetrics {
  const { guideCompleted, assessmentCompleted, enrichmentCompleted } = getLearningProgress();
  const completedActivityIds = getActivityProgress().completed;
  const completedActivities = completedActivityIds.length;
  const exactPercentage = Number((
    (guideCompleted ? CARD_PROGRESS : 0)
    + (completedActivities * ACTIVITY_PROGRESS)
    + (assessmentCompleted ? CARD_PROGRESS : 0)
    + (enrichmentCompleted ? CARD_PROGRESS : 0)
  ).toFixed(2));

  return {
    completedActivities,
    completedActivityIds,
    exactPercentage,
    roundedPercentage: Math.round(exactPercentage),
    guideCompleted,
    assessmentCompleted,
    enrichmentCompleted,
  };
}

export function getNavigationUnlockState(): NavigationUnlockState {
  const { guideCompleted, assessmentCompleted } = getLearningProgress();
  const activitiesUnlocked = guideCompleted;
  const assessmentsUnlocked = activitiesUnlocked && areAllActivitiesComplete();
  const enrichmentUnlocked = assessmentsUnlocked && assessmentCompleted;

  return {
    home: true,
    guide: true,
    activities: activitiesUnlocked,
    assessments: assessmentsUnlocked,
    enrichment: enrichmentUnlocked,
    about: true,
  };
}

export function isPrimaryNavPathUnlocked(path: string) {
  const unlockState = getNavigationUnlockState();

  if (path === '/') return unlockState.home;
  if (path.startsWith('/guide')) return unlockState.guide;
  if (path.startsWith('/activity')) return unlockState.activities;
  if (path.startsWith('/assessment')) return unlockState.assessments;
  if (path.startsWith('/enrichment')) return unlockState.enrichment;
  if (path.startsWith('/about')) return unlockState.about;

  return true;
}
