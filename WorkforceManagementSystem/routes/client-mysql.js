var ejs= require('ejs');
var mysql = require('mysql');
var CONNECTION_POOL = false;
var user = require('./user-mysql');

var pool = mysql.createPool({
	connectionLimit: 3,
//	host     : 'us-cdbr-iron-east-02.cleardb.net',
//    user     : 'b6138a04494eed',
//    password : 'c592d894',
//    database : 'ad_fcc7aab1bbdc042'
	host : 'localhost',
	user : 'root',
	password : 'warri0rs',
	database : 'wms'
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

function executeQuery(query,callback) {
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
		console.log(query);
		var connection = getConnection();
		connection.query(query, function(err,result) {
			if(err) {
				throw err;
			} else {
				callback(err,result);
			}
		});
		connection.end();
	}
}

function insertNewClientRecord(callback,client) {
	user.insertNewUserRecord(function(err, results) {
		if(err) {
			throw err;
		} else {
			var query = "insert into client (client_id, start_date, end_date, monthly_service_charge, balance) values ( " +
		 	"'" + results.user_id + "'" + "," + "'" + client.start_date + "'" + "," + "'" + client.end_date + "'" + "," + "'" + 0 + "'" + "," + "'" + client.balance + "'" + ");";
			executeQuery(query,callback);
		}
	}, client);
}

function getClientByClientId(client_id,callback) {
	var query = "select c.client_id,u.first_name,u.last_name,u.address,u.city,u.state,u.zip_code,u.phone_number,u.email,c.start_date,c.end_date,monthly_service_charge,balance " +
				"from client c " +
					"left outer join user u on c.client_id = u.user_id " +
				"where c.client_id = '" + client_id + "'";
	executeQuery(query,callback);
}

function getAllClients(callback) {
	var query = "select c.client_id,u.first_name,u.last_name,u.address,u.city,u.state,u.zip_code,u.phone_number,u.email,c.start_date,c.end_date,monthly_service_charge,balance " +
				"from client c " +
					"left outer join user u on c.client_id = u.user_id ";
	executeQuery(query,callback);
}

function deleteClient(client_id,callback) {
	var query = "delete from client where client_id = '" + client_id +"'";
	executeQuery(query,callback);
}

exports.getPooledConnection=getPooledConnection;
exports.insertNewClientRecord=insertNewClientRecord;
exports.getClientByClientId=getClientByClientId;
exports.getAllClients=getAllClients;
exports.deleteClient=deleteClient;
