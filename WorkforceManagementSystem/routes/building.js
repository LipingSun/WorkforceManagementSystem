var mysql = require('mysql');
var squel = require('squel');

var express = require('express');

var building = express();

var connectionPool = mysql.createPool({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b6138a04494eed',
    password: 'c592d894',
    database: 'ad_fcc7aab1bbdc042',
    connectionLimit: 3//,
    //multipleStatements: true
});

//GET /buildings/{building_id}
building.get('/:id(\\d+)', function (req, res) {
    if (req.params.id) {
        console.log('\nGET ' + req.originalUrl);

        var sql = squel.select().from('building').where('building_id=' + mysql.escape(req.params.id)).toString();
        console.log('DB Query: ' + sql);

        connectionPool.query(sql, function (err, data) {
            if (!err) {
                console.log('DB Result: ' + JSON.stringify(data));
                res.json(200, data[0]);
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

//GET //buildings
building.get('/', function (req, res) {
    console.log('\nGET ' + req.originalUrl);

    var sql = squel.select().from('building').toString();
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

//POST /buildings
building.post('/', function (req, res) {
    console.log('\nPOST ' + req.originalUrl);

    var sql = squel.insert().into('building')
        .set('client_id', req.body.client_id)
        .set('address', req.body.address)
        .set('release_date', req.body.release_date)
        .set('service_fee', req.body.service_fee)
        .set('coordinate', req.body.coordinate)
        .toString();
    console.log('DB Query: ' + sql);
    connectionPool.query(sql, function (err, data) {
        if (!err) {
            console.log('DB Result: ' + JSON.stringify(data));
            req.body.building_id = padDigits(data.insertId, 8);
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
});

//POST /buildings/{building_id}/update

//DELETE /buildings/{building_id}
building.del('/:id(\\d+)', function (req, res) {
    if (req.params.id) {
        console.log('\nDELETE ' + req.originalUrl);

        var sql = squel.delete().from('building').where('building_id=' + mysql.escape(req.params.id)).toString();
        console.log('DB Query: ' + sql);

        connectionPool.query(sql, function (err, data) {
            if (!err) {
                console.log('DB Result: ' + JSON.stringify(data));
                if (data.affectedRows === 1) {
                    res.json(200, {
                        'message': 'Delete Successful',
                        'success': true
                    });
                } else {
                    res.json(404, {
                        'message': 'No data found',
                        'success': false
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
    }
});


function padDigits (number, length) {
    return String('00000000'+number).slice(-length);
}


module.exports = building;