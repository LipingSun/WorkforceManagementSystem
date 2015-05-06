require("should");
var request = require('supertest')
, express = require('express');

request = request('http://workforce-sjsucmpe.rhcloud.com');
//simple example here:
var name = "zhaojian";
describe("Login Test", function() {
    it("Login Success!", function() {
        name.should.eql("zhaojian");
    });
});

//the real code goes here:
describe('Client Module', function(){
	  it('GET /clients', function(done){
	    request
	      .get('/clients')
	      .set('Accept', 'application/json')
	      .expect([
{
	"client_id": "000-00-0001",
	"first_name": "Dan",
	"last_name": "James",
	"address": "33333 11st St",
	"city": "San Jose",
	"state": "CA",
	"zip_code": "95112",
	"phone_number": "4084214780",
	"email": "client",
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 10,
	"balance": 50
	},
	{
	"client_id": "047-62-8741",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 10,
	"balance": 10
	},
	{
	"client_id": "118-24-5063",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 0,
	"balance": 10
	},
	{
	"client_id": "257-83-7965",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 0,
	"balance": 11
	},
	{
	"client_id": "410-40-7959",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 0,
	"balance": 11
	},
	{
	"client_id": "536-86-2545",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 0,
	"balance": 11
	},
	{
	"client_id": "564-50-6255",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "0000-00-00",
	"end_date": "0000-00-00",
	"monthly_service_charge": 0,
	"balance": 10
	},
	{
	"client_id": "805-63-3917",
	"first_name": null,
	"last_name": null,
	"address": null,
	"city": null,
	"state": null,
	"zip_code": null,
	"phone_number": null,
	"email": null,
	"start_date": "2015-01-01T05:00:00.000Z",
	"end_date": "2015-02-01T05:00:00.000Z",
	"monthly_service_charge": 10,
	"balance": 20
	}
	])
	      .end(function(err, res){
	        if (err) return done(err);
	        done();
	      });
	  });
	  
	  it('GET /clients/805-63-3917', function(done){
		    request
		      .get('/clients/805-63-3917')
		      .set('Accept', 'application/json')
		      .expect({
		    	  "client_id": "805-63-3917",
		    	  "first_name": null,
		    	  "last_name": null,
		    	  "address": null,
		    	  "city": null,
		    	  "state": null,
		    	  "zip_code": null,
		    	  "phone_number": null,
		    	  "email": null,
		    	  "start_date": "2015-01-01T05:00:00.000Z",
		    	  "end_date": "2015-02-01T05:00:00.000Z",
		    	  "monthly_service_charge": 10,
		    	  "balance": 20
		    	  })
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	  
	  it('GET /clients/805-63-3917/bill', function(done){
		    request
		      .get('/clients/805-63-3917/bill')
		      .set('Accept', 'application/json')
		      .expect([
		               {
		"client_id": "805-63-3917",
		"bill_id": "00000002",
		"start_date": "2015-04-04T04:00:00.000Z",
		"end_date": "2015-05-05T04:00:00.000Z",
		"amount": "30",
		"paid": 1
		},
		{
		"client_id": "805-63-3917",
		"bill_id": "00000022",
		"start_date": "2015-04-04T04:00:00.000Z",
		"end_date": "2015-05-05T04:00:00.000Z",
		"amount": "30",
		"paid": 1
		}
		])
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	  
	  
	});

