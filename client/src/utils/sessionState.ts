// Generic per-feature "resume where you left off" persistence.
// Stores an in-progress snapshot for an activity/assessment/enrichment level so
// a refresh or exit restores the exact question set, answers, and position.

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const SESSION_KEYS = {
  activity: (n: number) => `subtracted-activity-${n}-session`,
  assessment: 'subtracted-assessment-session',
  enrichment: 'subtracted-enrichment-session',
} as const;

export const ALL_SESSION_KEYS: string[] = [
  SESSION_KEYS.activity(1),
  SESSION_KEYS.activity(2),
  SESSION_KEYS.activity(3),
  SESSION_KEYS.assessment,
  SESSION_KEYS.enrichment,
];

export function saveSession<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / serialization errors */
  }
}

export function loadSession<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function clearSession(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function clearAllSessions(): void {
  ALL_SESSION_KEYS.forEach(clearSession);
}
