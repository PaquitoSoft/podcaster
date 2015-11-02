import RoutePattern from 'route-pattern';
import EventsEmitter from './events-emitter';

// function noop(){};

// As this is an constants object, do not allow to modify it
export let RouterEvents = Object.freeze({
	navigationStart: 'navigationStart',
	navigationEnd: 'navigationEnd',
	navigationError: 'navigationError',
	routeNotFound: 'routeNotFound'
});

export class RouterEngine extends EventsEmitter {

	constructor($mainEl, routesHandlers = {}) {
		super(); // This seems to be required

		this.$mainEl = $mainEl;
		this.currentController = null;

		this.registry = routesHandlers.map((routeConfig) => {
			return {
				path: RoutePattern.fromString(routeConfig.path),
				handler: routeConfig.handler
			};
		});

		window.addEventListener('popstate', this.processNavigation.bind(this));
		document.addEventListener('DOMContentLoaded', this.processNavigation.bind(this));
	}

	navigate(info) {
		let ctrl = new info.Controller(info.data),
			$newEl = ctrl.render();

		// Clean up previous controller
		if (this.currentController) {
			this.currentController.destroy();
		}

		ctrl.onBeforeMounted();
		this.$mainEl.replaceChild($newEl, this.$mainEl.firstChild);
		ctrl.onInsertedIntoDOM($newEl);
		this.currentController = ctrl;

		this.trigger(RouterEvents.navigationEnd, event);
	}

	processRoute(path, state = {}) {
		let routes = this.registry,
			_path = path.replace(/^\/#/, ''),
			routeConfig;

		routeConfig = routes.find((rc) => {
			return rc.path.matches(_path);
		});

		if (routeConfig) {
			try {
				routeConfig.handler({
					url: _path,
					params: routeConfig.path.match(_path),
					state
				})
				.then(this.navigate.bind(this))
				.catch((navError) => {
					console.error('RouterEngine::navigate# Error navigating:', navError);
					this.trigger(RouterEvents.navigationEnd, event);
					this.trigger(RouterEvents.navigationError, navError);
				});
			} catch (err) {
				console.warn('Router::processRoute# Error executing route handler:', err);
				this.trigger(RouterEvents.navigationError, err);
			}
		} else {
			console.warn('Router::processRoute# Route not handled:', _path);
			this.trigger(RouterEvents.routeNotFound, _path);
		}
	}

	processNavigation(event) {
		this.trigger(RouterEvents.navigationStart, event);
		let location = window.location,
			path = location.pathname + location.search + location.hash;

		this.processRoute(path, event.state);
	}

	static navTo(path, state = {}) {
		console.log('Plugins::router::navTo# Navigating to:', path);
		window.history.pushState(state, '', `#${path}`); // NOTE: Template string
		window.dispatchEvent(new PopStateEvent('popstate', { state })); // NOTE: Enhanced object
	}

}
