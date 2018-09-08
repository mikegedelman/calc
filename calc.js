class Calculator {
	constructor() {
		this.eventHandlers = {};

		this.add = this._makeOp(() => {
			this.setDisplay(this.display + this.stashed);
		});
		this.sub = this._makeOp(() => {
			this.setDisplay(this.stashed - this.display);
		});
		this.mul = this._makeOp(() => {
			this.setDisplay(this.display * this.stashed);
		});
		this.div = this._makeOp(() => {
			this.setDisplay(this.stashed / this.display);
		});

		this.pct = () => {
			this._flush();
			this.setDisplay(this.display * 0.01);
		};
		this.sqrt = () => {
			this._flush();
			this.setDisplay(Math.sqrt(this.display));
		};
	}

	/// Stash the current display
	_stash() {
		this.stashed = this.display;
		this.setDisplay(null);
	}

	/// Queue a function to run next flush
	_queue(fn) {
		this._queued = fn;
	}

	/// Run the queued function and update display.
	_flush() {
		if (this._queued) {
			this._queued.call(this);
			this._queued = null;
		}
	}

	/// Return a function that flushes, stashes current display,
	/// and then queues the given function.
	/// This is to avoid lots of repetition with the add, sub, etc functions
	_makeOp(fn, singleArg) {
		return function () {
			// Handle if user presses an op key twice: just queue a different fn
			if (!this.display) {
				this._queue(fn);
				return;
			}

			this._flush();
			this._stash();
			this._queue(fn);
		};
	}

	equals() {
		this._flush();
	}

	getDisplay() {
		return this.display;
	}

	setDisplay(num) {
		this.display = num;
		this.emit('update-display');
	}

	clear() {
		this.setDisplay(null);
	}

	press(num) {
		if (this.display) {
			this.setDisplay((this.display * 10) + num);
		} else {
			this.setDisplay(num);
		}
	}

	on(event, fn) {
		if (this.eventHandlers[event]) {
			this.eventHandlers[event].push(fn);
		} else {
			this.eventHandlers[event] = [fn];
		}
	}

	emit(event) {
		if (this.eventHandlers[event]) {
			this.eventHandlers[event].forEach(cb => {
				cb.call(this);
			});
		}
	}
}