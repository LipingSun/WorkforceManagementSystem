var express = require('express');
var mysql = require('mysql');
var squel = require('squel');
var crypto = require('crypto');
var guard = require('./guard');
var client = require('./client');
var admin = require('./user');

var connectionPool = mysql.createPool({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6138a04494eed',
    password: 'c592d894',
    database: 'ad_fcc7aab1bbdc042',
    connectionLimit: 2//,
    //multipleStatements: true
});

var auth = {};
auth.login = express();
auth.logout = express();
auth.register = express();

//GET //login
auth.login.get('/', function (req, res) {
    console.log('\nGET ' + req.originalUrl);
    if (req.session.user) {
        res.json(200, req.session.user);
    } else {
        res.json(500, {
            'message': 'Error occurred',
            'success': false,
            'status': 500
        });
    }
});

//POST /login
auth.login.post('/', function (req, res) {
    console.log('\nPOST ' + req.originalUrl);

    var sql = squel.select().from('user').where('email=' + mysql.escape(req.body.email)).toString();
    console.log('DB Query: ' + sql);
    connectionPool.query(sql, function (err, data) {
        if (!err) {
            console.log('DB Result: ' + JSON.stringify(data));
            if (data.length !== 0) {
                crypto.pbkdf2(req.body.password, data[0].salt, 10000, 32, 'sha256', function(err, key) {
                    console.log("Encrypt key: " + key.toString('hex'));
                    if (key.equals(data[0].password)) {
                        req.session.regenerate(function (err) {
                            if (!err) {
                                req.session.user = {};
                                req.session.user.id = data[0].user_id;
                                req.session.user.login = true;
                                req.session.user.type = data[0].user_type;
                                res.location('/');
                                res.json(200, req.session.user);
                                //sql = 'UPDATE user SET last_login=' + mysql.escape(time()) + ' WHERE email=' + req.body.email;
                                //connectionPool.query(sql, function (err, data) {
                                //    if (err) console.log("DB ERROR: " + err.message);
                                //});
                            }
                        });
                    } else {
                        console.log('Error: incorrect password');
                        res.json(500, {
                            'message': 'Incorrect password',
                            'success': false,
                            'status': 500
                        });
                    }
                });
            } else {
                console.log('Error: No user');
                res.json(500, {
                    'message': "Can't find this user",
                    'success': false,
                    'status': 500
                });
            }
        } else {
            console.log('DB ERROR: ' + err.message);
            res.json(500, {
                'message': 'Error occurred',
                'success': false,
                'status': 500
            });
        }
    });
});

//ALL /logout
auth.logout.all('/', function(req, res, next) {
    req.session.destroy();
    res.location('/');
    res.render('login.html');
});

auth.register.post('/', function (req, res) {
    if (req.body.user_type === 'admin') {
        admin.createUser(req, res);
    }
    if (req.body.user_type === 'client') {
        client.createClient(req, res);
    }
    if (req.body.user_type === 'guard') {
        guard.createGuard(req, res);
    }
});

module.exports = auth;