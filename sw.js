const CACHE_NAME = 'omg-fabrication-v1';
const ASSETS = [
    './',
    './index.html',
    './invoice.html',
    './contact.html',
    './style.css',
    './script.js',
    './manifest.json',
    './images.jpeg',
    './assets/hero.png',
    './assets/welding.png',
    './assets/structure.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets...');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

// Fetching assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
