const CACHE_NAME = 'waktusolat-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './zones.js',
    './icon.svg',
    './manifest.json'
];

// Install Event: Cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event: Stale-while-revalidate for static, Network-first for API
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // API should be network-first (fresh data)
    if (url.pathname.includes('proxy.php') || url.pathname.includes('esolatApi')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request); // Fallback to cache if offline
            })
        );
        return;
    }

    // Static assets: Stale-while-revalidate
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            });
            return cachedResponse || fetchPromise;
        })
    );
});
