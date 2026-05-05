import React, { useState, useEffect } from 'react';
import './OfflineReadyBanner.css';

interface CacheProgress {
  status: 'downloading' | 'complete';
  completed: number;
  total: number;
  bytes: number;
}

/**
 * Displays a progress bar during service worker asset caching,
 * then shows a "Ready for offline use" confirmation.
 * Listens for SW_CACHE_PROGRESS messages from the service worker.
 */
export const OfflineReadyBanner: React.FC = () => {
  const [progress, setProgress] = useState<CacheProgress | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'SW_CACHE_PROGRESS') {
        const { status, completed, total, bytes } = event.data;
        setProgress({ status, completed, total, bytes });

        if (status === 'complete') {
          setShowComplete(true);
          // Auto-dismiss after 5 seconds
          setTimeout(() => setDismissed(true), 5000);
        }
      }
    };

    navigator.serviceWorker?.addEventListener('message', handler);
    return () => navigator.serviceWorker?.removeEventListener('message', handler);
  }, []);

  if (dismissed || !progress) return null;

  const percent = progress.total > 0
    ? Math.round((progress.completed / progress.total) * 100)
    : 0;

  const sizeMB = (progress.bytes / 1024 / 1024).toFixed(1);

  return (
    <div className={`offline-banner ${showComplete ? 'offline-banner--complete' : ''}`}>
      <div className="offline-banner__content">
        {showComplete ? (
          <>
            <span className="offline-banner__icon">✓</span>
            <span className="offline-banner__text">
              Ready for offline use! ({sizeMB} MB cached)
            </span>
            <button
              className="offline-banner__dismiss"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <span className="offline-banner__icon offline-banner__icon--spin">↻</span>
            <div className="offline-banner__details">
              <span className="offline-banner__text">
                Downloading for offline use… {percent}%
              </span>
              <div className="offline-banner__bar-track">
                <div
                  className="offline-banner__bar-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="offline-banner__meta">
                {progress.completed} / {progress.total} files ({sizeMB} MB)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
