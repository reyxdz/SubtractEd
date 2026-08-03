import { getActivityProgress, resetActivityProgress, type ActivityId } from './activityProgress';
import { emitProgressUpdated } from './progressEvents';
import { clearAllSessions, loadSession, SESSION_KEYS } from './sessionState';
import { crosswordLevels } from '../components/features/enrichment/crosswordData';

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
const ITEMS_PER_ACTIVITY = 15;
const ACTIVITY_COUNT = 3;
const ASSESSMENT_ITEM_COUNT = 15;

interface SavedActivityItemProgress {
  itemResults?: unknown;
}

interface SavedAssessmentItemProgress {
  questions?: unknown;
  history?: unknown;
}

interface SavedEnrichmentItemProgress {
  levelIndex?: unknown;
  correctCells?: unknown;
}

export interface LearningProgressMetrics {
  completedActivities: number;
  completedActivityIds: ActivityId[];
  completedActivityItems: number;
  totalActivityItems: number;
  activityPercentage: number;
  completedAssessmentItems: number;
  totalAssessmentItems: number;
  assessmentPercentage: number;
  completedEnrichmentItems: number;
  totalEnrichmentItems: number;
  enrichmentPercentage: number;
  exactPercentage: number;
  roundedPercentage: number;
  guideCompleted: boolean;
  assessmentCompleted: boolean;
  enrichmentCompleted: boolean;
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function toPercentage(completed: number, total: number) {
  if (total <= 0) return 0;
  return Number(((completed / total) * 100).toFixed(2));
}

function countCompletedResults(value: unknown, pendingValue: string) {
  if (!Array.isArray(value)) return 0;

  return value.filter((result) => typeof result === 'string' && result !== pendingValue).length;
}

function getActivityItemProgress(completedActivityIds: ActivityId[]) {
  const totalItems = ITEMS_PER_ACTIVITY * ACTIVITY_COUNT;
  const completedItems = ([1, 2, 3] as ActivityId[]).reduce((total, activityId) => {
    if (completedActivityIds.includes(activityId)) return total + ITEMS_PER_ACTIVITY;

    const session = loadSession<SavedActivityItemProgress>(SESSION_KEYS.activity(activityId));
    const savedItems = Math.min(
      ITEMS_PER_ACTIVITY,
      countCompletedResults(session?.itemResults, 'unanswered'),
    );

    return total + savedItems;
  }, 0);

  return {
    completedItems,
    totalItems,
    percentage: toPercentage(completedItems, totalItems),
  };
}

function getAssessmentItemProgress(assessmentCompleted: boolean) {
  const session = loadSession<SavedAssessmentItemProgress>(SESSION_KEYS.assessment);
  const savedQuestionCount = Array.isArray(session?.questions) ? session.questions.length : 0;
  const totalItems = savedQuestionCount > 0 ? savedQuestionCount : ASSESSMENT_ITEM_COUNT;
  const completedItems = assessmentCompleted
    ? totalItems
    : Math.min(totalItems, countCompletedResults(session?.history, 'pending'));

  return {
    completedItems,
    totalItems,
    percentage: toPercentage(completedItems, totalItems),
  };
}

function getLevelItemCount(levelIndex: number) {
  const level = crosswordLevels[levelIndex];
  if (!level) return 0;

  const itemKeys = new Set<string>();
  level.entries.forEach((entry) => {
    entry.cells.forEach((cell) => {
      if (cell.isBlank) itemKeys.add(`${cell.row}-${cell.col}`);
    });
  });

  return itemKeys.size;
}

function getEnrichmentItemProgress(enrichmentCompleted: boolean) {
  const levelItemCounts = crosswordLevels.map((_, index) => getLevelItemCount(index));
  const totalItems = levelItemCounts.reduce((sum, count) => sum + count, 0);

  if (enrichmentCompleted) {
    return { completedItems: totalItems, totalItems, percentage: 100 };
  }

  const completedLevelCount = Math.min(
    crosswordLevels.length,
    Math.max(0, getEnrichmentHighestUnlockedLevel() - 1),
  );
  let completedItems = levelItemCounts
    .slice(0, completedLevelCount)
    .reduce((sum, count) => sum + count, 0);

  const session = loadSession<SavedEnrichmentItemProgress>(SESSION_KEYS.enrichment);
  const sessionLevelIndex = typeof session?.levelIndex === 'number' ? session.levelIndex : -1;
  if (sessionLevelIndex >= completedLevelCount && sessionLevelIndex < crosswordLevels.length) {
    const savedItemCount = Array.isArray(session?.correctCells)
      ? new Set(session.correctCells.filter((key): key is string => typeof key === 'string')).size
      : 0;
    completedItems += Math.min(levelItemCounts[sessionLevelIndex], savedItemCount);
  }

  return {
    completedItems,
    totalItems,
    percentage: toPercentage(completedItems, totalItems),
  };
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
  } catch {
    /* ignore storage errors */
  }
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
  } catch {
    /* ignore storage errors */
  }
}

export function resetLearningProgress() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(STORAGE_KEY);
  resetActivityProgress();
  clearAllSessions();
  window.localStorage.removeItem('subtracted-enrichment-highest-unlocked');
  window.localStorage.removeItem('subtracted-enrichment-just-unlocked');
  emitProgressUpdated();
}

export function areAllActivitiesComplete() {
  return getActivityProgress().completed.length === 3;
}

export function getLearningProgressMetrics(): LearningProgressMetrics {
  const { guideCompleted, assessmentCompleted, enrichmentCompleted } = getLearningProgress();
  const completedActivityIds = getActivityProgress().completed;
  const completedActivities = completedActivityIds.length;
  const activityItems = getActivityItemProgress(completedActivityIds);
  const assessmentItems = getAssessmentItemProgress(assessmentCompleted);
  const enrichmentItems = getEnrichmentItemProgress(enrichmentCompleted);
  const exactPercentage = Number((
    (guideCompleted ? CARD_PROGRESS : 0)
    + ((activityItems.percentage / 100) * CARD_PROGRESS)
    + ((assessmentItems.percentage / 100) * CARD_PROGRESS)
    + ((enrichmentItems.percentage / 100) * CARD_PROGRESS)
  ).toFixed(2));

  return {
    completedActivities,
    completedActivityIds,
    completedActivityItems: activityItems.completedItems,
    totalActivityItems: activityItems.totalItems,
    activityPercentage: activityItems.percentage,
    completedAssessmentItems: assessmentItems.completedItems,
    totalAssessmentItems: assessmentItems.totalItems,
    assessmentPercentage: assessmentItems.percentage,
    completedEnrichmentItems: enrichmentItems.completedItems,
    totalEnrichmentItems: enrichmentItems.totalItems,
    enrichmentPercentage: enrichmentItems.percentage,
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
