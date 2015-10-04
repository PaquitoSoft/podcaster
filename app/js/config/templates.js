(function(APP) {
	'use strict';

	var templatesPlugin = APP.plugins.templates;

	function loadTemplates(config) {
		var loaders = [];
		Object.keys(config).forEach(function(templateName) {
			loaders.push(new Promise(function(resolve, reject) {
				ajax.getText(config[templateName], { ttl: 3600 })
					.then(function(data) {
						return {
							name: templateName,
							content: data
						};
					})
					.catch(reject);
			}));
		});

		Promise.all(loaders)
			.then(function(templates) {
				console.log(templates);
			})
			.catch(function(err) {
				console.error('Could not load APP templates:', err);
			});
	}

	function preloadTemplates() {
		return new Promise(function(resolve, reject) {
			loadTemplates({
					app: '/js/views/app.html',
					homePage: '/js/views/pages/home-page.html',
					podcastPage: '/js/views/pages/podcast-page.html',
					episodePage: '/js/views/pages/episode-page.html',
					podcastSummaryPartial: '/js/views/partials/podcast-summary.html',
					podcastSidebarPartial: '/js/views/partials/podcast-sidebar.html'
				})
			.then(function(data) {
				APP.templates = data;
				resolve();
			})
			.catch(reject);
		});
	}

	APP.config.templates = {
		preloadTemplates: preloadTemplates
	};

}(window.PodcasterApp));
