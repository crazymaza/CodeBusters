const STATIC_CACHE = 'static-cache-v1';

const manifest = self.__WB_MANIFEST

const routeUrls = [
  '/',
  '/forum',
  '/leader-board',
  '/profile',
  '/play',
  '/sign-in',
  '/sign-up'
]

const manifestURLs = manifest.map(
  (entry) => {
    return entry.url
  }
)

const URLS = [...routeUrls, ...manifestURLs]

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
    .then(cache => {
      return cache.addAll(URLS);
    })
    .catch(err => { 
      throw err;
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', async function(event) {
  const { request } = event;
  event.respondWith(fromNetwork(request));
});

async function fromNetwork(request) {
  const fetchRequest = request.clone(); 
  return fetch(fetchRequest) 
  .then(response => { 
    if(!response || response.status !== 200) { 
      return response; 
    } 
    const responseToCache = response.clone(); 
    caches.open(STATIC_CACHE) 
    .then(cache => { 
      cache.put(request, responseToCache); 
    }); 
    return response; 
    }
  )
  .catch(() => {
      return fromCache(request);
  });
}

function fromCache(request) {
  return caches.match(request).then((matching) =>
    matching || Promise.reject('no-match')
  );
}