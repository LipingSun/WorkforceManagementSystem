require("should");
var request = require('supertest')
, express = require('express');

request = request('http://workforce-sjsucmpe.rhcloud.com');

//our test code goes here:
describe('Report Module', function(){
	  it('GET /reports/00000001', function(done){
	    request
	      .get('/reports/00000001')
	      .set('Accept', 'application/json')
	      .expect({
	    	  "report_id": "00000001",
	    	  "building_id": "00000001",
	    	  "guard_id": "000-00-0002",
	    	  "date": "2015-05-01T04:00:00.000Z",
	    	  "patrols": [
	    	  {
	    	  "report_item_id": "00000001",
	    	  "report_id": "00000001",
	    	  "time": "0000-00-00 00:00:00",
	    	  "type": "patrol",
	    	  "checkpoint_id": "00000001",
	    	  "severity": null,
	    	  "description": null
	    	  }
	    	  ],
	    	  "incident_reports": [
	    	  {
	    	  "report_item_id": "00000002",
	    	  "report_id": "00000001",
	    	  "time": "0000-00-00 00:00:00",
	    	  "type": "incident_report",
	    	  "checkpoint_id": null,
	    	  "severity": null,
	    	  "description": null
	    	  }
	    	  ],
	    	  "parking_violations": [
	    	  {
	    	  "report_item_id": "00000003",
	    	  "report_id": "00000001",
	    	  "time": "0000-00-00 00:00:00",
	    	  "type": "parking_violation",
	    	  "checkpoint_id": null,
	    	  "severity": null,
	    	  "description": null
	    	  }
	    	  ],
	    	  "maintenance_calls": [
	    	  {
	    	  "report_item_id": "00000004",
	    	  "report_id": "00000001",
	    	  "time": "0000-00-00 00:00:00",
	    	  "type": "maintenance_call",
	    	  "checkpoint_id": null,
	    	  "severity": null,
	    	  "description": null
	    	  }
	    	  ],
	    	  "calls_for_service": [
	    	  {
	    	  "report_item_id": "00000006",
	    	  "report_id": "00000001",
	    	  "time": "0000-00-00 00:00:00",
	    	  "type": "call_for_service",
	    	  "checkpoint_id": null,
	    	  "severity": null,
	    	  "description": null
	    	  }
	    	  ]
	    	  })
	      .end(function(err, res){
	        if (err) return done(err);
	        done();
	      });
	  });
	  
	  it('GET /reports/list?building_id=00000001', function(done){
		    request
		      .get('/reports/list?building_id=00000001')
		      .set('Accept', 'application/json')
		      .expect([
{
	"report_id": "00000001",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-01T04:00:00.000Z"
	},
	{
	"report_id": "00000012",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-15T04:00:00.000Z"
	},
	{
	"report_id": "00000022",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-16T04:00:00.000Z"
	},
	{
	"report_id": "00000032",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-17T04:00:00.000Z"
	},
	{
	"report_id": "00000042",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-18T04:00:00.000Z"
	},
	{
	"report_id": "00000052",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-19T04:00:00.000Z"
	},
	{
	"report_id": "00000072",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "0000-00-00"
	}
	])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	  
	  it('GET /reports/list?client_id=000-00-0001', function(done){
		    request
		      .get('/reports/list?client_id=000-00-0001')
		      .set('Accept', 'application/json')
		      .expect([
{
	"report_id": "00000001",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-01T04:00:00.000Z"
	},
	{
	"report_id": "00000002",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000002",
	"name": "Clark Hall",
	"date": "2015-05-01T04:00:00.000Z"
	},
	{
	"report_id": "00000003",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000002",
	"name": "Clark Hall",
	"date": "2015-05-11T04:00:00.000Z"
	},
	{
	"report_id": "00000012",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-15T04:00:00.000Z"
	},
	{
	"report_id": "00000022",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-16T04:00:00.000Z"
	},
	{
	"report_id": "00000032",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-17T04:00:00.000Z"
	},
	{
	"report_id": "00000042",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-18T04:00:00.000Z"
	},
	{
	"report_id": "00000052",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-19T04:00:00.000Z"
	},
	{
	"report_id": "00000062",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000002",
	"name": "Clark Hall",
	"date": "0000-00-00"
	},
	{
	"report_id": "00000072",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "0000-00-00"
	}
	])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	  
	  it('GET /reports/list?building_id=00000002&start_date=2015-5-1&end_date=2015-5-5', function(done){
		    request
		      .get('/reports/list?building_id=00000002&start_date=2015-5-1&end_date=2015-5-5')
		      .set('Accept', 'application/json')
		      .expect([
{
	"report_id": "00000002",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000002",
	"name": "Clark Hall",
	"date": "2015-05-01T04:00:00.000Z"
	}
	])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	  
	  it('GET /reports/list?client_id=000-00-0001&start_date=2015-5-1&end_date=2015-5-5', function(done){
		    request
		      .get('/reports/list?client_id=000-00-0001&start_date=2015-5-1&end_date=2015-5-5')
		      .set('Accept', 'application/json')
		      .expect([
{
	"report_id": "00000001",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"date": "2015-05-01T04:00:00.000Z"
	},
	{
	"report_id": "00000002",
	"guard_id": "000-00-0002",
	"first_name": "Mark",
	"last_name": "Cablayan",
	"building_id": "00000002",
	"name": "Clark Hall",
	"date": "2015-05-01T04:00:00.000Z"
	}
	])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	});