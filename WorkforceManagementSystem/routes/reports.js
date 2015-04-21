var mysql = require('mysql');
var squel = require('squel');

var express = require('express');

var report = express();

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6138a04494eed',
    password: 'c592d894',
    database: 'ad_fcc7aab1bbdc042'//,
    //multipleStatements: true
});

report.get('/:id', function (req, res, next) {
    console.log('/: ' + req.params.id);

    var sqlQuery = squel.select().from('report').where('REPORT_ID='+req.params.id).toString();

    console.log(sqlQuery);
    connection.query(sqlQuery, function (err, data, fields) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        else {
            console.log("DB Results:" + JSON.stringify(data));
            //callback(err, data);
        }
        connection.end();
        //connection.state = "disconnected";
        console.log("\nConnection closed..");
    });
    res.end();
});

//report.get('/list', function (req, res, next) {
//    console.log('list: ' + req.path);
//    res.end();
//});

module.exports = report;