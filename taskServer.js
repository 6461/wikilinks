"use strict";

const Task = require('./task');
const SubTask = require('./subTask');

const TaskServer = {
	tasks: [],
	queue: [],
	level: null,
	notify: false,
	// Timeout in ms.
	timeout: 10000,
	
	createTask(start, end) {
		const num = this.tasks.length;
		const task = new Task(start, end);
		this.tasks.push(task);
		
		// FIXME: Only one task is supported.
		if (this.tasks.length === 1) {
			this.createSubTask(num, start, '>>>', 0);
			this.createSubTask(num, end, '<<<', 0);
		};
	},
	
	createSubTask(task, page, direction, level) {
		const sub = new SubTask(task, page, direction, level);
		
		for (let i = 0; i < this.queue.length; i++) {
			if (page === this.queue[i].page) {
				// Page is already in queue.
				sub.status = 'skip';
				// Check for a complete path.
				if (this.queue[i].level === 0 &&
				direction !== this.queue[i].direction) {
					if (this.level == null || this.level > level) {
						this.level = level;
					};
					this.notify = true;
					
					console.log('Match!');
					console.log(sub);
				};
			};
		};
		
		this.queue.push(sub);
	},
	
	getNextSubTask(address) {
		let sub = null;
		
		if (this.queue.length > 0) {
			for (let i = 0; i < this.queue.length; i++) {
				if ('idle' === this.queue[i].status ||
				('sent' === this.queue[i].status &&
				Date.now() > this.queue[i].sent + this.timeout)) {
					if (this.level != null && this.level < this.queue[i].level) {
						// Shorter path has already been found.
						this.queue[i].status = 'skip';
					} else {
						// Select this sub task.
						this.queue[i].client = address;
						this.queue[i].sent = Date.now();
						this.queue[i].status = 'sent';
						sub = this.queue[i];
						break;
					};	
				};
			};
		};
		
		if (this.notify) {
			const msg = `Path has been found with a distance of ${this.level}.`;
			
			if (sub != null) {
				sub.message = msg;
			} else {
				sub = {message: msg};
			};
			
			// this.notify = false;
		};
		
		return sub;
	},
	
	process(page, links, address) {
		for (let i = 0; i < this.queue.length; i++) {
			if (page === this.queue[i].page) {
				if (address === this.queue[i].client &&
				Date.now() < this.queue[i].sent + this.timeout) {
					const task = this.queue[i].task;
					const direction = this.queue[i].direction;
					const level = this.queue[i].level + 1;
					
					if (links != null && links.length > 0) {
						for (let l of links) {
							this.createSubTask(task, l, direction, level);
						};
					};
				};
				
				this.queue[i].status = 'done';
				// console.log(this.queue[i]);
				
				break;
			};
		};
	},
};

module.exports = TaskServer;
