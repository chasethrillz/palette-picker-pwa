this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/scripts/scripts.js',
        '/css/reset.css',
        '/css/style.css'
      ])
    })
  )
})


this.addEventListener('fetch', event => { 
  event.respondWith(
    caches.match(event.request).then(response => { 
      return response || fetch(event.request)
    })
  )
})


this.addEventListener('activate', event => {
  let cacheWhiteList = ['assets-v1']

  event.waitUntil(
    caches.keys.then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhiteList.indexOf(key)) {
          return caches.delete(key)
        }
      }))
    })
  )
})
