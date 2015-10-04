(function(APP) {
	'use strict';

	var BasePage = PSRR.BasePage,
		RouterManager = PSRR.RouterManager,
		templates = APP.plugins.templates,
		PodcastSidebar = APP.components.partials.PodcastSidebar;

	// import Template from '../../views/pages/podcast-page.html';

	var PodcastPage = BasePage.extend({
		name: 'PodcastPage',
		template: templates.getTemplate('podcast-page-tpl'),
		components: {
			PodcastSidebar: PodcastSidebar
		},
		onRequestDone: function(request) {
			this.set('podcast', request.locals.podcast);
		},
		events: {
			navToEpisode: function(event) {
				event.original.preventDefault();
				RouterManager.navTo(event.node.getAttribute('href'), {
					podcast: this.get('podcast'),
					episode: event.context
				});
			}
		}
	});

	APP.components.pages.PodcastPage = PodcastPage;

}(window.PodcasterApp));
