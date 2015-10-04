(function(APP){
	'use strict';

	var templates = APP.plugins.templates;

	var PodcastSummary = Ractive.extend({
		isolated: true,
		template: templates.getTemplate('podcast-summary-partial-tpl'),
		oninit: function() {
			this.on('toggleFavorite', function(event) {
				this.get('podcast').toggleFavorite();
				this.set('podcast', this.get('podcast'));
				return false;
			});
		}
	});

	APP.components.partials.PodcastSummary = PodcastSummary;

}(window.PodcasterApp));
