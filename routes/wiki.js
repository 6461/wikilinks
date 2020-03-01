var express = require('express');
var router = express.Router();
const TaskServer = require('../taskServer');

// GET request to render the task page.
router.get('/', function(req, res, next) {
	res.render('wiki', {title: 'wikilinks'});
});

// POST request to create a new task.
router.post('/', function(req, res, next) {
	const start = req.body.link_a.trim();
	const end = req.body.link_b.trim();
	
	if (start.length > 0 && end.length > 0) {
		TaskServer.createTask(start, end);
	};
	
	res.render('wiki', {title: 'wikilinks'});
});

module.exports = router;
