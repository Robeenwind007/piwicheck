// Incrémenter VERSION à chaque déploiement (doit correspondre à APP_VERSION dans index.html)
const VERSION = "1.0.0";
const CACHE = "piwicheck-v" + VERSION;
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./splash.jpg"];

self.addEventListener("install", e => {
  // cache:"reload" contourne le cache HTTP (GitHub Pages / Cloudflare) pour ne pas stocker une ancienne version
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(
    ASSETS.map(u => fetch(new Request(u, { cache: "reload" })).then(r => r.ok && c.put(u, r)).catch(() => {}))
  )));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isPage = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html") || url.pathname.endsWith(".webmanifest");

  if (isPage) {
    // Réseau d'abord : on a toujours la dernière version quand on est en ligne, le cache sert hors ligne
    e.respondWith(
      fetch(req, { cache: "no-store" }).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  // Images, polices : cache d'abord, mis à jour en arrière-plan
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res.ok && (url.origin === self.location.origin || url.hostname.includes("fonts.g"))) {
          const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
