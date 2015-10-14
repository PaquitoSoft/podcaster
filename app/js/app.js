(function(APP) {
	'use strict';

	var BaseApp = PSRR.BaseApp,
		templates = APP.plugins.templates,
		routesConfiguration = APP.config.routes;
	
	BaseApp.extend({
		el: '#app',
		template: templates.getTemplate('app-tpl'),
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

}(window.PodcasterApp));
