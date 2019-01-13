'use strict';

module.exports = function(app) {

	var shipping = require('../../app/controllers/shipping.server.controller'); 

	app.route('/shipping/save').post(shipping.saveShippingAddress);
	
};