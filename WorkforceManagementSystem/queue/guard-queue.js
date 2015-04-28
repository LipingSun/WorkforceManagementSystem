var ejs = require("ejs");
var mq_client = require('../rpc/rpc-client');

function createGuard(req,res) {
	var msg_payload = {
		method: "createGuard",
		body: req.body
	};
	mq_client.make_request('guard_queue', msg_payload, function(err, results) {
		if(err) {
			throw err;
		} else {
			if(results.code == 200) {
				res.send({status: 200, message: "Guard Created Successfully"});
			}
		}
	});
}

function getGuardByGuardId(req,res) {
	var msg_payload = {
			method: "getGuardByGuardId",
			query: req.query
	};
	mq_client.make_request('guard_queue',msg_payload,function(err,results) {
		if(err) {
			throw err;
		} else {
			if(results.code == 200) {
				res.send(results.guard);
			} else {
				res.send({status:401, message: "Error Occurred"});
			}
		}
	});
}

function getAllGuards(req,res) {
	var msg_payload = {
		method: "getAllGuards"	
	};
	mq_client.make_request('guard_queue',msg_payload,function(err,results) {
		console.log(results);
		if(err) {
			throw err;
		} else {
			if(results.code == 200) {
				res.send(results.guards);
			} else {
				res.send({status:401, message: "Error Occurred"});
			}
		}
	});
}

exports.getAllGuards=getAllGuards;
exports.createGuard=createGuard;
exports.getGuardByGuardId=getGuardByGuardId;