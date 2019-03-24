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
	if(req.user){
       // Init Variables
		var shipping = new Shipping(req.body);
		shipping.user_id = req.user._id;

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
	} else {
		res.render('pages/login.pug');
			/*res.status(400).send({
				message: 'User is not signed in'
			});*/
	}

};


/**
 * Get Selected Shipping address
 */
exports.getSelectedShippingAddress = function(user,callback) {

	Shipping.findOne({user_id : user._id, selected:'true'}, function(err, shipping){
	    if (err){
          callback({ message: err , success: 0});
	    }else{
	      console.log(shipping)
	      callback({ data: shipping , success: 1});
	    }
	});	

}; 

/**
 * Get Shipping addresses
 */
exports.getShippingAddresses = function(user,callback) {

	Shipping.find({user_id : user._id}, function(err, shippings){
	    if (err){
          callback({ message: err , success: 0});
	    }else{
	      callback({ data: shippings , success: 1});
	    }
	});	

}; 

/*
  Update Shipping Address
*/
exports.updateShippingAddress = function(req,res){ 

 if(req.user){

   var shipping = new Shipping(req.body);

	Shipping.findOneAndUpdate({_id:shipping._id, user_id:req.user._id},shipping, {upsert:true}, function(err, shipping){
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
} else {
	res.render('pages/login.pug');
		/*res.status(400).send({
			message: 'User is not signed in'
		});*/
}

};

/*
  Select Shipping Address
*/
exports.selectShippingAddress = function(req,res){ 

 if(req.user){

   var shipping = new Shipping(req.body);

    Shipping.updateMany({user_id:req.user._id},{selected:"false"},{upsert:true}, function(err,shippings){
    	 if (err) {
		  	console.log(err)
			return res.status(400).send({
				success:0,
				message:err
			});
		  }else{

		  	shipping.selected = "true";

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
		   //res.json({success:1,data:shipping});
	     }
	});

	
} else {
		res.render('pages/login.pug');
			/*res.status(400).send({
				message: 'User is not signed in'
			});*/
	}

};




