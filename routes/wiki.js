var express = require('express');
var router = express.Router();
const taskServer = require('../taskServer');

// GET request to render the task page.
router.get('/', function(req, res, next) {
	res.render('wiki', {title: 'wikilinks'});
});

// POST request to create a new task.
router.post('/', function(req, res, next) {
	// TODO
	// console.log(req.body);
	console.log('A: ' + req.body.link_a);
	console.log('B: ' + req.body.link_b);
	
	res.render('wiki', {title: 'wikilinks'});
});

module.exports = router;
