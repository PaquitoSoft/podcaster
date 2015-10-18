(function() {
	'use strict';

	define(['psrr', 'config/routes', 'text!templates/application.html'], function(RouterSystem, routesConfiguration, appTemplate) {

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
	});

}());
