var mysql = require('mysql');
var squel = require('squel');

var express = require('express');

var alert = express();

var connectionPool = mysql.createPool({
    //host: 'us-cdbr-iron-east-02.cleardb.net',
    //user: 'b6138a04494eed',
    //password: 'c592d894',
    //database: 'ad_fcc7aab1bbdc042',
    host     : 'localhost',
    user     : 'root',
    database : 'ad_fcc7aab1bbdc042',
    connectionLimit: 2//,
    //multipleStatements: true
});

//ALL /alerts
alert.all('/', function (req, res) {
    console.log('\nALL ' + req.originalUrl);

    var sql = squel.select().from('report_item').where('report_item.type="alert"').left_join('report', null, 'report_item.report_id = report.report_id').left_join('building', null, 'report.building_id = building.building_id').left_join('user', 'u1', 'u1.user_id=guard_id').left_join('user', 'u2', 'u2.user_id=client_id')
        .field('report_item_id').field('time').field('checkpoint_id').field('severity').field('description')
        .field('guard_id').field('u1.first_name', 'guard_first_name').field('u1.last_name', 'guard_last_name')
        .field('report.building_id').field('building.name')
        .field('client_id').field('u2.first_name', 'client_first_name').field('u2.last_name', 'client_last_name');

    if ('building_id' in req.query) {
        sql = sql.where('report.building_id=' + mysql.escape(req.query.building_id));
    }
    if ('client_id' in req.query) {
        sql = sql.where('building.client_id=' + mysql.escape(req.query.client_id));
    }
    if ('start_date' in req.query) {
        sql = sql.where('report.date>=' + mysql.escape(req.query.start_date));
    }
    if ('end_date' in req.query) {
        sql = sql.where('report.date<=' + mysql.escape(req.query.end_date));
    }

    sql = sql.toString();
    console.log('DB Query: ' + sql);

    connectionPool.query(sql, function (err, data) {
        if (!err) {
            console.log('DB Result: ' + JSON.stringify(data));
            res.json(200, data);
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

module.exports = alert;