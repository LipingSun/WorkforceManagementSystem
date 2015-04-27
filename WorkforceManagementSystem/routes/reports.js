var mysql = require('mysql');
var squel = require('squel');

var express = require('express');

var report = express();

var connectionPool = mysql.createPool({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6138a04494eed',
    password: 'c592d894',
    database: 'ad_fcc7aab1bbdc042',
    connectionLimit: 3//,
    //multipleStatements: true
});

//GET /reports/{report_id}
report.get('/:id(\\d+)', function (req, res) {
    if (req.params.id) {
        console.log('\nGET ' + req.originalUrl);

        var report = {
            'report_id': '',
            'building_id': '',
            'guard_id': '',
            'date': '',
            'patrols': null,
            'incident_reports': null,
            'parking_violations': null,
            'maintenance_calls': null,
            'calls_for_service': null
        };

        var sql = squel.select().from('report').where('report_id=' + mysql.escape(req.params.id)).toString();
        console.log('DB Query: ' + sql);

        connectionPool.query(sql, function (err, data) {
            if (!err) {
                console.log('DB Result: ' + JSON.stringify(data));

                report.report_id = data[0].report_id;
                report.building_id = data[0].building_id;
                report.guard_id = data[0].guard_id;
                report.date = data[0].date;

                var sql = squel.select().from('report_item').where('report_id=' + mysql.escape(req.params.id)).toString();
                console.log('DB Query: ' + sql);

                connectionPool.query(sql, function (err, data) {
                    if (!err) {
                        console.log('DB Result: ' + JSON.stringify(data));

                        //@formatter:off
                    report.patrols = data.filter(function (item) {return item.type === 'patrol';});
                    report.incident_reports = data.filter(function (item) {return item.type === 'incident_report';});
                    report.parking_violations = data.filter(function (item) {return item.type === 'parking_violation';});
                    report.maintenance_calls = data.filter(function (item) {return item.type === 'maintenance_call';});
                    report.calls_for_service = data.filter(function (item) {return item.type === 'call_for_service';});
                    //@formatter:on

                        res.json(200, report);
                    } else {
                        console.log('DB ERROR: ' + err.message);
                        res.json(500, {
                            'message': 'Error occurred',
                            'success': false,
                            'status': 500
                        });
                    }
                });
            } else {
                console.log('DB ERROR: ' + err.message);
                res.json(500, {
                    'message': 'Error occurred',
                    'success': false,
                    'status': 500
                });
            }
        });
    }
});

//GET /reports/list
report.get('/list', function (req, res) {
    console.log('\nGET ' + req.originalUrl);

    var sql = null;

    if (req.query.client_id) {
        sql = squel.select().from('building').where('client_id=' + mysql.escape(req.query.client_id)).toString();
    }
    if (req.query.building_id) {
        sql = squel.select().from('building').where('building_id=' + mysql.escape(req.query.building_id)).toString();
    }

    console.log('DB Query: ' + sql);

    connectionPool.query(sql, function (err, data) {
        if (!err) {
            console.log('DB Result: ' + JSON.stringify(data));

            var buildings = '(';
            data.forEach(function (building) {
                if (buildings !== '(') {
                    buildings += ',';
                }
                buildings += building.building_id;
            });
            buildings += ')';

            var sql = squel.select().from('report').where('building_id IN ' + buildings);
            if (req.query.start_date) {
                sql = sql.where('date>=' + mysql.escape(req.query.start_date));
            }
            if (req.query.end_date) {
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

//POST /reports/items
report.post('/items', function (req, res) {
    console.log('\nPOST ' + req.originalUrl);

    var sql = squel.select().field('report_id').from('report')
        .where('building_id=' + mysql.escape(req.body.building_id))
        .where('guard_id=' + mysql.escape(req.body.guard_id))
        .where('date=' + mysql.escape(req.body.date)).toString()
        .toString();
    console.log('DB Query: ' + sql);
    connectionPool.query(sql, function (err, data) {
        if (!err) {
            console.log('DB Result: ' + JSON.stringify(data));

            if (data.length === 0) {
                sql = squel.insert().into('report')
                    .set('building_id', req.body.building_id)
                    .set('guard_id', req.body.guard_id)
                    .set('date', req.body.date)
                    .toString();
                console.log('DB Query: ' + sql);
                connectionPool.query(sql, function (err, data) {
                    if (!err) {
                        console.log('DB Result: ' + JSON.stringify(data));

                        req.body.report_id = data.insertId;

                        var sql = squel.insert().into('report_item')
                            .set('report_id', data.insertId)
                            .set('time', req.body.date + ' ' + req.body.time)
                            .set('type', req.body.type)
                            .set('checkpoint_id', req.body.checkpoint_id)
                            .set('description', req.body.description)
                            .set('severity', req.body.severity)
                            .toString();
                        console.log('DB Query: ' + sql);
                        connectionPool.query(sql, function (err, data) {
                            if (!err) {
                                console.log('DB Result: ' + JSON.stringify(data));
                                res.json(200, req.body);
                            } else {
                                console.log('DB ERROR: ' + err.message);
                                res.json(500, {
                                    'message': 'Error occurred',
                                    'success': false,
                                    'status': 500
                                });
                            }
                        });
                    } else {
                        console.log('DB ERROR: ' + err.message);
                        res.json(500, {
                            'message': 'Error occurred',
                            'success': false,
                            'status': 500
                        });
                    }
                });
            } else {
                req.body.report_id = data[0].report_id;

                sql = squel.insert().into('report_item')
                    .set('report_id', data[0].report_id)
                    .set('time', req.body.date + ' ' + req.body.time)
                    .set('type', req.body.type)
                    .set('checkpoint_id', req.body.checkpoint_id)
                    .set('description', req.body.description)
                    .set('severity', req.body.severity)
                    .toString();
                console.log('DB Query: ' + sql);
                connectionPool.query(sql, function (err, data) {
                    if (!err) {
                        console.log('DB Result: ' + JSON.stringify(data));
                        res.json(200, req.body);
                    } else {
                        console.log('DB ERROR: ' + err.message);
                        res.json(500, {
                            'message': 'Error occurred',
                            'success': false,
                            'status': 500
                        });
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




//POST /reports/items
//report.post('/items', function (req, res) {
//    console.log('\nPOST ' + req.originalUrl);
//
//    var reportItem = {
//        report_id: squel.select().field('report_id').from('report')
//            .where('building_id=' + mysql.escape(req.body.building_id))
//            .where('guard_id=' + mysql.escape(req.body.guard_id))
//            .where('date=' + mysql.escape(req.body.date)),
//        type: req.body.type,
//        time: req.body.date + ' ' + req.body.time,
//        checkpoint_id: req.body.checkpoint_id,
//        description: req.body.description,
//        severity: req.body.severity
//    };
//    //reportItem.report_id = squel.select().field('report_id').from('report').where('building_id=' + req.body.building_id);
//    console.log('DB Query: ' + reportItem.report_id.toString());
//    var sql = squel.insert().into('report_item').setFields(reportItem).toString();
//    console.log('DB Query: ' + sql);
//    connectionPool.query(sql, function (err, data) {
//        if (!err) {
//            console.log('DB Result: ' + JSON.stringify(data));
//            res.json(200, data);
//        } else {
//            console.log('DB ERROR: ' + err.message);
//            res.json(500, {
//                'message': 'Error occurred',
//                'success': false,
//                'status': 500
//            });
//        }
//    });
//});

module.exports = report;