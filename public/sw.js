const CACHE_NAME = "portfolio-cache-v2";
const OFFLINE_URL = "/offline.html";

// عند التثبيت: خزّن بس صفحة offline.html والأصول الثابتة
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(OFFLINE_URL);
    })
  );
});

// عند الطلب
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // رجع من الكاش لو موجود
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // خزّن نسخة من الطلب الجديد في الكاش
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // fallback لو مفيش إنترنت
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});

// تنظيف الكاش القديم
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
