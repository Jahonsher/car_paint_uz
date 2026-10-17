const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");
const root = path.resolve(__dirname, "../build");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "asset-manifest.json")),
);
const assets = [
  ...new Set([
    "/index.html",
    "/favicon.svg",
    "/manifest.json",
    ...Object.values(manifest.files).filter((file) =>
      /\.(js|css|png|jpg|webp)$/.test(file),
    ),
  ]),
];
const version = crypto
  .createHash("sha256")
  .update(JSON.stringify(manifest))
  .digest("hex")
  .slice(0, 12);
const worker = `/* Generated from this production build; never cache API writes or contact details. */
const CACHE = 'carpaint-shell-${version}';
const ASSETS = ${JSON.stringify(assets)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('carpaint-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.open(CACHE).then(cache => cache.match('/index.html'))));
    return;
  }
  if (ASSETS.includes(url.pathname) || url.pathname.startsWith('/static/')) {
    event.respondWith(caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    }));
  }
});
`;
fs.writeFileSync(path.join(root, "sw.js"), worker);
console.log(
  "Offline app shell: " + assets.length + " assets; version " + version,
);
