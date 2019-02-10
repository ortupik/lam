'use strict';

module.exports = function(app) {

	var shipping = require('../../app/controllers/shipping.server.controller'); 

	app.route('/shipping/save').post(shipping.saveShippingAddress); 
	app.route('/shipping/update').post(shipping.updateShippingAddress); 

	app.get('/save-shipping-address', function (req, res) {
		var user = req.user;
		console.log(user)
		shipping.getShippingAddress(user,function(resp){
			var data = resp.data;
			console.log(data)
           res.render('pages/save-shipping-address.pug',{addresses:data});
		});
	});
	
};