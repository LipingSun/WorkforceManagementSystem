var ejs = require('ejs');
var mysql = require('./guard-mysql');

var MAIN_TABLE = 'guard';
var ERROR_MESSAGE = {
    "message" : "Error occurred",
    "success" : false,
    "status" : 401
};



function createGuard(req,res) {
	if(verifyCreateParameters(req) && req.body.hasOwnProperty("start_date") && req.body.hasOwnProperty("end_date")) {
		var user = req.body;
		mysql.insertNewGuardRecord(function(err,result) {
			if(err) {
				throw err;
			} else {
				res.send({status:200,message:"Sucessful"});
			}
		}, user)
	} else {
		res.send({status:401,message:"Error Occurred"});
	}
}

function getGuardByGuardId(req,res) {
	if(req.params.id) {
		mysql.getGuardByGuardId(req.params.id, function(err,result) {
			if(err) {
				throw err;
			} else {
				if(result.length > 0) {
					var guardResult = result[0];
					//var guard = {
					//		guard_id: guardResult.guard_id,
					//		first_name: guardResult.first_name,
					//		last_name: guardResult.last_name,
					//		address: guardResult.address,
					//		city: guardResult.city,
					//		state: guardResult.state,
					//		zip: guardResult.zip,
					//		phone_number: guardResult.phone_number,
					//		email_address: guardResult.email_address
					//};
					res.send(guardResult);
				} else {
					res.send({});
				}
			}
		});
	} else {
		res.send({status:401,message:"Error Occurred: guard_id not provided"});
	}
}

function getAllGuards(req,res) {
	mysql.getAllGuards(function(err,result) {
		if(err) {
			throw err;
		} else {
			if(result.length > 0) {
				//var guards = [];
				//for(var i = 0; i < result.length; i++) {
				//	var guardResult = result[i];
				//	var guard = {
				//			guard_id: guardResult.guard_id,
				//			first_name: guardResult.first_name,
				//			last_name: guardResult.last_name,
				//			address: guardResult.address,
				//			city: guardResult.city,
				//			state: guardResult.state,
				//			zip: guardResult.zip,
				//			phone_number: guardResult.phone_number,
				//			email_address: guardResult.email_address
				//	};
				//	guards.push(guard);
				//}
				if(req.hasOwnProperty("isQueue")) {
					var response = {
							code: 200,
							guards: result
					}
				}
				res.send(result);
			} else {
				res.send({});
			}
		}
	});
}

function deleteGuard(req,res) {
	if(req.params.id) {
		mysql.deleteGuard(req.params.id,function(err,result) {
			if(err) {
				throw err;
			} else {
				res.send({status:200,message:"Guard successfully deleted"});
			}
		});
	} else {
		res.send({status:401,message: "Error Occured: guard_id not provided"});
	}
}

function updateGuardInfo(req,res) {
	if(req.params.id && req.body.hasOwnProperty("firstName") && req.body.hasOwnProperty("lastName") && req.body.hasOwnProperty("address") &&
			req.body.hasOwnProperty("city") && req.body.hasOwnProperty("state") && req.body.hasOwnProperty("zipCode") && req.body.hasOwnProperty("phoneNumber") && req.body.hasOwnProperty("email")) {
		var updateInfo = {
				guard_id: req.query.guard_id,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				address: req.body.address,
				city: req.body.city,
				state: req.body.state,
				zip_code: req.body.zip_code,
				phone_number: req.body.phone_number,
				email: req.body.email
		};
		mysql.updateGuardInfo(updateInfo, function(err,result) {
			res.send(updateInfo);
		})
	} else {
		res.send({status:401, message: "Error Occured"});
	}
}

function verifyCreateParameters(req) {
	if (typeof req.body.firstName !== 'undefined' && req.body.firstName.length > 2 &&
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

exports.createGuard=createGuard;
exports.getGuardByGuardId=getGuardByGuardId;
exports.getAllGuards=getAllGuards;
exports.deleteGuard=deleteGuard;
exports.updateGuardInfo=updateGuardInfo;