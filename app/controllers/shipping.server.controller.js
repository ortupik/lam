'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Shipping = mongoose.model('Shipping');


/**
 * Save Shipping Address
 */
exports.saveShippingAddress = function(req, res) {
	//if(req.user){
       // Init Variables
		var shipping = new Shipping(req.body);

		var message = null;

		// Then save the shipping address 
		shipping.save(function(err) {
			if (err) {
				return res.status(400).send({
					success:0,
					message:err
				});
			} else {
				res.json({success:1,data:shipping});
			}
		});
	/*} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}*/

};


/**
 * Get USER Shipping address
 */
exports.getShippingAddress = function(user,callback) {
	Shipping.find({}, function(err, shipping){
	    if (err){
          callback({ message: err , success: 0});
	    }else{
	    	console.log(shipping)
	     callback({ data: shipping , success: 1});
	    }
	});

}; 

/*
  Update Shipping Address
*/
exports.updateShippingAddress = function(req,res){

   var shipping = new Shipping(req.body);

	Shipping.findOneAndUpdate({_id:shipping._id},shipping, {upsert:true}, function(err, shipping){
	  if (err) {
	  	console.log(err)
		return res.status(400).send({
			success:0,
			message:err
		});
	  } else {
		res.json({success:1,data:shipping});
	  }
	});

};




