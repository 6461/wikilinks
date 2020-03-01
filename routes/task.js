var express = require('express');
var router = express.Router();
const TaskServer = require('../taskServer');

// GET request to get the next task.
router.get('/', function(req, res, next) {
	const sub = TaskServer.getNextSubTask(req.connection.remoteAddress);
	
	if (sub == null) {
		res.json({status: 'done'});
	} else {
		res.json(sub);
	}
});

// POST request to submit a completed task.
router.post('/', function(req, res, next) {
	const page = req.body.page;
	const links = req.body.links;
	
	if (page.length > 0) {
		TaskServer.process(page, links, req.connection.remoteAddress);
	};
	
	res.status(202).json({status: 'ok'});
});

module.exports = router;
