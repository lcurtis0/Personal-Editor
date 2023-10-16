const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

//  a Cache-Manifest but does not allow to cache assets from other servers and requires you to have a static file with URLs, 

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// registerRoute();

registerRoute(
  // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// // ------------------------------------------------------
// // cache-v1 
// const CACHE_NEW = 'cache-v1';
// var assets = [
//   '/',
//   '/index.html',
//   '/css/style.css',
//   '/index.js',
//   '/images/logo.png',
// ];
// // 1. install assets
// self.addEventListener('cacheAssets', (e) => e.waitUntil(
//   caches.open(CACHE_NEW).then((cache) => cache.addAll(assets).then(
//     console.log('All assets cached')))
// )
// );

// // 2. activate assets
// // the service worker is activated after install.


// //It is going through every key in the keylist 
// self.addEventListener('activateAssets', (e) =>
//   e.waitUntil(
//     caches.keys().then((keyList) =>
//       Promise.all(
//         keyList.map((key) => {
//           if (key !== CACHE_NEW) {
//             console.log("Key not found for this Cache");
//             return caches.delete(key);
//           }
//         })
//       )
//     )
//   )
// );

// // 3. claim assets
// self.addEventListener('activateAssets', (e) => {
//   e.waitUntil(clients.claim());
// });
// // "simple cache-first network-first strategy"
// // This is to check check cache responses. If none then it fetches it 
// self.addEventListener('fetch', (e) =>
//   e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)))
// );

// -----------------------------------------------
// Use activity 15

// The three phases of the service worker's life cycle are:
// 1. install
// 2. activate
// 3. claim

// Install - the service worker is first installed and then activated.

// self.addEventListener('install', (e) =>
// e.waitUntil(
//   caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
// )
// );
// to explain above 
// The self is the service worker having an event listner for fetch events that happen (fetch events are used to make network calls) the (e) passes and will have control of the event

// waitUntil method then open caches to find CACHE_NAME then want to add all URLs to 
// -----------------------------------------------

// all urls will be added to cache
/*
function cacheAssets(assets) {
  return new Promise(function (resolve, reject) {
    // open cache
    caches.open('assets')
      .then(cache => {
        // the API does all the magic for us
        cache.addAll(assets)
          .then(() => {
            console.log('all assets added to cache')
            resolve()
          })
          .catch(err => {
            console.log('error when syncing assets', err)
            reject()
          })
      }).catch(err => {
        console.log('error when opening cache', err)
        reject()
      })
  });
}

// list of urls to be cached
const NEW_CACHE = 'cache-v1';
var assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/index.js',
  '/images/logo.png',
];

// cache responses of provided urls
cacheAssets(assets)
  .then(() => {
    console.log('All assets cached')
  });

// Credit to Medium for providing code 
// https://medium.com/digitalwerft/asset-caching-with-service-worker-c40dcda43842

*/