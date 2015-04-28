var mysql = require('mysql');
var MAIN_TABLE = 'bill';
var CONNECTION_POOL=false;

var pool = mysql.createPool({
	connectionLimit: 10,
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
//	    host     : 'us-cdbr-iron-east-02.cleardb.net',
//    	user     : 'b6138a04494eed',
//    	password : 'c592d894',
//    	database : 'ad_fcc7aab1bbdc042'
		host : 'localhost',
		user : 'root',
		password : 'warri0rs',
		database : 'wms'
	});
	return connection;
}

function getPooledConnection(callback) {
	pool.getConnection(function(err, connection) {
		callback(err,connection);
	});
}


function createBillForClient(bill,callback) {
	if(bill.hasOwnProperty("client_id") && bill.hasOwnProperty("bill_amount") && bill.hasOwnProperty("from_date")) {
		var query = "insert into bill (client_id, bill_amount, from_date, to_date) " + 
					"values ('" + bill.client_id +"','" + bill.bill_amount + "','" + bill.from_date + "','" + bill.to_date + "')";
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
					callback(err,result);
				}
			});
			connection.end();
		}
	} else {
		callback(false,[]);
	}
}

function getBillsForClient(client_id,callback) {
	if(client_id) {
		var query = "select b.bill_id, b.client_id, b.bill_amount, b.from_date, b.to_date, b.paid " +  
					"from bill b " + 
					"where b.client_id = '" + client_id +  "'";
		executeQuery(query, function(err,result) {
			if(err) {
				throw err;
			} else {
				callback(err,result)
			}
		});
	} else {
		callback(err,{});
	}
}

function executeQuery(query,callback) {
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
				callback(err,result);
			}
		});
		connection.end();
	}
}

exports.createBillForClient=createBillForClient;
exports.getBillsForClient=getBillsForClient;