'use strict';

module.exports = function(app) {

	var shipping = require('../../app/controllers/shipping.server.controller'); 

	app.route('/shipping/save').post(shipping.saveShippingAddress); 
	app.route('/shipping/update').post(shipping.updateShippingAddress); 

	app.get('/save-shipping-address', function (req, res) {
		var user = req.user;
		if(user){
          shipping.getShippingAddress(user,function(resp){
				var data = resp.data;
				if(data.success == 0){
					addresses = [];
				}
	           res.render('pages/save-shipping-address.pug',{addresses:data});
		   });
		}else {
			res.status(400).send({
				message: 'User is not signed in'
			});
		}
		
		
	});
	
};