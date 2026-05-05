/**
 * SubtractEd Service Worker
 * 
 * Strategy:
 * - PRECACHE: The app shell (HTML, CSS, JS, fonts, images) is cached on install
 *   using a versioned precache manifest injected at build time.
 * - RUNTIME CACHE: Large media files (audio, video) are cached on first access
 *   using a Cache-First strategy, so they don't block the initial install.
 * - NAVIGATION: All navigation requests fall back to the cached index.html
 *   (SPA support for HashRouter).
 */

// This placeholder is replaced at build time with the actual asset list
const PRECACHE_MANIFEST = self.__WB_MANIFEST || [];
const PRECACHE_NAME = 'subtracted-precache-v1';
const RUNTIME_NAME = 'subtracted-runtime-v1';

// ─── Install: Precache the app shell ───
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE_NAME).then((cache) => {
      const urls = PRECACHE_MANIFEST.map((entry) =>
        typeof entry === 'string' ? entry : entry.url
      );
      return cache.addAll(urls);
    })
  );
  // Activate immediately without waiting for old SW to finish
  self.skipWaiting();
});

// ─── Activate: Clean up old caches ───
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== PRECACHE_NAME && name !== RUNTIME_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all open tabs immediately
  self.clients.claim();
});

// ─── Fetch: Serve from cache, fall back to network ───
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (e.g. analytics, external APIs)
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  // 1. Check precache first
  const precacheResponse = await caches.match(request, { cacheName: PRECACHE_NAME });
  if (precacheResponse) return precacheResponse;

  // 2. Check runtime cache
  const runtimeResponse = await caches.match(request, { cacheName: RUNTIME_NAME });
  if (runtimeResponse) return runtimeResponse;

  // 3. Try network
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses for large media (audio/video)
    if (networkResponse.ok && isMediaRequest(request.url)) {
      const cache = await caches.open(RUNTIME_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // 4. For navigation requests, serve the cached index.html (SPA fallback)
    if (request.mode === 'navigate') {
      const fallback = await caches.match('./index.html', { cacheName: PRECACHE_NAME });
      if (fallback) return fallback;
    }

    // Nothing worked — return a basic offline response
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

function isMediaRequest(url) {
  return /\.(mp3|flac|ogg|mp4|webm|wav)(\?.*)?$/i.test(url);
}
