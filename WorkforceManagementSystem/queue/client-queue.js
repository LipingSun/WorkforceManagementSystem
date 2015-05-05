var ejs = require("ejs");
var mq_client = require('../rpc/rpc-client');

function createClient(req,res) {
	var msg_payload = {
		method: "createClient",
		body: req.body
	};
	mq_client.make_request('client_queue', msg_payload, function(err, results) {
		if(err) {
			throw err;
		} else {
			if(results.code == 200) {
				res.send({status: 200, message: "Client Created Successfully"});
			}
		}
	});
}

function getClientByClientId(req,res) {
	var msg_payload = {
			method: "getClientByClientId",
			query: req.query,
			params: {
				client_id: req.params.client_id
			}
	};
	mq_client.make_request('client_queue',msg_payload,function(err,results) {
		if(err) {
			throw err;
		} else {
			if(results.code == 200) {
				res.send(results.client);
			} else {
				res.send({status:401, message: "Error Occurred"});
			}
		}
	});
}

function getAllClients(req,res) {
	var msg_payload = {
		method: "getAllClients"	
	};
	mq_client.make_request('client_queue',msg_payload,function(err,results) {
		console.log(results);
		if(err) {
			throw err;
		} else {
			if(results.code == 200) {
				res.send(results.clients);
			} else {
				res.send({status:401, message: "Error Occurred"});
			}
		}
	});
}

exports.getAllClients=getAllClients;
exports.createClient=createClient;
exports.getClientByClientId=getClientByClientId;