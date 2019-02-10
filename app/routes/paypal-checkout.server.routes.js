'use strict';

var paypal_cont = require('../../app/controllers/paypal.server.controller'); 

module.exports = function(app) {

	app.post('/paypal-checkout',function(req, res){
        
        //subtitute with req.user or session
		var sessionInfo = {
			user_id:"5c34f47ca11b441970d08b81"
		}

		if(!sessionInfo){
			res.status(400).send({
				message: 'User is not signed in'
			});
		}else{
			
			const data ={
				userID : sessionInfo.user_id,
				data : req.body
			}
			/*
			* call to paynow helper method to call paypal sdk
			*/
			paypal_cont.payNow(data,function(error,result){
				if(error){
					console.log(error)
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end(JSON.stringify(error));
				}else{
					sessionInfo.paypalData = result;
					sessionInfo.clientData = req.body;
					req.session.paypalInfo = sessionInfo;
					res.redirect(result.redirectUrl);
				}				
			});			
		}
	});

	/*
	* payment success url 
	*/
	
	app.get('/execute',function(req, res){	
		
		var response = {};
		const PayerID = req.query.PayerID;

		 //subtitute with req.user or session
		var sessionInfo = req.session.paypalInfo;

        if(!req.user){
			res.status(400).send({
				message: 'User is not signed in'
			});
		}else {
			sessionInfo.state ="success";
			paypal_cont.getResponse(sessionInfo,PayerID,function(response) {
				console.log(response)
				res.render('pages/message.pug',{
					response : response
				});
			});
		};
	});

	/*
	* payment cancel url 
	*/
	
	app.get('/cancel',function(req, res){

		 //subtitute with req.user or session
		var sessionInfo = req.session;

        if(!sessionInfo){
			res.status(400).send({
				message: 'User is not signed in'
			});
		}else {
			var response ={};
			response.error = true;
			response.message = "Payment unsuccessful.";
			response.userData = {
				name : sessionInfo.user_id
			};
							
			res.render('pages/message.pug',{
				response : response
			});
		}
	});
	
};