
// Service Worker per Piano Alimentare PWA

const CACHE_NAME = 'piano-alimentare-v1';

// ✅ Percorsi relativi per GitHub Pages
const urlsToCache = [
  './piano-alimentare-pwa.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installazione: salva i file nella cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Attivazione: pulizia delle vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch: Cache-first con fallback alla rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
