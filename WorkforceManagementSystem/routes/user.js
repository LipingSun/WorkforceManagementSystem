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
			firstName: req.body.firstName, 
			lastName: req.body.lastName, 
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip,
			phoneNumber: req.body.phoneNumber,
			zip: req.body.zip,
			password: req.body.password,
			email_address: req.body.email
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
				res.render('index',{first_name: req.body.first_name});
			}
		},newUser);
	} else {
		res.render('index', ERROR_MESSAGE);
	}
}

function getUserById(req,res) {
	if(req.params.id) {
		mysql.getUserById(req.query.id, function(err,results) {
			if(err) {
				throw err;
			} else {
				var user = results[0];
				res.send({
					id: user.user_id,
					firstName: user.first_name,
					lastName: user.last_name,
					address: user.address,
					city: user.city,
					state: user.state,
					zipCode: user.zip,
					phoneNumber: user.phone_number,
					email: user.email_address
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
			var users = []
			for(var i = 0; i < result.length; i++) {
				var user = result[i];
				var userObj = {
						id: user.user_id,
						firstName: user.first_name,
						lastName: user.last_name,
						address: user.address,
						city: user.city,
						state: user.state,
						zipCode: user.zip,
						phoneNumber: user.phone_number,
						email: user.email_address
				};
				users.push(userObj);
			}
			res.send(users);
		}
	});
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

exports.createUser=createUser;
exports.getUserById=getUserById;
exports.getAllUsers=getAllUsers;