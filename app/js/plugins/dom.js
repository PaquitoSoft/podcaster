const CUSTOM_EVENTS_NAME = '_pcEvents';

function matches($el, selector) {
	let _matches = $el.matches || $el.msMatchesSelector;
	return _matches.call($el, selector);
}

export function findById(id) {
	return document.getElementById(id);
}

export function findEl(selector, container) {
	return (container || document).querySelector(selector);
}

export function findEls(selector, container) {
	return Array.from((container || document).querySelectorAll(selector));
}

export function emptyEl($el) {
	// It seems this is way faster than innerHTML = '' with heavy populated elements
	// http://jsperf.com/innerhtml-vs-removechild/ (check several of its versions)
	while ($el.firstChild) {
		$el.removeChild($el.firstChild);
	}
}

export function addEvent($el, eventType, delegatedSelector = null, listener) {
	// TODO It seems a better approach to use WeakMaps
	// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
	let _eventsMap = $el[CUSTOM_EVENTS_NAME] || {},
		_eventsListeners = _eventsMap[eventType] || [];

	if (delegatedSelector) {
		let _listener = function(event) {
			let $target = event.target;

			while ($target !== event.currentTarget && !matches($target, delegatedSelector)) {
				$target = $target.parentElement;
			}

			if ($target && $target !== event.currentTarget) {
				listener.call($target, event, $target);	
			}
		};
		$el.addEventListener(eventType, _listener);
		_eventsListeners.push(_listener);
	} else {
		$el.addEventListener(eventType, listener);
		_eventsListeners.push(listener);
	}

	_eventsMap.eventType = _eventsListeners;
	$el[CUSTOM_EVENTS_NAME] = _eventsMap;
}

export function removeEvents($el, eventType = '*') {
	let _eventsMap = $el[CUSTOM_EVENTS_NAME] || {};

	Object.keys(_eventsMap).forEach((_eventType) => {
		if (_eventType === eventType || _eventType === '*') {
			_eventsMap[eventType].forEach((listener) => {
				$el.removeEventListener(eventType, listener);
			});
			_eventsMap[eventType] = null;
		}
	});
}
