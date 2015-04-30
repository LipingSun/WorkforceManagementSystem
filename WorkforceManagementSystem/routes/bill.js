var ejs = require('ejs');
var mysql = require('./bill-mysql');

function createBillForClient(req,res) {
	if("client_id" in req.params && req.body.hasOwnProperty("paid") && req.body.hasOwnProperty("paid") &&
			req.body.hasOwnProperty("start_date") && req.body.hasOwnProperty("end_date")) {
		
		var bill = {
			client_id: req.params.client_id,
			paid: req.body.paid,
			amount: req.body.amount,
			start_date: req.body.start_date,
			end_date: req.body.end_date
		};
		mysql.createBillForClient(bill, function(err,result) {
			if(err) {
				throw err;
			} else {
				res.send({status:200, message: "Bill Created for: " + req.params.client_id});
			}
		});
	} else {
		res.send({status:401,message:"Error Occured."});
	}
}

function getBillsForClient(req,res) {
	if("client_id" in req.params) {
		mysql.getBillsForClient(req.params.client_id, function(err,result) {
			if(err) {
				throw err;
			} else {
				var bills = [];
				for(var i = 0; i < result.length; i++) {
					var bill = {
						client_id: result[i].client_id,
						bill_id: result[i].bill_id,
						start_date: result[i].start_date,
						end_date: result[i].end_date,
						amount: result[i].amount,
						paid: result[i].paid
					};
					bills.push(bill);
				}
				res.send(bills);
			}
		});
	} else {
		res.send({status:401, message:"Error Occured: No client_id provided"});
	}
}

exports.createBillForClient=createBillForClient;
exports.getBillsForClient=getBillsForClient;