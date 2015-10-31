class EventsEmitter {
	constructor() {
		this.eventsRegistry = {};
	}

	on(eventName, listener) {
		let listeners = this.eventsRegistry[eventName] || [];
		listeners.push(listener);
		this.eventsRegistry[eventName] = listeners;
	}

	off(eventName, listener) {
		let listeners = this.eventsRegistry[eventName] || [],
			index = listeners.indexOf(listener);

		if (index >= 0) {
			listeners.splice(index, 1);
		}
	}

	trigger(eventName, data = {}) {
		let listeners = this.eventsRegistry[eventName] || [],
			listener;

		for (listener of listeners) {
			try {
				listener.call(this, data);
			} catch (e) {
				// TODO: Log error
				console.warn(`Error triggering event with name ${eventName}`, e);
				console.warn(e.stack);
			}
		}
	}

}

export default EventsEmitter;
