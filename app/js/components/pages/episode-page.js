(function(APP) {
	'use strict';

	var BasePage = PSRR.BasePage,
		templates = APP.plugins.templates,
		PodcastSidebar = APP.components.partials.PodcastSidebar;
	
	var EpisodePage = BasePage.extend({
		name: 'EpisodePage',
		template: templates.getTemplate('episode-page-tpl'),
		components: {
			PodcastSidebar: PodcastSidebar
		},
		onRequestDone: function(request) {
			this.set({
				podcast: request.locals.podcast,
				episode: request.locals.episode
			});
		},
	});

	APP.components.pages.EpisodePage = EpisodePage;

}(window.PodcasterApp));
