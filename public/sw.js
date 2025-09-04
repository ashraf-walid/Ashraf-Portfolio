// A unique cache name per build. Using Date.now() forces a fresh cache
// every time you deploy a new version of the app.
const CACHE_NAME = "portfolio-cache-" + Date.now();

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
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          // Delete any cache that doesn’t match the current name
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );

  // Makes the new Service Worker take control of all open tabs/pages right away.
  // Without this, the new SW will only control pages after a refresh.
  self.clients.claim();
});

/**
 * FETCH
 * Strategy:
 * 1) Try cache first (fast return if we already stored it).
 * 2) If not cached, fetch from network and cache the successful response
 *    for future offline use (on-demand caching).
 * 3) If network fails AND the request is for a navigation (HTML page),
 *    serve the offline fallback page.
 *
 * Notes:
 * - We only handle GET requests; non-GET (POST/PUT/DELETE…) should go to network.
 * - Opaque responses (cross-origin without CORS) can still be cached, so we keep them.
 */
self.addEventListener("fetch", (event) => {
  
  if (event.request.method !== "GET") return; // Ignore non-GET requests
  event.respondWith(
    (async () => {
      // 1) Serve from cache if present
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        // 2) Fetch from network
        const networkResponse = await fetch(event.request);

        // Cache a clone of the response for next time (best-effort; ignore failures)
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());

        return networkResponse;
      } catch (err) {
        // 3) Network failed: if it's a navigation request, show offline fallback
        const isHTMLNavigation =
          event.request.mode === "navigate" ||
          (event.request.headers.get("accept") || "").includes("text/html");

        if (isHTMLNavigation) {
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
        }

        // For non-HTML requests with no cache and offline, just fail silently
        // (you could return a placeholder image/file here if you want).
        return new Response("", { status: 503, statusText: "Offline" });
      }
    })()
  );
});

/* ------------------------------------------------------------------
   OPTIONAL: If you want certain routes to be available offline on
   the very first visit (precache), you can add them manually.
   Beware: These must be fetchable at install time or install will fail.

   Example:

   const PAGES_TO_PRECACHE = ["/", "/about", "/projects", "/contact"];
   self.addEventListener("install", (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME).then((cache) =>
         cache.addAll([OFFLINE_URL, ...PAGES_TO_PRECACHE])
       )
     );
     self.skipWaiting();
   });

------------------------------------------------------------------- */
