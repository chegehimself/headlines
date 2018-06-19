// register service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('headlines/service-worker.js');
}