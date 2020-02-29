"use strict";

class Task {
	constructor(start, end) {
		this.start = start;
		this.end = end;
		this.time = Date.now();
	};
};

module.exports = Task
