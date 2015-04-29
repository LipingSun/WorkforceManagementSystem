var ejs = require('ejs');
var mysql = require('./client-mysql');

var CLIENT_TABLE= 'client';
var ERROR_MESSAGE = {
    "message" : "Error occurred",
    "success" : false,
    "status" : 500
};

function createClient(req,res) {
	if(verifyCreateParameters(req)){
		var user = req.body;
		mysql.insertNewClientRecord(function(err,result) {
			if(err) {
				throw err;
			} else {
				if(req.hasOwnProperty("isQueue")) {
					var response = {
							code: 200
					};
					res(null,response);
				} else {
					res.send({status:200,message:"Sucessful"});
				}
			}
		}, user)
	} else {
		res.send({status:401,message:"Error Occurred"});
	}
}

function getClientByClientId(req,res) {
	if(req.params.id) {
		mysql.getClientByClientId(req.params.id, function(err,result) {
			if(err) {
				throw err;
			} else {
				if(result.length > 0) {
					var clientResult = result[0];
					var client = {
							client_id: clientResult.client_id,
							firstName: clientResult.first_name,
							lastName: clientResult.last_name,
							address: clientResult.address,
							city: clientResult.city,
							state:clientResult.state,
							zipCode: clientResult.zip,
							phoneNumber: clientResult.phone_number,
							email: clientResult.email
					};
					if(req.hasOwnProperty("isQueue")) {
						var response = {
								code: 200,
								client:client
						};
						res(null,response);
					} else {
						res.send(client);
					}
				} else {
					if(req.hasOwnProperty("isQueue")) {
						res(null,{});
					} else {
						res.send({});	
					}
				}
			}
		});
	} else {
		res.send({status:401,message:"Error Occurred: client_id provided"});
	}
}

function getAllClients(req,res) {
	mysql.getAllClients(function(err,result) {
		if(err) {
			throw err;
		} else {
			if(result.length > 0) {
				var clients = [];
				for(var i = 0; i < result.length; i++) {
					var clientResult = result[i];
					var client = {
							client_id: clientResult.client_id,
							firstName: clientResult.first_name,
							lastName: clientResult.last_name,
							address: clientResult.address,
							city: clientResult.city,
							state:clientResult.state,
							zipCode: clientResult.zip,
							phoneNumber: clientResult.phone_number,
							email: clientResult.email
					};
					clients.push(client);
				}
				if(req.hasOwnProperty("isQueue")) {
					var response = {
							code: 200,
							clients: clients
					};
					res(null,response);
					
				} else {
					res.send(clients);
				}
				
			} else {
				res.send({});
			}
		}
	});
}

function deleteClient(req,res) {
	if(req.params.id) {
		mysql.deleteClient(req.params.id,function(err,result) {
			if(err) {
				throw err;
			} else {
				res.send({status:200,message:"Client successfully deleted"});
			}
		});
	} else {
		res.send({status:401,message: "Error Occured: client_id not provided"});
	}
}

function verifyCreateParameters(req) {
	if (typeof req.body.firstName !== 'undefined' && req.body.firstName.length > 2 &&
			typeof req.body.lastName !== 'undefined'  && req.body.lastName.length > 2 &&
			typeof req.body.address !== 'undefined' && req.body.address.length > 2 &&
			typeof req.body.city !== 'undefined' && req.body.city.length > 2 &&
			typeof req.body.state !== 'undefined' && req.body.state.length > 1 &&
			typeof req.body.zipCode !== 'undefined' && req.body.zipCode.length > 2 &&
			typeof req.body.phoneNumber !== 'undefined' && req.body.phoneNumber.length > 2 &&
			typeof req.body.email !== 'undefined' && req.body.email.length > 2 &&
			typeof req.body.password !== 'undefined' && req.body.password.length > 2) {
		return true;
	} else {
		return false;
	}
}

exports.createClient=createClient;
exports.getClientByClientId=getClientByClientId;
exports.getAllClients=getAllClients;
exports.deleteClient=deleteClient;