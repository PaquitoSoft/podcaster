(function(APP) {
	'use strict';

	var templates = APP.plugins.templates;

	var PodcastSidebar = Ractive.extend({
		isolated: true,
		template: templates.getTemplate('podcast-sidebar-partial-tpl')
	});

	APP.components.partials.PodcastSidebar = PodcastSidebar;

}(window.PodcasterApp));
