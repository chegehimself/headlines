// register service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://raw.githubusercontent.com/james-chege/headlines/master/service-worker.js');
}