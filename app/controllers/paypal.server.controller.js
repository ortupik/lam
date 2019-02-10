'use strict';

const paypal = require('paypal-rest-sdk');

var _ = require('lodash'),
 order_cont = require('./order.server.controller'); 

 var return_url = "https://happystores.herokuapp.com/execute",
    cancel_url = "https://happystores.herokuapp.com/cancel";

// paypal auth configuration
var config = {
  "port" : 5000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AaM5I2MMwQgTvp-hvV0icA4lc6o14SAR53mdSeNLWoS-1K1kBOtdOD-RPTFHLSWq79WQD0c8jzZ2yWl5",  // your paypal application client id
    "client_secret" : "EC0RP6hQxYl_VF3H7t2ozavaP4Mly9Bk08DyYnMQsq8QVHSthRhBRl6mNPhNSx_ng4jLgkZ0qICihK4l", // your paypal application secret id
  }
}

paypal.configure(config.api);
 
const self = {
	
	payNow:function(paymentData,callback){

		//console.log(paymentData)
		var response ={};

		/* Creating Payment JSON for Paypal starts */
		const payment = {
			"intent": "authorize",
			"payer": {
				"payment_method": "paypal"
			},
			"redirect_urls": {
				"return_url": return_url,
				"cancel_url": cancel_url
			},
			"transactions": [{
				"amount": {
					"total": 40.00,
					"currency": "USD"
				},
				"description": "Product name"
			}]
		};

		/* Creating Payment JSON for Paypal ends */

		/* Creating Paypal Payment for Paypal starts */
		paypal.payment.create(payment, function (error, payment) {
			if (error) {
				console.log(error);
			} else {
		    	if(payment.payer.payment_method === 'paypal') {
		    		response.paymentId = payment.id;
		    		var redirectUrl;
		    		response.payment = payment;
		    		for(var i=0; i < payment.links.length; i++) {
		    			var link = payment.links[i];
		    			if (link.method === 'REDIRECT') {
		    				redirectUrl = link.href;
		    			}
		    		}
		    		response.redirectUrl = redirectUrl;
		    	}
		    }
		    /* 
		    * Sending Back Paypal Payment response 
		    */
		    callback(error,response);
		});
		/* Creating Paypal Payment for Paypal ends */		
	},
	getResponse:function(data,PayerID,callback){

		var response = {};

		console.log(data)
		
		const serverAmount = parseFloat(data.paypalData.payment.transactions[0].amount.total);
		//const clientAmount = parseFloat(data.clientData.price);
		const clientAmount = 40.00;
		const paymentId = data.paypalData.paymentId;
		const details = {
			"payer_id": PayerID 
		};
         
		response.userData = req.user;
                
		if (serverAmount !== clientAmount) {
			response.error = true;
			response.message = "Payment amount doesn't matched.";
			callback(response);
		} else{
			
			paypal.payment.execute(paymentId, details, function (error, payment) {
				if (error) {
					console.log(error);
					response.error = true;
					response.message = "Payment NOT Successful.";
					callback(response);
				} else {

					const insertPayment={
						mode:'Paypal',
					    userId : data.user_id,
					    paymentId : paymentId,
					    createTime : payment.create_time,
					    state : payment.state,
					    currency : "USD",
					    amount: serverAmount,
					    createAt : new Date().toISOString()
					}

                    order_cont.saveOrder(insertPayment,function(resp){
						if(resp.success = 0){
							response.error = false;
							response.message = "Payment Successful, but not stored.";
							callback(response);
						}else{
							response.error = false;
							response.message = "Payment Successful.";
							callback(response);
						};
                    });

				};
			});
		};
    }
}

module.exports = self;