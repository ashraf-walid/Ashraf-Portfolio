// A unique cache name per build. Using Date.now() forces a fresh cache
// every time you deploy a new version of the app.

const CACHE_VERSION = "v1.1.0"; 
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;


// A minimal offline fallback page that MUST exist in /public/offline.html
const OFFLINE_URL = "/offline.html";

/**
 * INSTALL
 * - Precache only the absolute essentials (offline fallback).
 * - We avoid precaching app routes here because in Next.js (App Router)
 *   many pages are rendered dynamically and may not be directly fetchable
 *   at install time, which would cause install to fail.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    // caches = API built-in object
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL))
  );

  // Tells the browser “do not wait”.
  // The new Service Worker will activate immediately, even if old tabs are still open.
  // Without this, the new SW stays in waiting mode until all old pages are closed.
  self.skipWaiting();
});

/**
 * ACTIVATE
 * - Clean up old caches so users don’t get stale assets after a new deploy.
 * - Take control of open clients so the new SW applies without a manual refresh.
 * - Notify open clients that a new version is active.
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 1) Clean up old caches
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );

      // 2) Take control of all open tabs
      await self.clients.claim();

      // 3) Notify all controlled windows that a new version is active
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of clients) {
        client.postMessage({
          type: "SW_UPDATE_AVAILABLE",
          version: CACHE_VERSION,
          message: "App updated, tap to reinstall.",
        });
      }
    })()
  );
});

/**
 * FETCH
 * Strategy:
 * 1) API -> Network Only (Never cache)
 * 2) HTML Navigation -> Network First (Fresh content), Fallback to Cache, then Offline
 * 3) Static Assets -> Cache First (Speed), Fallback to Network
 */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // 1) IGNORE /api/ requests (Always go to network, never cache)
  if (url.pathname.startsWith("/api/")) {
    return; 
  }

  // 2) HTML Navigation -> Network First, Fallback to Cache, then Offline
  if (event.request.mode === "navigate" || event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          // Try Network
          const networkResponse = await fetch(event.request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          // Fallback to Cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          
          // Fallback to Offline Page
          const offlineResponse = await caches.match(OFFLINE_URL);
          if (offlineResponse) return offlineResponse;

          return new Response("Offline", { status: 503, statusText: "Offline" });
        }
      })()
    );
    return;
  }

  // 3) Static Assets (Images, CSS, JS) -> Cache First, Fallback to Network
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (err) {
        return new Response("", { status: 404, statusText: "Not Found" });
      }
    })()
  );
});