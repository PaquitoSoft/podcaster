import Mustache from 'mustache';
import { RouterEngine } from '../plugins/router';
import * as dom from '../plugins/dom';

class BaseController {
	
	constructor(options = {}) {
		this.data = options.data;
		this.template = options.template;
		this.partials = options.partials;
		this.domEvents = options.domEvents;
		this.defaultNavigation = (typeof options.defaultNavigation === 'undefined') ? true : options.defaultNavigation;

		// https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
		// http://caniuse.com/#feat=xml-serializer
		this.domParser = new DOMParser();
	}

	configureEvents() {
		for (let key in this.domEvents) {
			let tokens = key.split('|');
			dom.addEvent(this.$el, tokens[0], tokens[1] || undefined, this[this.domEvents[key]].bind(this));
		}

		if (this.defaultNavigation) {
			dom.addEvent(this.$el, 'click', 'a', this.navTo);
		}
	}

	onInsertedIntoDOM($el) {
		this.$el = $el;
		this.configureEvents();
		this.onMounted();
	}

	navTo(event, $target) {
		event.preventDefault();
		RouterEngine.navTo($target.getAttribute('href'));
	}

	render() {
		let doc = this.domParser.parseFromString(Mustache.render(this.template, this.data, this.partials), 'text/html');
		return doc.body.firstChild;
	}

	update() {
		let $parent = this.$el.parentNode,
			$oldEl = this.$el,
			$newEl = this.render();

		dom.removeEvents($oldEl);
		$parent.replaceChild($newEl, $oldEl);
		this.$el = $newEl;
	}

	destroy() {
		dom.removeEvents(this.$el);
		this.$el = null;
	}

	// Hooks
	onBeforeMounted(){}
	onMounted(){}

}

export default BaseController;
