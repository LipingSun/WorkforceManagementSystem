var client = require('../routes/client');

function handleCreateClient(msg,callback) {
	msg.isQueue = true;
	client.createClient(msg, callback);
}

function handleGetClientByClientId(msg,callback) {
	msg.isQueue = true;
	client.getClientByClientId(msg, callback);
}

function handleGetAllClients(msg,callback) {
	msg.isQueue = true;
	client.getAllClients(msg, callback);
}

function handle_request(msg, callback){
	
	var res = {};
	if(msg.method == "getAllClients") {
		handleGetAllClients(msg, callback);
	} else if(msg.method == "createClient") {
		handleCreateClient(msg, callback);
	} else if(msg.method == "getClientByClientId") {
		handleGetClientByClientId(msg,callback);
	} else {
		callback(null, res);
	}
}

exports.handle_request = handle_request;