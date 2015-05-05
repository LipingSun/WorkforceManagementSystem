var ejs = require('ejs');
var mysql = require('./user-mysql');

var CLIENT_TABLE= 'user';
var ERROR_MESSAGE = {
    "message" : "Error occurred",
    "success" : false,
    "status" : 401
};

function createUser(req,res) {
	if(verifyCreateParameters(req) == true) {
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			user_type: req.body.user_type,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zip_code,
			phone_number: req.body.phone_number,
			password: req.body.password,
			email: req.body.email
		};
		mysql.insertNewUserRecord(function(err, results) {
			if(err) {
				throw err;
			} else {
//				req.session.email = req.body.email;
//				var newSessionExpireTime = 1000 * 60 * 60 * 24;
//				req.session.cookie.expires = new Date(Date.now() + newSessionExpireTime);
//				req.session.cookie.maxAge = newSessionExpireTime;
//				setLastLogin(req.session.email);
				res.send({status:200,message:"Successful"});
			}
		},newUser);
	} else {
		res.render('index', ERROR_MESSAGE);
	}
}

function getUserById(req,res) {
	if(req.params.id !== 'undefined') {
		mysql.getUserById(req.params.id, function(err,results) {
			if(err) {
				throw err;
			} else {
				var user = results[0];
				res.send({
					user_id: user.user_id,
					user_type: user.user_type,
					first_name: user.first_name,
					last_name: user.last_name,
					address: user.address,
					city: user.city,
					state: user.state,
					zip_code: user.zip_code,
					phone_number: user.phone_number,
					email: user.email
				});
//				res.render('user-search',{
//					id: results.id,
//					firstName: results.firstName,
//					lastName: results.lastName,
//					address: results.address,
//					city: results.city,
//					state: results.state,
//					zipCode: results.zip,
//					phoneNumber: results.phoneNumber,
//					email: results.email
//				});
			}
		});
	} else {
		res.render('index', ERROR_MESSAGE);
	}
}

function getAllUsers(req,res) {
	mysql.getAllUsers(function(err,result) {
		if(err) {
			throw err;
		} else {
			var users = [];
			for(var i = 0; i < result.length; i++) {
				var user = result[i];
				var userObj = {
						user_id: user.user_id,
						user_type: user.user_type,
						first_name: user.first_name,
						last_name: user.last_name,
						address: user.address,
						city: user.city,
						state: user.state,
						zip_code: user.zip_code,
						phone_number: user.phone_number,
						email: user.email
				};
				users.push(userObj);
			}
			res.send(users);
		}
	});
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

exports.createUser=createUser;
exports.getUserById=getUserById;
exports.getAllUsers=getAllUsers;