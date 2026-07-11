const CACHE = 'monolith-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request);
      if (cached) return cached;
      try {
        const res = await fetch(e.request);
        cache.put(e.request, res.clone());
        return res;
      } catch (err) { return cached || Response.error(); }
    })
  );
});
