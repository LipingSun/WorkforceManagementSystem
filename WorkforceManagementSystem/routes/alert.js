var mysql = require('mysql');
var squel = require('squel');

var express = require('express');

var alert = express();

var connectionPool = mysql.createPool({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6138a04494eed',
    password: 'c592d894',
    database: 'ad_fcc7aab1bbdc042',
    connectionLimit: 2//,
    //multipleStatements: true
});

//ALL /alerts
alert.all('/', function (req, res) {
    console.log('\nALL ' + req.originalUrl);

    var sql = squel.select().from('report_item').where('report_item.type="alert"').left_join('report', null, "report_item.report_id = report.report_id")
        .field('report_item_id').field('time').field('checkpoint_id').field('severity').field('guard_id').field('building_id').field('description');

    if ('building_id' in req.query) {
        sql = sql.where('building_id=' + mysql.escape(req.query.building_id));
    }
    if ('start_date' in req.query) {
        sql = sql.where('date>=' + mysql.escape(req.query.start_date));
    }
    if ('end_date' in req.query) {
        sql = sql.where('date<=' + mysql.escape(req.query.end_date));
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