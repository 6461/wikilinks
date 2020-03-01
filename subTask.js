"use strict";

class SubTask {
	constructor(task, page, direction, level) {
		this.task = task;
		this.page = page;
		this.direction = direction;
		this.level = level;
		this.time = Date.now();
		this.client = null;
		this.sent = null;
		this.status = 'idle';
		this.message = null;
	};
};

module.exports = SubTask;
