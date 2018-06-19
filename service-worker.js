var staticCacheName = 'headline-static';

const offlineStuff =  [
	'./james-chege/headlines/index.html',
	'./james-chege/headlines/css/_all-skins.min.css',
	'./james-chege/headlines/css/AdminLTE.min.css',
	'./james-chege/headlines/css/normalize.css',
	'./james-chege/headlines/scripts/main.js',
	'./james-chege/headlines/scripts/headlines.js',
	'./james-chege/headlines/scripts/main.js',
	'./james-chege/headlines/scripts/search.js',
	'/james-chege/headlines/scripts/viewSource.js',
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
