import Mustache from 'mustache';
import * as dom from '../plugins/dom';

class BaseController {
	
	constructor(data, template, partials = {}) {
		this.data = data;
		this.template = template;
		this.partials = partials;
		this.events = {};

		// https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
		// http://caniuse.com/#feat=xml-serializer
		this.domParser = new DOMParser();
	}

	configureEvents() {
		for (let key in this.events) {
			let tokens = key.split('|');
			dom.addEvent(this.$el, tokens[0], tokens[1] || undefined, this.events[key].bind(this));
		}
	}

	render() {
		let doc = this.domParser.parseFromString(Mustache.render(this.template, this.data, this.partials), 'text/html');
		this.$el = doc.body.firstChild;
		this.configureEvents();
		return this.$el;
	}

	destroy() {
		dom.removeEvents(this.$el);
		this.$el = null;
	}

}

export default BaseController;
