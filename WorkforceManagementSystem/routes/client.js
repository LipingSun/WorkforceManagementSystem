var ejs = require('ejs');
var mysql = require('./client-mysql');
var cache = require('memory-cache');

var CLIENT_TABLE = 'client';
var ERROR_MESSAGE = {
    "message": "Error occurred",
    "success": false,
    "status": 500
};

function createClient(req, res) {
    if (verifyCreateParameters(req)) {
        var user = req.body;
        user.user_type = 'client';
        mysql.insertNewClientRecord(function (err, result) {
            if (err) {
                throw err;
            } else {
                if (req.hasOwnProperty("isQueue")) {
                    var response = {
                        code: 200
                    };
                    res(null, response);
                } else {
                    if (req.app.get('cacheManager') === true) {
                        cache.del('gacl');
                    }
                    res.send({status: 200, message: "Successful"});
                }
            }
        }, user)
    } else {
        res.send({status: 401, message: "Error Occurred"});
    }
}

function getClientByClientId(req, res) {
    if ("client_id" in req.params) {
        var client = cache.get('gcbc-' + req.params.client_id);
        if (client !== null && req.app.get('cacheManager') === true) {
            res.send(client);
        } else {
            mysql.getClientByClientId(req.params.client_id, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    if (result.length > 0) {
                        var clientResult = result[0];

                        if (req.hasOwnProperty("isQueue")) {
                            var response = {
                                code: 200,
                                client: clientResult
                            };
                            res(null, response);
                        } else {
                            if (req.app.get('cacheManager') === true) {
                                cache.put('gcbc-' + clientResult.client_id, clientResult, 36000);
                            }
                            res.send(clientResult);
                        }
                    } else {
                        if (req.hasOwnProperty("isQueue")) {
                            res(null, {});
                        } else {
                            res.send({});
                        }
                    }
                }
            });
        }
    }
    else {
        res.send({status: 401, message: "Error Occurred: client_id provided"});
    }
}

function getAllClients(req, res) {
    var clients = cache.get('gacl');
    if (clients !== null && req.app.get('cacheManager') === true) {
        res.send(clients);
    } else {
        mysql.getAllClients(function (err, result) {
            if (err) {
                throw err;
            } else {
                if (result.length > 0) {
                    if (req.hasOwnProperty("isQueue")) {
                        var response = {
                            code: 200,
                            clients: result
                        };
                        res(null, response);

                    } else {
                        if (req.app.get('cacheManager') === true) {
                            cache.put('gacl', result, 36000);
                        }

                        res.send(result);
                    }

                } else {
                    res.send({});
                }
            }
        });
    }
}

function deleteClient(req, res) {
    if ("client_id" in req.params) {
        mysql.deleteClient(req.params.client_id, function (err, result) {
            if (err) {
                throw err;
            } else {
                if (req.app.get('cacheManager') === true) {
                    cache.del('gacl');
                }
                res.send({status: 200, message: "Client successfully deleted"});
            }
        });
    } else {
        res.send({status: 401, message: "Error Occured: client_id not provided"});
    }
}

function verifyCreateParameters(req) {
    if (typeof req.body.first_name !== 'undefined' && req.body.first_name.length > 2 &&
        typeof req.body.last_name !== 'undefined' && req.body.last_name.length > 2 &&
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

exports.createClient = createClient;
exports.getClientByClientId = getClientByClientId;
exports.getAllClients = getAllClients;
exports.deleteClient = deleteClient;
