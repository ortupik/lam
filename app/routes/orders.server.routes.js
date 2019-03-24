'use strict';

module.exports = function(app) {

    var orderCont = require('../../app/controllers/order.server.controller'); 

	app.route('/order/payOnDelivery').post(orderCont.payOnDelivery);

    app.get('/orders', function (req, res) {
      var user = req.user;
		if(user){
          orderCont.getClientOrders(user,function(resp){
			  var data = resp.data;
			  if(data.success == 0){
				orders = [];
			  }
			  res.render('pages/orders.pug',{orders:data});
		   });
		}else {
			res.render('pages/login.pug');
			/*res.status(400).send({
				message: 'User is not signed in'
			});*/
		}	
	 
	});
	
};