/**
 * SubtractEd Service Worker
 * 
 * Strategy:
 * - PRECACHE: All app assets are cached on install with progress reporting.
 *   The precache manifest is injected at build time.
 * - NAVIGATION: All navigation requests fall back to the cached index.html
 *   (SPA support for HashRouter).
 */

// This placeholder is replaced at build time with the actual asset list
const PRECACHE_MANIFEST = self.__WB_MANIFEST || [];
const PRECACHE_NAME = 'subtracted-precache-v1';
const RUNTIME_NAME = 'subtracted-runtime-v1';

// ─── Install: Precache all assets with progress reporting ───
self.addEventListener('install', (event) => {
  event.waitUntil(precacheWithProgress());
  self.skipWaiting();
});

async function precacheWithProgress() {
  const cache = await caches.open(PRECACHE_NAME);
  const urls = PRECACHE_MANIFEST.map((entry) =>
    typeof entry === 'string' ? entry : entry.url
  );

  const total = urls.length;
  let completed = 0;
  let cachedBytes = 0;

  // Report initial state
  broadcastProgress({ status: 'downloading', completed: 0, total, bytes: 0 });

  // Download files one by one to track progress
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      cachedBytes += blob.size;
      await cache.put(url, new Response(blob, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      }));
    } catch (err) {
      console.warn(`[SW] Failed to cache: ${url}`, err);
    }

    completed++;
    broadcastProgress({
      status: 'downloading',
      completed,
      total,
      bytes: cachedBytes,
    });
  }

  broadcastProgress({ status: 'complete', completed: total, total, bytes: cachedBytes });
}

function broadcastProgress(data) {
  self.clients.matchAll({ type: 'window' }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'SW_CACHE_PROGRESS', ...data });
    });
  });
}

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
  self.clients.claim();
});

// ─── Fetch: Serve from cache, fall back to network ───
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;
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
    return networkResponse;
  } catch (error) {
    // 4. SPA fallback for navigation
    if (request.mode === 'navigate') {
      const fallback = await caches.match('./index.html', { cacheName: PRECACHE_NAME });
      if (fallback) return fallback;
    }

    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
