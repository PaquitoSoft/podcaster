(function(APP) {
	'use strict';

	var BasePage = PSRR.BasePage,
		templates = APP.plugins.templates,
		PodcastSummaryComponent = APP.components.partials.PodcastSummary;

	var HomePage = BasePage.extend({
		name: 'HomePage',
		template: templates.getTemplate('home-page-tpl'),
		components: {
			PodcastSummary: PodcastSummaryComponent
		},
		onRequestDone: function(request) {
			var podcastsOrder = lscache.get('podcast-order') || 'last-updated';
			this.originalPodcasts = this.updatePodcastsOrder(podcastsOrder, request.locals.podcasts);
			this.set({
				filter: '',
				podcasts: this.originalPodcasts,
				order: podcastsOrder
			});
		},
		updatePodcastsOrder: function(orderKey, podcasts) {
			var property = (orderKey === 'last-updated') ? 'lastEpisodeDate' : 'isFavorite';

			return podcasts.sort(function(a, b) {
				return (+b[property]) - (+a[property]);
			});
		},
		events: {
			filterPodcasts: function(event) {
				var regExp = new RegExp(event.context.filter, 'i'),
					podcasts = this.updatePodcastsOrder(this.get('order'), this.originalPodcasts);
				
				this.set('podcasts',
					podcasts.filter(function(podcast) {
						return regExp.test(podcast.name + podcast.author);
					})
				);
			},
			changeOrder: function(event, newOrder, forceChange) {
				if (newOrder !== this.get('order') || forceChange) {
					this.set({
						order: newOrder,
						filteredPodcasts: this.updatePodcastsOrder(newOrder, this.get('podcasts'))
					});
					lscache.set('podcast-order', newOrder);
				}
			}
		}
	});

	APP.components.pages.HomePage = HomePage;

}(window.PodcasterApp));
