const PROGRESS_UPDATED_EVENT = 'subtracted-progress-updated';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function emitProgressUpdated() {
  if (!isBrowser()) return;

  window.dispatchEvent(new Event(PROGRESS_UPDATED_EVENT));
}

export function subscribeToProgressUpdates(listener: () => void) {
  if (!isBrowser()) {
    return () => undefined;
  }

  const handleProgressUpdate = () => listener();

  window.addEventListener('storage', handleProgressUpdate);
  window.addEventListener(PROGRESS_UPDATED_EVENT, handleProgressUpdate);

  return () => {
    window.removeEventListener('storage', handleProgressUpdate);
    window.removeEventListener(PROGRESS_UPDATED_EVENT, handleProgressUpdate);
  };
}
