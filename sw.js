var CACHE='odl-shell-v6';
var SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){return k===CACHE?null:caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;   // GitHub API always goes straight to the network
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(r){
      var copy=r.clone();
      caches.open(CACHE).then(function(c){c.put(e.request,copy);});
      return r;
    }).catch(function(){
      return caches.match(e.request).then(function(r){return r||caches.match('./index.html');});
    })
  );
});
