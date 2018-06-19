var staticCacheName = 'headline-static';
var contentImgsCache = 'images-storage'

var allCaches = [
  staticCacheName,
  contentImgsCache
];

const offlineStuff =  [
  'https://raw.githubusercontent.com/james-chege/headlines/master/index.html',
	'css/all-skins.min.css',
	'css/AdminLTE.min.css',
	'css/normalize.css',
  'css/custom.css',
  'index.js',
	'scripts/main.js',
  'scripts/sources.js',
	'scripts/headlines.js',
	'scripts/search.js',
	'scripts/viewSource.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'css/bootstrap.min.css'
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

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/index.html') {
      event.respondWith(caches.match('/index.html'));
      return;
    }
    if (requestUrl.pathname.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      event.respondWith(servePhoto(event.request));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

function servePhoto(request) {
  var storageUrl = request.url;
  console.log(storageUrl);

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

