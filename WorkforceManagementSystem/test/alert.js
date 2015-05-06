require("should");
var request = require('supertest')
, express = require('express');

request = request('http://workforce-sjsucmpe.rhcloud.com');

describe('Alert Module', function(){
	  it('GET /alerts', function(done){
	    request
	      .get('/alerts')
	      .set('Accept', 'application/json')
	      .expect([
{
	"report_item_id": "00000022",
	"time": "2015-05-15T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "urgent",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000042",
	"time": "2015-05-16T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "low",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000072",
	"time": "2015-05-18T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "medium",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000112",
	"time": "2015-05-19T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "high",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	}])
	      .end(function(err, res){
	        if (err) return done(err);
	        done();
	      });
	  });
	  
	  
	  it('GET /alerts?building_id=00000001&start_date=2015-5-1&end_date=2015-5-25', function(done){
		    request
		      .get('/alerts?building_id=00000001&start_date=2015-5-1&end_date=2015-5-25')
		      .set('Accept', 'application/json')
		      .expect([
{
	"report_item_id": "00000022",
	"time": "2015-05-15T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "urgent",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000042",
	"time": "2015-05-16T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "low",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000072",
	"time": "2015-05-18T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "medium",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000112",
	"time": "2015-05-19T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "high",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	}])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	  
	  
	  it('GET /alerts?client_id=000-00-0001&start_date=2015-5-1&end_date=2015-5-25', function(done){
		    request
		      .get('/alerts?client_id=000-00-0001&start_date=2015-5-1&end_date=2015-5-25')
		      .set('Accept', 'application/json')
		      .expect([
{
	"report_item_id": "00000022",
	"time": "2015-05-15T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "urgent",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000042",
	"time": "2015-05-16T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "low",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000072",
	"time": "2015-05-18T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "medium",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	},
	{
	"report_item_id": "00000112",
	"time": "2015-05-19T23:41:30.000Z",
	"checkpoint_id": null,
	"severity": "high",
	"description": "Nothing special.",
	"guard_id": "000-00-0002",
	"guard_first_name": "Mark",
	"guard_last_name": "Cablayan",
	"building_id": "00000001",
	"name": "BBC",
	"client_id": "000-00-0001",
	"client_first_name": "Dan",
	"client_last_name": "James"
	}
	])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
});