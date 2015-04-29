/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , usermysql = require('./routes/user-mysql')
    , client = require('./routes/client')
    , clientmysql = require('./routes/client-mysql')
    , guard = require('./routes/guard')
    , guardmysql = require('./routes/guard-mysql')
    , bill = require('./routes/bill')
    , billmysql = require('./routes/bill-mysql')
    , http = require('http')
    , path = require('path')
    , mysql = require('mysql')
    , clientqueue = require('./queue/client-queue')
    , guardqueue = require('./queue/guard-queue');

var session = require('express-session');
var report = require('./routes/reports');
var building = require('./routes/building');
var login = require('./routes/login');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'CMPE273',
    resave: false,
    saveUninitialized: true//,
    //cookie: { maxAge: 15 * 60 * 1000 }
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//GETS
app.get('/', routes.index);
app.get('/user', user.getUserById);
app.get('/users', user.getAllUsers);
app.get('/client', client.getClientByClientId);
app.get('/clients', client.getAllClients);
app.get('/client/bills', bill.getBillsForClient);
app.get('/guard', guard.getGuardByGuardId);
app.get('/guards', guard.getAllGuards);

//POSTS
app.post('/user', user.createUser);
app.post('/client', client.createClient);
app.post('/client/bill', bill.createBillForClient);
app.post('/guard', guard.createGuard);
app.post('/guard/update', guard.updateGuardInfo);

//DELETES
app.delete('/client', client.deleteClient);
app.delete('/guard', guard.deleteGuard);

//app.get('/users', user.list);


//===============================
// Queue Based services
//===============================

//GETS
app.get('/client-queue/clients', clientqueue.getAllClients);
app.get('/client-queue/client', clientqueue.getClientByClientId);
app.get('/guard-queue/guards', guardqueue.getAllGuards);
//app.get('/guard-queue/guard',guardqueue.getGuardByGuardId);

//POSTS
app.post('/client-queue/client', clientqueue.createClient);
//app.post('/guard-queue/guard',guardqueue.createGuard);

//===============================
//===============================


app.use('/reports', report);
app.use('/buildings', building);
app.use('/login', login);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
