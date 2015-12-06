(function() {
	'use strict';

	var version = 7,
		APP_CACHE_NAME = `podcaster@${version}`,
		cacheableContentFilters = [
			/mzstatic\.com\/image/
		];

	function updateCache() {
		console.debug('Updating cache...');
		return caches.open(APP_CACHE_NAME)
			.then(function(cache) {
				return cache.addAll([
					// '/index.html',
					'/app/styles/app.css'
				]);
			});
	}

	function isCacheable(url) {
		let result = false,
			i, len;

		for (i = 0, len = cacheableContentFilters.length; i < len; i++) {
			if (cacheableContentFilters[i].test(url)) {
				result = true;
				break;
			}
		}

		return result;
	}

	/*
		Initializtion events: https://mdn.mozillademos.org/files/8241/flowchart-production-version.png
			1.- Service worker registered
			2.- onInstall: use to install app dependencies
			3.- onActivate: use to cleanup old resources
			4.- Service worker controls requests
	*/

	self.addEventListener('install', function(event) {
		console.info(`Service worker installation event. Cache version: ${version}`);
		
		/*
			The ExtendableEvent.waitUntil() method extends the lifetime of the event.
			When called in an EventHandler associated to the install event, 
			it delays treating the installing worker as installed until 
			the passed Promise resolves successfully. 
			This is primarily used to ensure that a service worker is not considered 
			installed until all of the core caches it depends on are populated.
		*/
		event.waitUntil(updateCache());
	});

	self.addEventListener('activate', function(event) {
		console.debug('Service worker activated!');
	});

	self.addEventListener('message', () => {
		console.debug('SW message received:', arguments);
	});
	
	self.addEventListener('fetch', function(event) {
		// console.debug('App requires new content:', event.request.url);

		// Simply bypass the request
		// event.respondWith(fetch(event.request));

		// Look at local cache
		event.respondWith(
			caches.match(event.request)
				.then(function(response) {
					if (response) {
						console.debug(`(v${version}) Returning cached content: ${event.request.url}`);
						return response;
					} else if (!response && isCacheable(event.request.url)) {
						return fetch(event.request)
							.then(_response => {
								console.debug('Fetched new content, added to cache and returned to client:', event.request.url);
								/*
									Note: Initial Cache implementations (in both Blink and Gecko) resolve Cache.add,
									Cache.addAll, and Cache.put promises when the response body is fully
									written to the disk. More recent spec versions have newer language stating
									that the browser can resolve the promise as soon as the entry is recorded
									in the database even if the response body is still streaming in.
								*/
								// setTimeout(() => {
								// 	caches.open(APP_CACHE_NAME)
								// 		.then(function(cache) {
								// 			// We need to clone the response as returning we're returning the
								// 			// response from this function and it seems it's one-time-use only
								// 			cache.put(event.request.url, _response.clone());
								// 		});
								// }, 4);
								// console.log('----> This is the response:', _response);
								// return _response;

								/*
										http://devdocs.io/dom/cache/put
									Open the cache using open(), put the default network request in the cache 
									using Cache.put and return a clone of the default network request using 
									return response.clone() — necessary because put() consumes the response body.
								*/
								caches.open(APP_CACHE_NAME)
									.then(cache => {
										cache.put(event.request, _response);
									});
								return _response.clone();
							});
					} else {
						return fetch(event.request);
					}
				})
		);
	});

}());