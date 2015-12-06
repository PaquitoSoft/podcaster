(function() {
	'use strict';

	define(['psrr', 'config/routes', 'text!templates/application.html'], function(RouterSystem, routesConfiguration, appTemplate) {

		var SERVICE_WORKER_SCRIPT = '/service-worker.js';

		// Create our application instance
		RouterSystem.BaseApp.extend({
			el: '#app',
			template: appTemplate,
			routesConfiguration: routesConfiguration,
			onBeforeNavigation: function() {
				this.set('loading', true);
			},
			onNavigationDone: function() {
				window.scrollTo(0, 0);
				this.set('loading', false);
			},
			showError: function(message, err) {
				console.log('What an error!!!', err.stack);
				this.set('errorMsg', message);
				setTimeout(function() {
					this.set('errorMsg', null);
				}.bind(this), 2500);
			},
			data: {
				loading: false
			}
		});

		// Register service worker if browser supports it
		function registerSW() {
			if (navigator.serviceWorker) {
				console.info('Registering service worker...');
				navigator.serviceWorker.register(SERVICE_WORKER_SCRIPT)
					.then(function(serviceWorkerRegistration) {
						console.debug('Service worker registered.');
					})
					.catch(function(error) {
						console.warn('Service worker registration failed!', error);
					});
			}	
		}
		
		// Remove all service workers (useful when we need to update the
		// service worker script; ex: new app version)
		function cleanSW() {
			return new Promise(function(resolve, reject) {
				console.info('Unregistering service worker...');
				// navigator.serviceWorker.getRegistrations().then(function(registrations) {
				//	for(var registration of registrations) {
				//		registration.unregister();
				//	}
				//	resolve();
				// });
				navigator.serviceWorker.getRegistration().then(registration => {
					if (registration) {
						registration.unregister();	
					}
					resolve();
				});
			});
		}

		function isAlreadyRegisteredSW(script) {
			return new Promise((resolve, reject) => {
				if (navigator.serviceWorker) {
					navigator.serviceWorker.getRegistration()
						.then(registration => {
							resolve(
								registration &&
								registration.active &&
								registration.active.scriptURL.includes(SERVICE_WORKER_SCRIPT)
							);
						});
				} else {
					resolve(false);
				}
			});
		}

		function updateSW() {
			if (navigator.serviceWorker) {
				navigator.serviceWorker.getRegistration()
					.then(registration => {
						console.info('Updating service worker...');
						registration.update();
					});
			}
		}

		/*
			ServiceWorkerRegistration.update()
				+ Checks the server for an updated version of the service worker 
					without consulting caches.
				+ The update method of the ServiceWorkerRegistration interface attempts 
					to update the service worker. It fetches the worker's script URL, 
					and if the new worker is not byte-by-byte identical to the current worker, 
					it installs the new worker. 
					The fetch of the worker bypasses any browser caches if the previous fetch 
					occurred over 24 hours ago.
		*/

		// if (/reset/.test(window.location.href)) {
		//	// cleanSW().then(registerSW);
		//	cleanSW();
		// } else {
		//	// TODO Test if the SW is already registered. I think there's no
		//	//	need to register it again (if version has not changed).
		//	// registerSW();
		//	isAlreadyRegisteredSW(SERVICE_WORKER_SCRIPT)
		//		.then(isRegistered => {
		//			if (isRegistered) {
		//				// updateSW();
		//				// registerSW();
		//			} else {
		//				registerSW();
		//			}
		//		});
		// }

	});

}());
