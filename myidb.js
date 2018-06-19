// database

function openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database

  if (!navigator.serviceWorker) {
    return Promise.resolve(); 
  }

  return idb.open('headline', 1, function(upgradeDb) {
    var store = upgradeDb.createObjectStore('headlines', {
      keyPath: 'id'
    });
    store.createIndex('by-source', 'name');
    store.createIndex('by-name', 'name');
  });
}