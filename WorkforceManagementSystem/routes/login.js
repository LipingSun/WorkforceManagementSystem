var express = require('express');
var mysql = require('mysql');
var squel = require('squel');

var login = express();

var connectionPool = mysql.createPool({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6138a04494eed',
    password: 'c592d894',
    database: 'ad_fcc7aab1bbdc042',
    connectionLimit: 3//,
    //multipleStatements: true
});

//GET //login
login.get('/', function (req, res) {
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
login.post('/', function (req, res) {
    console.log('\nPOST ' + req.originalUrl);

    var sql = squel.select().from('user_credentials').where('username=' + mysql.escape(req.body.email)).toString();
    console.log('DB Query: ' + sql);
    connectionPool.query(sql, function (err, data) {
        if (!err) {
            console.log('DB Result: ' + JSON.stringify(data));
            if (data[0].password === req.body.password) {
                req.session.regenerate(function (err) {
                    if (!err) {
                        req.session.user = {};
                        req.session.user.user_id = data[0].user_id;
                        req.session.user.login = true;
                        req.session.user.type = data[0].user_type;
                        res.location('/');
                        res.json(200, req.session.user);
                    }
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

module.exports = login;