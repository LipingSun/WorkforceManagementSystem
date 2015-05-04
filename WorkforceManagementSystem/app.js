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

var cors = require('cors');
var session = require('express-session');
var report = require('./routes/reports');
var building = require('./routes/building');
var auth = require('./routes/auth');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
// app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
// app.set('ip', process.env.OPENSHIFT_NODEJS_IP);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(cors());
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

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//GETS
//app.get('/user', user.getUserById);
//app.get('/users', user.getAllUsers);
app.get('/clients/:client_id', client.getClientByClientId);
app.get('/clients', client.getAllClients);
app.get('/clients/:client_id/bill', bill.getBillsForClient);
app.get('/guards/:guard_id', guard.getGuardByGuardId);
app.get('/guards', guard.getAllGuards);
app.get('/guards/:guard_id/schedule', guard.getGuardSchedule);

//POSTS
//app.post('/user', user.createUser);
app.post('/clients', client.createClient);
app.post('/clients/:client_id/bill', bill.createBillForClient);
app.post('/guards', guard.createGuard);
app.post('/guards/:guard_id/update', guard.updateGuardInfo);
app.post('/guards/:guard_id/schedule', guard.createGuardSchedule);

//DELETES
app.delete('/clients/:client_id', client.deleteClient);
app.delete('/guards/:guard_id', guard.deleteGuard);

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

app.use('/', routes.index);
app.use('/login', auth.login);
app.use('/logout', auth.logout)
app.use('/register', auth.register);
app.use('/reports', report);
app.use('/buildings', building);


http.createServer(app).listen(app.get('port'), app.get('ip'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});