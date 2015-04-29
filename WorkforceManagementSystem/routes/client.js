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
	if(req.query.hasOwnProperty('client_id')) {
		mysql.getClientByClientId(req.params.id, function(err,result) {
			if(err) {
				throw err;
			} else {
				if(result.length > 0) {
					var clientResult = result[0];
					//var client = {
					//		client_id: clientResult.client_id,
					//		firstName: clientResult.first_name,
					//		lastName: clientResult.last_name,
					//		address: clientResult.address,
					//		city: clientResult.city,
					//		state:clientResult.state,
					//		zipCode: clientResult.zip,
					//		phoneNumber: clientResult.phone_number,
					//		email: clientResult.email
					//};
					if(req.hasOwnProperty("isQueue")) {
						var response = {
								code: 200,
								client:clientResult
						};
						res(null,response);
					} else {
						res.send(clientResult);
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
				//for(var i = 0; i < result.length; i++) {
				//	var clientResult = result[i];
				//	var client = {
				//			client_id: clientResult.client_id,
				//			firstName: clientResult.first_name,
				//			lastName: clientResult.last_name,
				//			address: clientResult.address,
				//			city: clientResult.city,
				//			state:clientResult.state,
				//			zipCode: clientResult.zip,
				//			phoneNumber: clientResult.phone_number,
				//			email: clientResult.email
				//	};
				//	clients.push(client);
				//}
				if(req.hasOwnProperty("isQueue")) {
					var response = {
							code: 200,
							clients: result
					};
					res(null,response);
					
				} else {
					res.send(result);
				}
				
			} else {
				res.send({});
			}
		}
	});
}

function deleteClient(req,res) {
	if(req.query.hasOwnProperty("client_id")) {
		mysql.deleteClient(req.query.client_id,function(err,result) {
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
	if (typeof req.body.first_name !== 'undefined' && req.body.first_name.length > 2 &&
			typeof req.body.last_name !== 'undefined'  && req.body.last_name.length > 2 &&
			typeof req.body.address !== 'undefined' && req.body.address.length > 2 &&
			typeof req.body.city !== 'undefined' && req.body.city.length > 2 &&
			typeof req.body.state !== 'undefined' && req.body.state.length > 1 &&
			typeof req.body.zip_code !== 'undefined' && req.body.zip_code.length > 2 &&
			typeof req.body.phone_number !== 'undefined' && req.body.phone_number.length > 2 &&
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