var ejs= require('ejs');
var mysql = require('mysql');
var Chance = require('chance');
var crypto = require('crypto');
var CONNECTION_POOL = false;


var pool = mysql.createPool({
	connectionLimit: 3,
//	host     : 'us-cdbr-iron-east-02.cleardb.net',
//    user     : 'b6138a04494eed',
//    password : 'c592d894',
//    database : 'ad_fcc7aab1bbdc042'
	host : 'localhost',
	user : 'root',
	password : 'warri0rs',
	database : 'ad_fcc7aab1bbdc042'
});

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'us-cdbr-iron-east-02.cleardb.net',
    	user     : 'b6138a04494eed',
    	password : 'c592d894',
    	database : 'ad_fcc7aab1bbdc042'
//		host : 'localhost',
//		user : 'root',
//		password : 'warri0rs',
//		database : 'wms'
	});
	return connection;
}

function getPooledConnection(callback) {
	pool.getConnection(function(err, connection) {
		callback(err,connection);
	});
}

function insertNewUserRecord(callback,user) {
	var chance = new Chance();
	var user_id = chance.ssn();
	createCrypto(user.password, function(err,pass) {
		var query = "INSERT INTO user (user_id,user_type,first_name,last_name,address,city,state,zip_code,phone_number,password,salt,email) values " +
		"( "+ "'" + user_id + "'," +  "'" + user.user_type + "'"  + "," +  "'" + user.first_name + "'" + "," + "'" + user.last_name + "'" + "," +
			"'" + user.address + "'" + "," + "'" + user.city + "'" + "," + "'" + user.state + "'" + "," + "'" + user.zip_code + "'" + "," +
			"'" + user.phone_number + "'" + "," + pass.key  + "," +  pass.salt + "," + "'" + user.email + "'" +
		" )";
		console.log(query);
		if (CONNECTION_POOL) {
			getPooledConnection(function(error, connection) {
				connection.query(query,function(err,result) {
					if(err) {
						throw err;
					} else {
						callback(err,result);
					}
				});
				connection.release();
			});
		} else {
			var connection = getConnection();
			connection.query(query, function(err,result) {
				if(err) {
					throw err;
				} else {
					result.user_id = user_id;
					callback(err,result);
				}
			});
			connection.end();
		}
	});
}

function getUserProfileData(email,callback) {
	var connection = getConnection();
	var query = 'select is_current,company_name ,city,state ' +
				'from user u ' +
    				'left outer join linkedin.user_experience ue on u.user_id = ue.user_id ' +
    				'left outer join linkedin.company c on ue.company_id = c.company_id ' +
				'where u.email = ' + "'" + email + "';";
	connection.query(query, function(err, results){
		if(err) {
			throw err;
		} else {
			callback(err,results);
		}
	});
	connection.end();
}

function getUserById(id,callback) {
	var query = 'select user.user_id, user.first_name, user.last_name, user.address, ' + 
    				'user.city, user.state, user.zip_code, user.phone_number, user.email ' + 
				'from user ' +
				'where user_id  = ' + id;
	console.log(query);
	if(CONNECTION_POOL) {

	} else {
		var connection = getConnection();
		connection.query(query,function(err,results) {
			if(err) {
				throw err;
			} else {
				callback(err,results);
			}
		});
	}
}

function getAllUsers(callback) {
	var query = 'select user.user_id, user.first_name, user.last_name, user.address, ' + 
    				'user.city, user.state, user.zip_code, user.phone_number, user.email ' + 
				'from user ';
	console.log(query);
	if(CONNECTION_POOL) {

	} else {
		var connection = getConnection();
		connection.query(query,function(err,results) {
			if(err) {
				throw err;
			} else {
				callback(err,results);
			}
		});
	}
}

function createCrypto(pwd,callback) {
	crypto.randomBytes(16, function(ex, salt) {
		if(ex) {
			throw ex;
		} else {
			console.log('Plain password: ' + pwd);
			console.log( "Salt: " + salt.toString('hex'));

			crypto.pbkdf2(pwd, salt, 10000, 32, 'sha256',function(err, key) {
				if(err) {
					throw err;
				} else {
					console.log("Encrypt key: " + key.toString('hex'));
		 			var pass = {
							key: mysql.escape(key),
							salt: mysql.escape(Buffer(salt,'binary'))
					};
					callback(err,pass);
				}
			});
		}
	});
}


exports.getPooledConnection=getPooledConnection;
exports.insertNewUserRecord=insertNewUserRecord;
exports.getUserById=getUserById;
exports.getAllUsers=getAllUsers;
