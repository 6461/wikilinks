var express = require('express');
var router = express.Router();
const taskServer = require('../taskServer');

// GET request to get the next task.
router.get('/', function(req, res, next) {
	// TODO
	console.log('get task');
	
	// res.send('respond with a resource');
});

// POST request to submit a completed task.
router.post('/', function(req, res, next) {
	// TODO
	console.log('post task');
	
	// res.send('respond with a resource');
});

module.exports = router;
