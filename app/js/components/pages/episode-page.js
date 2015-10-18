(function() {
	'use strict';

	define(['psrr', 'components/partials/podcast-sidebar', 'text!templates/pages/episode.html'],
		function(RouterSystem, PodcastSidebarComponent, template) {

			return RouterSystem.BasePage.extend({
				name: 'EpisodePage',
				template: template,
				components: {
					PodcastSidebar: PodcastSidebarComponent
				},
				onRequestDone: function(request) {
					this.set({
						podcast: request.locals.podcast,
						episode: request.locals.episode
					});
				}
			});
		}
	);

}());
