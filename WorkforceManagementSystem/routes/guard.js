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
	if(req.query.hasOwnProperty('guard_id')) {
		mysql.getGuardByGuardId(req.query.guard_id, function(err,result) {
			if(err) {
				throw err;
			} else {
				if(result.length > 0) {
					var guardResult = result[0];
					var guard = {
							guard_id: guardResult.guard_id,
							first_name: guardResult.first_name,
							last_name: guardResult.last_name,
							address: guardResult.address,
							city: guardResult.city,
							state: guardResult.state,
							zip: guardResult.zip,
							phone_number: guardResult.phone_number,
							email_address: guardResult.email_address
					};
					res.send(guard);
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
				var guards = [];
				for(var i = 0; i < result.length; i++) {
					var guardResult = result[i];
					var guard = {
							guard_id: guardResult.guard_id,
							first_name: guardResult.first_name,
							last_name: guardResult.last_name,
							address: guardResult.address,
							city: guardResult.city,
							state: guardResult.state,
							zip: guardResult.zip,
							phone_number: guardResult.phone_number,
							email_address: guardResult.email_address
					};
					guards.push(guard);
				}
				if(req.hasOwnProperty("isQueue")) {
					var response = {
							code: 200,
							guards: guards
					}
				}
				res.send(guards);
			} else {
				res.send({});
			}
		}
	});
}

function deleteGuard(req,res) {
	if(req.query.hasOwnProperty("guard_id")) {
		mysql.deleteGuard(req.query.guard_id,function(err,result) {
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
	if(req.query.hasOwnProperty("guard_id") && req.body.hasOwnProperty("firstName") && req.body.hasOwnProperty("lastName") && req.body.hasOwnProperty("address") &&
			req.body.hasOwnProperty("city") && req.body.hasOwnProperty("state") && req.body.hasOwnProperty("zipCode") && req.body.hasOwnProperty("phoneNumber") && req.body.hasOwnProperty("email")) {
		var updateInfo = {
				guard_id: req.query.guard_id,
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				address: req.body.address,
				city: req.body.city,
				state: req.body.state,
				zip: req.body.zipCode,
				phone_number: req.body.phoneNumber,
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
			typeof req.body.lastName !== 'undefined'  && req.body.lastName.length > 2 &&
			typeof req.body.address !== 'undefined' && req.body.address.length > 2 &&
			typeof req.body.city !== 'undefined' && req.body.city.length > 2 &&
			typeof req.body.state !== 'undefined' && req.body.state.length > 1 &&
			typeof req.body.zip !== 'undefined' && req.body.zip.length > 2 &&
			typeof req.body.phoneNumber !== 'undefined' && req.body.phoneNumber.length > 2 &&
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