(function(APP){
	'use strict';

	var templates = APP.plugins.templates;

	var PodcastSummary = Ractive.extend({
		isolated: true,
		template: templates.getTemplate('podcast-summary-partial-tpl'),
		oninit() {
			// console.log('Podcast:', this.get());
			this.on('toggleFavorite', function(event) {
				event.original.preventDefault();
				event.original.stopPropagation();
				var podcast = this.get().podcast;
				// this.get('podcast').toggleFavorite();
				// this.get().podcast.toggleFavorite();
				// this.update('podcast');
				// this.update();
				// this.set('podcast', this.get().podcast);
				this.set('podcast', podcast);
				return false;
			});
		}
	});

	APP.components.partials.PodcastSummary = PodcastSummary;

}(window.PodcasterApp));
