/**
 * New node file
 */
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
//our test code goes here:
describe('GET /users', function(){
	  it('respond with json', function(done){
	    request
	      .get('/buildings/00000001')
	      .set('Accept', 'application/json')
	      .expect({"building_id":"00000001",
	    	  		"client_id":"000-00-0001",
	    	  		"name":"BBC",
	    	  		"address":"1 washinton square",
	    	  		"release_date":"0000-00-00",
	    	  		"service_fee":10,
	    	  		"coordinate":"\u0000\u0000\u0000\u0000\u0001\u0001\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
	    	  			})
	      .end(function(err, res){
	        if (err) return done(err);
	        done();
	      });
	  });
});
describe('Guard Module', function(){
	  it('GET /guards', function(done){
	    request
	      .get('/guards')
	      .set('Accept', 'application/json')
	      .expect([
	               {
	                   "guard_id": "000-00-0002",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "0",
	                   "first_name": "Mark",
	                   "last_name": "Cablayan",
	                   "address": "123 1st St",
	                   "city": "San Jose",
	                   "state": "CA",
	                   "zip_code": "95112",
	                   "phone_number": "4084214780",
	                   "email": "guard"
	               },
	               {
	                   "guard_id": "044-08-3341",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "072-71-5352",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "099-15-5185",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": "Mark",
	                   "last_name": "Cablayan",
	                   "address": "123 1st St",
	                   "city": "San Jose",
	                   "state": "CA",
	                   "zip_code": "95112",
	                   "phone_number": "4084214780",
	                   "email": "best@sjsu.edu"
	               },
	               {
	                   "guard_id": "162-19-0133",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "206-71-5659",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "240-97-8871",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "246-81-7448",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "255-39-6109",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "262-95-4634",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "304-01-1451",
	                   "start_date": "2015-05-14T04:00:00.000Z",
	                   "end_date": "2015-05-18T04:00:00.000Z",
	                   "background_check_status": "checked",
	                   "first_name": "li",
	                   "last_name": "pi",
	                   "address": "333 Massion St",
	                   "city": "San Jose",
	                   "state": "CA",
	                   "zip_code": "95111",
	                   "phone_number": "40930293583",
	                   "email": "abc@abc.com"
	               },
	               {
	                   "guard_id": "305-52-5290",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "324-16-6005",
	                   "start_date": "2015-01-01T05:00:00.000Z",
	                   "end_date": "2015-02-01T05:00:00.000Z",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "337-56-3474",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "366-83-5490",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "417-52-5377",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "451-77-6050",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "0",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "459-25-1489",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "511-97-8342",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "597-51-0585",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "602-94-9450",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "609-31-1476",
	                   "start_date": "2015-01-01T05:00:00.000Z",
	                   "end_date": "2015-02-01T05:00:00.000Z",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "632-32-4964",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "643-84-7610",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "645-59-8022",
	                   "start_date": "2015-01-01T05:00:00.000Z",
	                   "end_date": "2015-02-01T05:00:00.000Z",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "669-60-0933",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "671-91-1509",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "762-14-5170",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "772-06-8811",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "773-68-3465",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "820-85-4769",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "831-65-4611",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "858-34-3365",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "870-50-7010",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "873-50-1362",
	                   "start_date": "2015-01-01T05:00:00.000Z",
	                   "end_date": "2015-02-01T05:00:00.000Z",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "889-64-4889",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": "Mark",
	                   "last_name": "Cablayan",
	                   "address": "123 1st St",
	                   "city": "San Jose",
	                   "state": "CA",
	                   "zip_code": "95112",
	                   "phone_number": "4084214780",
	                   "email": "best@sjsu.edu"
	               },
	               {
	                   "guard_id": "902-94-5283",
	                   "start_date": "2015-01-01T05:00:00.000Z",
	                   "end_date": "2015-02-01T05:00:00.000Z",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "945-97-1104",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "946-67-6441",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "952-14-5410",
	                   "start_date": "0000-00-00",
	                   "end_date": "0000-00-00",
	                   "background_check_status": "checked",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               },
	               {
	                   "guard_id": "998-36-7253",
	                   "start_date": "2015-01-01T05:00:00.000Z",
	                   "end_date": "2015-02-01T05:00:00.000Z",
	                   "background_check_status": "1",
	                   "first_name": null,
	                   "last_name": null,
	                   "address": null,
	                   "city": null,
	                   "state": null,
	                   "zip_code": null,
	                   "phone_number": null,
	                   "email": null
	               }
	           
	       ])
	      .end(function(err, res){
	        if (err) return done(err);
	        done();
	      });
	  });
	  
	  it('GET /guards/guard_id', function(done){
		    request
		      .get('/guards/000-00-0002')
		      .set('Accept', 'application/json')
		      .expect({
		    	    "guard_id": "000-00-0002",
		    	    "start_date": "0000-00-00",
		    	    "end_date": "0000-00-00",
		    	    "background_check_status": "0",
		    	    "user_id": "000-00-0002",
		    	    "first_name": "Mark",
		    	    "last_name": "Cablayan",
		    	    "address": "123 1st St",
		    	    "city": "San Jose",
		    	    "state": "CA",
		    	    "zip_code": "95112",
		    	    "phone_number": "4084214780",
		    	    "email": "guard"
		    	})
		    	.end(function(err, res){
			        if (err) return done(err);
			        done();
			      });
	  });
	  
	  it('GET /guards/guard_id/schedule', function(done){
		    request
		      .get('/guards/000-00-0002/schedule')
		      .set('Accept', 'application/json')
		      .expect({
		    	  
		    		    "guard_id": "000-00-0002",
		    		    "schedule": [
		    		        {
		    		            "schedule_id": "00000001",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "09:00:00",
		    		            "end_time": "18:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Monday"
		    		        },
		    		        {
		    		            "schedule_id": "00000002",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "17:00:00",
		    		            "end_time": "24:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Tuesday"
		    		        },
		    		        {
		    		            "schedule_id": "00000003",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "13:00:00",
		    		            "end_time": "16:00:00",
		    		            "building_id": "00000002",
		    		            "weekday": "Wednesday"
		    		        },
		    		        {
		    		            "schedule_id": "00000004",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "13:00:00",
		    		            "end_time": "16:00:00",
		    		            "building_id": "00000002",
		    		            "weekday": "Wednesday"
		    		        },
		    		        {
		    		            "schedule_id": "00000012",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "09:00:00",
		    		            "end_time": "18:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Monday"
		    		        },
		    		        {
		    		            "schedule_id": "00000022",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "09:00:00",
		    		            "end_time": "18:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Monday"
		    		        },
		    		        {
		    		            "schedule_id": "00000032",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "09:00:00",
		    		            "end_time": "18:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Monday"
		    		        },
		    		        {
		    		            "schedule_id": "00000042",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "09:00:00",
		    		            "end_time": "18:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Monday"
		    		        },
		    		        {
		    		            "schedule_id": "00000052",
		    		            "guard_id": "000-00-0002",
		    		            "start_time": "09:00:00",
		    		            "end_time": "18:00:00",
		    		            "building_id": "00000001",
		    		            "weekday": "Monday"
		    		        }
		    		    ]
		    	})
		    	.end(function(err, res){
			        if (err) return done(err);
			        done();
			    });
	  });
});	  
describe('Building Module', function(){
	it('GET /buildings', function(done){
		 request
		      .get('/buildings')
		      .set('Accept', 'application/json')
		      .expect([ {
		          "building_id": "00000001",
		          "client_id": "000-00-0001",
		          "name": "BBC",
		          "address": "1 washinton square",
		          "release_date": "0000-00-00",
		          "service_fee": 10,
		          "coordinate": "\u0000\u0000\u0000\u0000\u0001\u0001\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
		      },
		      {
		          "building_id": "00000002",
		          "client_id": "000-00-0001",
		          "name": "Clark Hall",
		          "address": "1 washinton square",
		          "release_date": "2015-05-20T04:00:00.000Z",
		          "service_fee": 10,
		          "coordinate": null
		      },
		      {
		          "building_id": "00000012",
		          "client_id": "000-00-0001",
		          "name": "Danken Hall",
		          "address": "CDE",
		          "release_date": "2015-05-20T04:00:00.000Z",
		          "service_fee": null,
		          "coordinate": null
		      },
		      {
		          "building_id": "00000022",
		          "client_id": "000-00-0001",
		          "name": "Clark Hall",
		          "address": "CDE",
		          "release_date": "2015-05-20T04:00:00.000Z",
		          "service_fee": null,
		          "coordinate": null
		      },
		      {
		          "building_id": "00000042",
		          "client_id": "000-00-0001",
		          "name": "Danken Hall",
		          "address": "CDE",
		          "release_date": "2015-05-20T04:00:00.000Z",
		          "service_fee": 10,
		          "coordinate": null
		      },
		      {
		          "building_id": "00000062",
		          "client_id": "000-00-0001",
		          "name": "Clark Hall",
		          "address": "CDE",
		          "release_date": "2015-05-20T04:00:00.000Z",
		          "service_fee": 10,
		          "coordinate": null
		      }   
		  ])
		  .end(function(err, res){
		        if (err) return done(err);
		        done();
		  });
	});  
	it('GET /buildings/building_id', function(done){
	    request
	      .get('/buildings/00000001')
	      .set('Accept', 'application/json')
	      .expect({
	    	  "building_id": "00000001",
	    	    "client_id": "000-00-0001",
	    	    "name": "BBC",
	    	    "address": "1 washinton square",
	    	    "release_date": "0000-00-00",
	    	    "service_fee": 10,
	    	    "coordinate": "\u0000\u0000\u0000\u0000\u0001\u0001\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"
	    	})
	    	.end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
  });
		               
});
