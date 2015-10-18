(function() {
	'use strict';

	define(['Ractive', 'text!templates/partials/podcast-summary.html'],
		function(Ractive, template) {
			return Ractive.extend({
				isolated: true,
				template: template,
				oninit: function() {
					this.on('toggleFavorite', function() {
						this.get('podcast').toggleFavorite();
						this.set('podcast', this.get('podcast'));
						return false;
					});
				}
			});
		}
	);

}());
