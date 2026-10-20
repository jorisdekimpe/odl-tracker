var CACHE='zeven-speler-v3';
var SHELL=['./','./index.html','./manifest.json','./spelers.json','./icon-192.png','./icon-512.png'];
var CDN='https://cdnjs.cloudflare.com/';

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){return (k.indexOf('zeven-speler-')===0&&k!==CACHE)?caches.delete(k):null;}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(e.request.url.indexOf(CDN)===0){            // pdf.js: cache-first, werkt dan ook offline
    e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){var c=n.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c);});return n;});}));
    return;
  }
  if(u.origin!==self.location.origin)return;    // GitHub API altijd rechtstreeks
  var key=u.pathname.slice(-12)==='spelers.json'?new Request(u.origin+u.pathname):e.request;
  e.respondWith(
    fetch(e.request).then(function(r){
      if(r.ok){var copy=r.clone();caches.open(CACHE).then(function(c){c.put(key,copy);});}
      return r;
    }).catch(function(){
      return caches.match(key).then(function(r){return r||caches.match('./index.html');});
    })
  );
});
