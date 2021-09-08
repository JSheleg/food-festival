//define global constants
const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;


//define files we'd like to cache
//img not added as they would take up the limited cache data
//cache ranges from 50MB to 250MB, priority goes to files that keep the site functional
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];



//install service worker by adding files to precache so app can use cache
//self refers to the service worker
self.addEventListener('install', function (e) {
    //browser waits till work is complete before terminating service worker
    //ensures service worker doesn't move on from the installing phase until it's finished executing all code
    e.waitUntil(
        //cache.open finds specific cache by name
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
    )

})

//activate service worker- clear out any old data from the cach and instruct the service worker how to manage caches
self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        let cacheKeeplist = keyList.filter(function(key) {
          return key.indexOf(APP_PREFIX);
        });
        cacheKeeplist.push(CACHE_NAME);
  
        return Promise.all(
          keyList.map(function(key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i]);
              return caches.delete(keyList[i]);
            }
          })
        );
      })
    );
});

//intercept fetch requests
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
      caches.match(e.request).then(function (request) {
        if (request) { // if cache is available, respond with cache
          console.log('responding with cache : ' + e.request.url)
          return request
        } else {       // if there are no cache, try fetching request
          console.log('file is not cached, fetching : ' + e.request.url)
          return fetch(e.request)
        }
  
        // You can omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)
      })
    )
})
//start server with command npm run start:dev
