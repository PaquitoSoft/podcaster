(function(APP) {
	'use strict';

	define(['psrr', 'components/partials/podcast-sidebar', 'text!templates/pages/podcast.html'],
		function(RouterSystem, PodcastSidebarComponent, template) {
			
			return RouterSystem.BasePage.extend({
				name: 'PodcastPage',
				template: template,
				components: {
					PodcastSidebar: PodcastSidebarComponent
				},
				onRequestDone: function(request) {
					this.set('podcast', request.locals.podcast);
				},
				events: {
					navToEpisode: function(event) {
						event.original.preventDefault();
						RouterSystem.RouterManager.navTo(event.node.getAttribute('href'), {
							podcast: this.get('podcast'),
							episode: event.context
						});
					}
				}
			});

		}
	);

}());
