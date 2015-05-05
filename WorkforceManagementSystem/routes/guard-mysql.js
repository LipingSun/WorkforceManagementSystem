var ejs= require('ejs');
var mysql = require('mysql');
var user = require('./user-mysql');
var CONNECTION_POOL = false;

var pool = mysql.createPool({
	connectionLimit: 3,
	host     : 'us-cdbr-iron-east-02.cleardb.net',
    user     : 'b6138a04494eed',
    password : 'c592d894',
    database : 'ad_fcc7aab1bbdc042'
	//host : 'localhost',
	//user : 'root',
	//password : 'warri0rs',
	//database : 'wms'
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
				console.log('Error: ' + err);
			} else {
				callback(err,result);
			}
		});
		connection.end();
	}
}

function insertNewGuardRecord(callback,guard) {
	user.insertNewUserRecord(function(err, results) {
		if(err) {
			throw err;
		} else {
			var query = "insert into guard (guard_id, start_date, end_date, background_check_status) values ( " +
		 	"'" + results.user_id + "'" + "," + "'" + guard.start_date + "'" + "," + "'" + guard.end_date + "'" + "," + "'" + guard.background_check_status + "'" + ");";
			executeQuery(query,callback);
		}
	}, guard);
}

function getGuardByGuardId(guard_id,callback) {
	var query = "select g.guard_id, g.start_date, g.end_date, g.background_check_status, u.user_id, u.first_name, u.last_name, u.address, u.city, u.state, u.zip_code, u.phone_number, u.email " +
				"from guard g " +
					"left outer join user u on g.guard_id = u.user_id " +
				"where g.guard_id = '" + guard_id + "'";
	executeQuery(query,callback);
}

function getAllGuards(callback) {
	var query = "select g.guard_id, g.start_date, g.end_date, g.background_check_status, u.first_name, u.last_name, u.address, u.city, u.state, u.zip_code, u.phone_number, u.email " +
				"from guard g " +
					"left outer join user u on g.guard_id = u.user_id ";
	executeQuery(query, callback);
}

function deleteGuard(guard_id,callback) {
	var query = "delete from guard where guard_id = '" + guard_id +"'";
	executeQuery(query,callback);
}

function updateGuardInfo(updateInfo,callback) {
	var query = "update guard g inner join user u on (g.guard_id = u.user_id) " +
				"set u.first_name = '" + updateInfo.first_name + "', " +
					"u.last_name = '" + updateInfo.last_name + "', u.address = '" + updateInfo.address + "', u.city = '" + updateInfo.city + "', u.zip_code = '" + updateInfo.zip_code + "', " +
					"u.phone_number = '" + updateInfo.phone_number + "', u.email = '" + updateInfo.email + "' " +
				"where g.guard_id = '" + updateInfo.guard_id + "'";
	executeQuery(query,callback);
}

function getGuardSchedule(guard_id,callback) {
    var query = "select * from weekly_schedule where guard_id = '" + guard_id + "'";
    executeQuery(query,callback);
}

function createGuardSchedule(schedule,callback) {
    var query = "insert into weekly_schedule (guard_id, start_time, end_time, weekday, building_id) values ( " +
        "'" + schedule.guard_id + "'" + "," + "'" + schedule.start_time + "'" + "," + "'" + schedule.end_time + "'" + "," + "'" + schedule.weekday + "'" + "," + "'" + schedule.building_id + "'" + ");";
    executeQuery(query,callback);
}


exports.getPooledConnection=getPooledConnection;
exports.insertNewGuardRecord=insertNewGuardRecord;
exports.getGuardByGuardId=getGuardByGuardId;
exports.getAllGuards=getAllGuards;
exports.deleteGuard=deleteGuard;
exports.updateGuardInfo=updateGuardInfo;
exports.getGuardSchedule=getGuardSchedule;
exports.createGuardSchedule=createGuardSchedule;