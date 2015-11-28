(function() {
	'use strict';

	var staticCacheName = 'static',
		version = 3;

	function updateCache() {
		return caches.open(staticCacheName + '@' + version)
			.then(function(cache) {
				return cache.addAll([
					// '/index.html',
					'/app/styles/app.css'
				]);
			});
	}

	/*
		Initializtion events: https://mdn.mozillademos.org/files/8241/flowchart-production-version.png
			1.- Service worker registered
			2.- onInstall: use to install app dependencies
			3.- onActivate: use to cleanup old resources
			4.- Service worker controls requests
	*/

	self.addEventListener('install', function(event) {
		console.info('Service worker installed!!! - Updating cache...');
		console.log(event);
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
		console.debug('Service worker activated...', event);
	});

	self.addEventListener('fetch', function(event) {
		// console.debug('App requires new content:', event.request.url);

		// Simply bypass the request
		// event.respondWith(fetch(event.request));

		// Look at local cache
		event.respondWith(
			caches.match(event.request)
				.then(function(response) {
					if (!!response) {
						console.info('Responding cached content:', event.request.url);	
					}
					return response || fetch(event.request);
				})
		);
	});

}());