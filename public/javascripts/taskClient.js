"use strict";

function log(message) {
	const textArea = document.getElementById('task-log');
	textArea.value = textArea.value + message + '\n';
	textArea.scrollTop = textArea.scrollHeight;
};

function result(message) {
	const textArea = document.getElementById('result');
	textArea.value = textArea.value + message + '\n';
	textArea.scrollTop = textArea.scrollHeight;
};

function process() {
	const api = 'https://en.wikipedia.org/w/api.php';
	let page = null;
	
	axios
		.get('/task')
		.then(function(response) {
			// Handle get task
			if (response.data.message != null) {
				result(response.data.message);
			};
			
			page = response.data.page;
			if (page != null && page.length > 0) {
				log(`Page: ${page}.`);
				
				return axios.get(api, {params: {
					origin: '*',
					action: 'query',
					format: 'json',
					prop: 'links',
					pllimit: 'max',
					titles: page
				}});
			} else {
				log('No tasks available.');
			};
		})
		.then(function(response) {
			// Handle get links
			const pages = response.data.query.pages;
			const links = [];
			
			for (let p in pages) {
				if (pages[p].links != null && pages[p].links.length > 0) {
					for (let l of pages[p].links) {
						if (l.ns === 0) {
							links.push(l.title);
						};
					};
				};
			};
			
			if (links.length === 0) {
				log(`No links in page: ${page}.`);
			};
			
			return axios.post('/task', {page: page, links: links});
		})
		.then(function(response) {
			// Handle post reponse
			// console.log(response.data);
		})
		.catch(function(error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
			poll();
		});
};

function poll() {
	setTimeout(function() {process();}, 1000);
};

poll();
