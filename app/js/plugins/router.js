import Mustache from 'mustache';
import RoutePattern from 'route-pattern';
import EventsEmitter from './events-emitter';
import * as dom from './dom';

// function noop(){};

// As this is an constants object, do not allow to modify it
export let RouterEvents = Object.freeze({
	navigationStart: 'navigationStart',
	navigationEnd: 'navigationEnd',
	navigationError: 'navigationError',
	routeNotFound: 'routeNotFound'
});

export class RouterEngine extends EventsEmitter {

	constructor($mainEl, routesHandlers = {}, engineOptions = { hashbang: true }) {
		super(); // This seems to be required

		this.$mainEl = $mainEl;
		this.currentController;

		// this.registry = {};
		// for (let pathExpression in routesHandlers) {
		//	this.registry[RoutePattern.fromString(pathExpression)] = routesHandlers[pathExpression];
		// }
		this.registry = routesHandlers.map((routeConfig) => {
			return {
				path: RoutePattern.fromString(routeConfig.path),
				handler: routeConfig.handler
			};
		});

		window.addEventListener('popstate', this.processNavigation.bind(this));
		document.addEventListener('DOMContentLoaded', this.processNavigation.bind(this));
	}

	_navigate(error, template, data) {
		if (error) {
			this.trigger(RouterEvents.navigationError, error);
		} else {
			this.$mainEl.innerHTML = Mustache.render(template, data, data.partials || {});
		}
	}

	navigate(error, Controller, data = {}) {
		if (error) {
			this.trigger(RouterEvents.navigationError, error);
		} else {
			try {
				let ctrl = new Controller(data);

				// Clean up previous controller
				if (this.currentController) {
					this.currentController.destroy();
				}

				// dom.emptyEl(this.$mainEl);
				this.$mainEl.innerHTML = '';
				this.$mainEl.appendChild(ctrl.render());
				this.currentController = ctrl;
			} catch (err) {
				console.error('RouterEngine::navigate# Error navigating:', err);
				this.trigger(RouterEvents.navigationError, err);
			}
		}
	}

	processRoute(path, state = {}) {
		let routes = this.registry,
			_path = path.replace(/^\/#/, ''),
			i = 0, len = routes.length;

		for (; i < len; i++) {
			if (routes[i].path.matches(_path)) {
				try {
					routes[i].handler.call(
						null,
						{
							url: _path,
							params: routes[i].path.match(_path),
							state
						},
						this.navigate.bind(this)
					);
					break;
				} catch (err) {
					console.warn('Router::processRoute# Error executing route handler:', err);
					this.trigger(RouterEvents.navigationError, err);
				}
			}
		}

		if (i === len) {
			console.warn('Router::processRoute# Route not handled:', _path);
			this.trigger(RouterEvents.routeNotFound, _path);
		}
	}

	processNavigation(event) {
		this.trigger(RouterEvents.navigationStart, event);
		let location = window.location,
			path = location.pathname + location.search + location.hash;

		console.log('Plugins::router::processNavigation# Trying to navigate:', event);
		this.processRoute(path, event.state);

		this.trigger(RouterEvents.navigationEnd, event);
	}

	static navTo(path, state = {}) {
		console.log('Plugins::router::navTo# Navigating to:', path);
		window.history.pushState(state, '', `#${path}`); // NOTE: Template string
		window.dispatchEvent(new PopStateEvent('popstate', { state })); // NOTE: Enhanced object
	}

}
