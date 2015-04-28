var guard = require('../routes/guard');

function handleCreateGuard(msg,callback) {
	msg.isQueue = true;
	guard.createGuard(msg, callback);
}

function handleGetGuardByGuardId(msg,callback) {
	msg.isQueue = true;
	guard.getGuardByGuardId(msg, callback);
}

function handleGetAllGuards(msg,callback) {
	msg.isQueue = true;
	guard.getAllGuards(msg, callback);
}

function handle_request(msg, callback){
	
	var res = {};
	if(msg.method == "getAllGuards") {
		handleGetAllGuards(msg, callback);
	} else if(msg.method == "createGuard") {
		handleCreateGuard(msg, callback);
	} else if(msg.method == "getGuardByGuardId") {
		handleGetGuardByGuardId(msg,callback);
	} else {
		callback(null, res);
	}
}

exports.handle_request = handle_request;