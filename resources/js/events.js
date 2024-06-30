export const EventEmitter = {
	_events: {},
	dispatch: function (event, data) {
		if (!this._events[event]) return;
		this._events[event].forEach(callback => callback(data))
	},
	subscribe: function (event, callback, override = false) {
		if (!this._events[event] || override) this._events[event] = [];
		this._events[event].push(callback);
	},
	clear: function () {
		this._events = {};
	}
};
