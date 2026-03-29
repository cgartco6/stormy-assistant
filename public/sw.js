const CACHE_NAME = 'stormy-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
