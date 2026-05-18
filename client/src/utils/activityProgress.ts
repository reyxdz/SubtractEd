import { emitProgressUpdated } from './progressEvents';

export type ActivityId = 1 | 2 | 3;

const STORAGE_KEY = 'subtracted-activity-progress';

export interface ActivityProgressState {
  completed: ActivityId[];
}

const defaultState: ActivityProgressState = {
  completed: [],
};

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getActivityProgress(): ActivityProgressState {
  if (!isBrowser()) return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw) as Partial<ActivityProgressState>;
    const completed = Array.isArray(parsed.completed)
      ? parsed.completed.filter((value): value is ActivityId => value === 1 || value === 2 || value === 3)
      : [];

    return { completed };
  } catch {
    return defaultState;
  }
}

export function markActivityComplete(activityId: ActivityId) {
  if (!isBrowser()) return;

  const state = getActivityProgress();
  if (state.completed.includes(activityId)) return;

  const nextState: ActivityProgressState = {
    completed: [...state.completed, activityId].sort(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  emitProgressUpdated();
}

export function resetActivityProgress() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(STORAGE_KEY);
  emitProgressUpdated();
}

export function isActivityComplete(activityId: ActivityId) {
  return getActivityProgress().completed.includes(activityId);
}

export function isActivityUnlocked(activityId: ActivityId) {
  if (activityId === 1) return true;
  if (activityId === 2) return isActivityComplete(1);
  return isActivityComplete(2);
}
