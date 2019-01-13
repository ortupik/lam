'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Order = mongoose.model('Order');
/**
 * Get Single Product
 */
exports.getOrder = function(reference,callback) {

	var reference = {
		reference: reference
	}

	Order.findOne(reference,{_id:0,__v:0}, function(err, order){
	    if (err) {
          callback({success:0,message:err});
	    }else{
	    	 callback({success:1,data:order});
	    }  
	});

};

/**
 * Save Order
 */
exports.saveOrder = function(order, callback) {
	//if(req.user){
       // Init Variables


		var order = new Order(order);

		var message = null;


		// Then save the user 
		order.save(function(err) {
			if (err) {
				callback({success:0, message:err});
			} else {
				callback({success:1,data: order});
			}
		});
	/*} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}*/

};
