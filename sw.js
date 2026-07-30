// VoiceMemo AI - Service Worker
// キャッシュ戦略: Cache First（オフラインでも動作）

const CACHE_NAME = 'voicememo-ai-v7';

// キャッシュするアセット
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// ─── インストール：アセットを事前キャッシュ ───
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── アクティベート：古いキャッシュを削除 ───
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ─── フェッチ：Cache First → Network Fallback ───
self.addEventListener('fetch', event => {
  // GAS API リクエストは一切介入しない（SWを完全バイパス）
  // 理由：GASは302リダイレクトを返すため、SW経由での転送は
  //       大きなPOSTリクエスト（音声データ）で失敗することがある
  if (event.request.url.includes('script.google.com') ||
      event.request.url.includes('googleusercontent.com')) {
    return; // respondWithを呼ばない = ブラウザのネイティブfetchに完全に任せる
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        // キャッシュにない場合はネットワークから取得してキャッシュ
        return fetch(event.request)
          .then(response => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => caches.match('./index.html')); // オフライン時はindex.htmlを返す
      })
  );
});
