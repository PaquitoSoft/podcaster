(function() {
	'use strict';

	define(['psrr', 'lscache', 'components/partials/podcast-summary', 'text!templates/pages/home.html'],
		function(RouterSystem, lscache, PodcastSummaryComponent, template) {
			
			return RouterSystem.BasePage.extend({
				name: 'HomePage',
				template: template,
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
						return (Number(b[property]) - Number(a[property]));
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

		}
	);

}());
