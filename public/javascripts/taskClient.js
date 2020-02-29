"use strict";

const api = 'https://en.wikipedia.org/w/api.php';

function getTask() {};

function postResult() {};

function fetchPage(title) {
	const links = [];
	
	axios.get(api, {
		params: {
			origin: '*',
			action: 'query',
			format: 'json',
			prop: 'links',
			pllimit: 'max',
			titles: title
		}
	})
	.then(function(response) {
		// handle success
		const pages = response.data.query.pages;
		for (let p in pages) {
			for (let l of pages[p].links) {
				if (l.ns === 0) {
					links.push(l.title);
					console.log(l.title);
				};
			};
		};
	})
	.catch(function(error) {
		// handle error
		console.log(error);
	})
	
	return links;
};

fetchPage('Cucumber');
