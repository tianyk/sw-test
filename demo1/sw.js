this.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('v1').then(function (cache) {
			return cache.addAll([
				'https://itextbook-dev-1252350207.cos.ap-beijing.myqcloud.com/img_scene_loading-error%402x.png',
				'/demo1/index.html'
			]);
		})
	);
});

this.addEventListener('fetch', function (event) {
	const url = event.request.url;
	console.log(event);
	console.log('[fetch] %s',url);

	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				console.log('[hit] %s',url);
				return response;
			}
			console.log('[miss] %s', url)
			return response || fetch(event.request).then(function (response) {
				return caches.open('v1').then(function (cache) {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});