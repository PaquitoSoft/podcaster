(function() {
	'use strict';

	requirejs.config({
		paths: {
			// Third party dependencies paths
			'text': '../../node_modules/requirejs-text/text',
			'es6-promise': '../../node_modules/es6-promise/dist/es6-promise',
			'fetch': '../../node_modules/whatwg-fetch/fetch',
			'Ractive': '../../node_modules/ractive/ractive',
			'psrr': '../../node_modules/ps-ractive-router/dist/ps-ractive-router',
			'lscache': '../../node_modules/lscache/lscache',

			// App code paths
			// 'components': './app/js/components',
			// 'config': './app/js/config',
			// 'models': './app/js/models',
			// 'plugins': './app/js/plugins',
			'templates': '../views'
		}
	});

	// We first need to load the polyfills
	requirejs(['es6-promise', 'fetch'], function() {
		// We then load our application
		requirejs(['app']);
	});

}());