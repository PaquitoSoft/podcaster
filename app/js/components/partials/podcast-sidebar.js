(function() {
	'use strict';

	define(['Ractive', 'text!templates/partials/podcast-sidebar.html'],
		function(Ractive, template) {
			return Ractive.extend({
				isolated: true,
				template: template
			});
		}
	);

}());
