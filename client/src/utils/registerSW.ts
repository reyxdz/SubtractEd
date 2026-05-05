/**
 * Service Worker Registration
 * 
 * Registers the service worker for offline support (PWA).
 * Only registers in production — the dev server handles its own serving.
 */
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service workers not supported in this browser.');
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './',
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
            console.log('[SW] New content available — reload for updates.');
          }
        });
      });

      console.log('[SW] Service worker registered successfully.');
    } catch (error) {
      console.error('[SW] Registration failed:', error);
    }
  });
}
