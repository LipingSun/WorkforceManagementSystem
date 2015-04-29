var ejs = require('ejs');
var mysql = require('./bill-mysql');

function createBillForClient(req,res) {
	if(req.body.hasOwnProperty("client_id") && req.body.hasOwnProperty("bill_amount") && 
			req.body.hasOwnProperty("from_date") && req.body.hasOwnProperty("to_date")) {
		
		var bill = {
				client_id: req.body.client_id,
				bill_amount: req.body.bill_amount,
				from_date: req.body.from_date,
				to_date: req.body.to_date
		};
		mysql.createBillForClient(bill, function(err,result) {
			if(err) {
				throw err;
			} else {
				res.send({status:200, message: "Bill Created for: " + bill.client_id});
			}
		});
	} else {
		res.send({status:401,message:"Error Occured."});
	}
}

function getBillsForClient(req,res) {
	if(req.query.hasOwnProperty("client_id")) {
		mysql.getBillsForClient(req.query.client_id, function(err,result) {
			if(err) {
				throw err;
			} else {
				var bills = [];
				for(var i = 0; i < result.length; i++) {
					var bill = {
						client_id: result[i].client_id,
						bill_id: result[i].bill_id,
						from_date: result[i].from_date,
						to_date: result[i].to_date,
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