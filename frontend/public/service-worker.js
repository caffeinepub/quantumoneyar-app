const CACHE_VERSION = 'v2';
const CACHE_NAME = `quantumoney-ar-${CACHE_VERSION}`;

// Essential assets to precache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/generated/pwa-icon-192.dim_192x192.png',
  '/assets/generated/pwa-icon-512.dim_512x512.png',
  '/assets/generated/animated-universe-background.dim_1920x1080.gif',
  '/assets/generated/qmy-coin.dim_128x128.png',
  '/assets/generated/icp-coin.dim_128x128.png',
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching essential assets');
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      console.log('[Service Worker] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - network-first strategy with offline fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip canister requests (let them fail naturally if offline)
  if (url.hostname.includes('ic0.app') || url.hostname.includes('icp0.io')) {
    return;
  }

  // Network-first strategy for all other requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone response before caching
        const responseToCache = response.clone();
        
        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[Service Worker] Serving from cache:', request.url);
            return cachedResponse;
          }
          
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          // Return error for other requests
          return new Response('Offline - resource not available', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
  );
});

// Message event - handle manual updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting...');
    self.skipWaiting();
  }
});
