const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

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
registerRoute();


const NEW_CACHE = 'cache-v1';
const URLToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/index.js',
    '/images/logo.png',
]



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

function cacheAssets( assets ) {
  return new Promise( function (resolve, reject) {
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