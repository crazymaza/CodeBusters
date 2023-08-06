const STATIC_CACHE = 'static-cache-v1'

const manifest = self.__WB_MANIFEST

const routeUrls = [
  '/',
  '/forum',
  '/leader-board',
  '/profile',
  '/play',
  '/sign-in',
  '/sign-up',
]

const manifestURLs = manifest.map(entry => {
  return entry.url
})

const URLS = [...routeUrls, ...manifestURLs]

self.addEventListener('install', event => {
  event.waitUntil(setCacheValuesOnInstall())
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', async function (event) {
  const { request } = event
  event.respondWith(fromNetwork(request))
})

async function setCacheValuesOnInstall() {
  try {
    const cache = await caches.open(STATIC_CACHE)
    cache.addAll(URLS)
    return cache
  } catch (error) {
    console.log(error)
  }
}

async function fromNetwork(request) {
  const fetchRequest = request.clone()
  try {
    const response = await fetch(fetchRequest)
    if (!response || response.status !== 200) {
      return response
    }
    const responseToCache = response.clone()
    const cache = await caches.open(STATIC_CACHE)
    cache.put(request, responseToCache)
    return response
  } catch (error) {
    return fromCache(request)
  }
}

function fromCache(request) {
  return caches
    .match(request)
    .then(matching => matching || Promise.reject('no-match'))
}
