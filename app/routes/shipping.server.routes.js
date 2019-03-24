'use strict';

module.exports = function(app) {

    var shipping = require('../../app/controllers/shipping.server.controller'); 

	app.route('/shipping/save').post(shipping.saveShippingAddress); 
	app.route('/shipping/update').post(shipping.updateShippingAddress); 
	app.route('/shipping/selectShippingAddress').post(shipping.selectShippingAddress); 

	app.get('/save-shipping-address', function (req, res) {
		var user = req.user;
		if(user){
          shipping.getShippingAddresses(user,function(resp){
			  var data = resp.data;
			  if(data.success == 0){
				addresses = [];
			  }
              res.render('pages/save-shipping-address.pug',{addresses:data});
		   });
		}else {
			res.render('pages/login.pug');
			/*res.status(400).send({
				message: 'User is not signed in'
			});*/
		}
		
		
	});

	app.get('/checkout', function (req, res) {

		var user = req.user;
		if(user){
		   shipping.getSelectedShippingAddress(user,function(resp){
              if(resp.success == 1){
                res.render('pages/checkout.pug',{address:resp.data});
              }else{
              	res.render("pages/save-shipping-address.pug");
              }
		   });	
	    }else {
		   res.render('pages/login.pug');
		}
	});

    
	
};

