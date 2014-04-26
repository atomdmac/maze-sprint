EventEmitter = Class.extend({

	// Hash of strings representing valid Event types.
	// NOTE: Not currently implemented.
	_eventTypes: null,
	
	// A hash of Arrays with keys that correspond to event types.  The Arrays
	// that it contains are a list of functions/listeners to call when the
	// event is triggered.
	_handlers: null,
	
	/**
	 * Adds a listen for a given event type.
	 *
	 * @param type String The type of event to listen for.
	 * @param handler Function The function to call when the specified event is fired.
	 * @return Object This Event Emitter Object.
	 */
	bind: function (type, handler) {
		// Make sure this is a valid event type.
		// if (this._eventTypes[type] == true) {
			
			// Make sure that an array already exists for this event type.
			if (typeof this._handlers[type] == "undefined") {
				this._handlers[type] = [];
			}
			
			// Add the handler.
			this._handlers[type].push(handler);
		// }
		
		return this;
	},
	
	/**
	 * Stops listening for a given event.  If a handler is specified, only that
	 * handler will stop listening for the event.
	 * 
	 * @param type String The type of event to stop listening for.
	 * @param handler Function (Optional) The specific function to stop notifying.
	 * @return Object This Event Emitter Object.
	 */
	unbind: function (type, handler) {
		// No args given.  Remove all handlers.
		if (arguments.length === 0) {
			this._handlers = {};
		}
		
		// Only "type" argument given.  Remove all handlers of given type.
		else if (arguments.length == 1) {
			if (typeof this._handlers[type] != "undefined") {
				this._handlers[type] = undefined;
			}
		}
		
		// Both "type" and "handler" arguments given.  Attempt to remove 
		// specific handler.
		else if (arguments.length == 2) {
			// Make sure a handler queue exists for the given event type.
			var queue = this._handlers[type];
			if (typeof queue != "undefined") {
				for (var i=0; i<queue.length; i++) {
					if (queue[i] == handler) {
						queue.splice(i, 1);
					}
				}
			}
		}
		
		return this;
	},
	
	/**
	 * Notify all registered handlers of the given type.  Handlers should
	 * accept 2 arguments; type and origin, respectively.  After that, if any
	 * additional arguments are provided, they will be passed along to the 
	 * handler functions in the order that they are provided to the trigger()
	 * method.
	 *
	 * @param type String The type of event to trigger.
	 * @return Object This Event Emitter Object.
	 */
	trigger: function (type) {
		var queue = this._handlers[type];
		if (typeof queue != "undefined") {
			// Create arguments array to pass to each handler.
			var args,
			    args1 = [type, this],
			    args2 = args1.slice.apply(arguments);
			
			// Pull "type" off of args2 so we don't include it twice.
			args2 = args2.slice(1);
			
			// Add them together.
			args = args1.concat(args2);
			
			// Fire all handlers.
			for (var i=0; i<queue.length; i++) {
				queue[i].apply(this, args);
			}
		}
		
		return this;
	},
	
	/**
	 * Same functionality as trigger() but provides an additional argument for
	 * specifying the origin.
	 *
	 * @param type String The type of event to trigger.
	 * @param origin Object The Object where the event originated.
	 * @return Object This Event Emitter Object.
	 */
	
	triggerAs: function (type, origin) {
		if (!origin) {
			throw Error("No origin argument included.  Use trigger() method instead.");
		}
		var queue = this._handlers[type];
		if (typeof queue != "undefined") {
			// Create arguments array to pass to each handler.
			var args,
			    args1 = [type, origin],
			    args2 = args1.slice.apply(arguments);
			
			// Pull "type" off of args2 so we don't include it twice.
			args2 = args2.slice(2);
			
			// Add them together.
			args = args1.concat(args2);
			
			// Fire all handlers.
			for (var i=0; i<queue.length; i++) {
				queue[i].apply(this, args);
			}
		}
		
		return this;
	},
    
    init: function () {
        this._handlers = {};
    }
});