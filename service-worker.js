var staticCacheName = 'headline-static';

const offlineStuff =  [
	'./index.html',
	'./css/_all-skins.min.css',
	'./css/AdminLTE.min.css',
	'./css/normalize.css',
	'./scripts/main.js',
	'./scripts/headlines.js',
	'./scripts/main.js',
	'./scripts/search.js',
	'/scripts/viewSource.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css'
];

self.addEventListener('install', (event) => {
	console.log('service worker is installed!');
	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			console.log("caching stuffs...");
			return cache.addAll(offlineStuff);
		})
		);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('headline-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
