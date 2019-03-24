'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Order = mongoose.model('Order');

 var shipping = require('./shipping.server.controller'); 
 var orders = require('./order.server.controller'); 


/**
 * Get Single Order
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
	
};

/*
  Pay on Delivery
*/

exports.payOnDelivery = function(req,res){

   if(req.user){

   	 shipping.getSelectedShippingAddress(req.user, function(resp){

	     var cartItems = req.body.items;
	     var order_id = Math.floor(Math.random() * 10000000); 

	     var totalAmount = 0.0;

	     for(var i = 0; i < cartItems.length; i++){
              var item = cartItems[i];
              var quantity = parseInt(item.quantity);
              var price = parseFloat(item.price);
              totalAmount += (quantity * price);
	     }

	   	 var order = {
	   	 	user_id: req.user._id,
	   	 	order_id:order_id,
	   	 	items: cartItems,
	   	 	amount: totalAmount,
	   	 	shippingAddress: resp.data,
	   	 	_paymentMethod: "POD"
	   	 }

         orders.saveOrder(order,function(resp){
			if(resp.success == 1){
              res.json({success:1, message:"Successfully made order!"});
			}else{
			  res.json({success:0, message:"Could Not Save Order !"});
			}
		});

      });

   } else {
		res.status(400).send({
			    success: 0,
				message: 'User is not signed in'
		});
   }
   	 	 
}

/**
 * Get Client Orders
 */
exports.getClientOrders = function(user,callback) {

	var id = mongoose.Types.ObjectId(user._id);

	Order.find({user_id: id}, function(err, orders){
	    if (err){
	    	console.log(err)
          callback({ message: err , success: 0});
	    }else{
	      callback({ data: orders , success: 1});
	    }
	});	

}; 


