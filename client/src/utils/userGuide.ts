const STORAGE_KEY = 'subtracted-guide-dismissed';

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Whether the user has dismissed the "How to Use" guide with the
 * "Do not remind me again" option. When false, the guide auto-opens
 * for first-time users.
 */
export function hasDismissedGuide(): boolean {
  if (!isBrowser()) return false;

  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setGuideDismissed(dismissed: boolean) {
  if (!isBrowser()) return;

  try {
    if (dismissed) {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* ignore storage errors */
  }
}
