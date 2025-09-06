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
  // The browser creates an object of type FetchEvent.
  // This object is automatically passed as a parameter to the listener:
  // It has a special function: event.respondWith(responsePromise)

  // The respondWith function tells the browser:
  // "Instead of completing the normal network request, use the Response I'm sending here."
  // You must pass a Promise that returns a Response.
  // The browser will wait for the result and use it instead of the network.
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
          // The mode property of the Request object specifies the purpose of the request.
          // If it's set to "navigate", it means the request is to load a new HTML page.
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


/* ------------------------------------------------------------------

Common Issues and Potential Pitfalls

Caching Unsuccessful Responses: If fetch returns a 404 or 500, it will also cache the error. Therefore, 
it's best to check if (networkResponse && networkResponse.ok) before caching.

Opaque Response: Can be cached, but headers cannot be read; this may cause problems if you rely on Vary or Cache-Control.

PUT/POST/non-GET: Do not use caching for non-GET requests. You must check event.request.method === "GET".

Cache Size and Age Management: There is no TTL here; the cache may grow. You should add a policy to delete the oldest items or use size management tools.

Concurrent Process Race: If there are repeated requests to the same resource, more than one fetch may perform a put operation repeatedly—not a bug,
but it may be unnecessary.

Performance: .put() may take time; If you don't want to delay the user's response, you can not await on cache.put, 
but run it inside event.waitUntil() or leave it as an unwaited operation.

------------------------------------------------------------------- */

/* ------------------------------------------------------------------

Final Practical Tips

What to Cache: HTML pages (after considering a refresh policy), static CSS/JS files, images. Avoid caching responses containing set-cookies.

Stale Management: Consider a refresh policy (e.g., stale-while-revalidate: return the cache immediately and then refresh it in the background).

Monitor Cache Size: Manually enforce maxEntries or maxAge restrictions or use Workbox to manage them.

Track Issues: Open DevTools → Application → Cache Storage to see what's being cached, 
and open the Service Worker Console (Inspect Service Worker) to view errors and logs.

------------------------------------------------------------------- */