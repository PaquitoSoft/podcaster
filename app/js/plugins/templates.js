(function(APP) {
	'use strict';

	APP.plugins.templates = {
		getTemplate: function(tplId) {
			return document.getElementById(tplId).innerHTML;
		}
	};

}(window.PodcasterApp));