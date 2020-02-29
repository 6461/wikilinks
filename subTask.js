"use strict";

class SubTask {
	constructor(page, client) {
		this.page = page;
		this.client = client;
		this.time = Date.now();
	};
};

module.exports = SubTask
