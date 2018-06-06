var cacheName = 'headline';

const offlineStuff =  [
	'./index.html',
	'./css/_all-skins.min.css',
	'./css/AdminLTE.min.css',
	'./css/normalize.css',
	'./scripts/main.js',
	'./scripts/headlines.js',
	'./scripts/main.js',
	'./scripts/search.js',
	'./scripts/viewSource.js'
];

self.addEventListener('install', (e) => {
	console.log('service worker is installed!');
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log("caching stuffs...");
			return cache.addAll(offlineStuff);
		})
		);
});

self.addEventListener('activate', (e) => {
    console.log('Activating...');
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log('Keeping only needed cache...', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('fetching...', e.request.url);
    // images caching
    if (e.request.url.endsWith('.jpg') || e.request.url.endsWith('.png')) {
        e.respondWith(
            caches.match(e.request).then(response => {
                if (response) {
                    console.log('Stuffs in cache:', e.request.url);
                    return response
                };
                fetch(e.request.clone()).then(response => {
                    if (!response) {
                        console.log("we found nothing!");
                        return response;
                    }
                    caches.open(cacheName).then(cache => {
                        cache.put(e.request, response.clone());
                        return response;
                    });
                }).catch(err => {
                    console.log("something very bad happened!");
                });
            })
        );
    }
});