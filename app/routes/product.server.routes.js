'use strict';

module.exports = function(app) {

	var products = require('../../app/controllers/products.server.controller'); 

	app.route('/product/create').post(products.createProduct);

	app.route('/products/all').get(products.getProducts);

	app.route('/product').get(products.getProduct);


	app.get('/category', function (req, res) {

	      var category = req.param("category");

	      var page = {
	        title: category,
	        breadcrumbs: {
	          'Catalog': '/catalog'
	        },
	        quantity: 120
	      }

	      res.render('pages/category.pug',{page:page});

	});

	 app.get('/subcategory', function (req, res) {

	      var category = req.param("category");
	      var subcategory = req.param("subcategory");

	      var page = {
	        title: subcategory,
	        breadcrumbs: {
	          'Catalog': '/catalog'
	        },
	        quantity: 120
	      }

	       page.breadcrumbs[category] = "category";

	       res.render('pages/subcategory.pug',{page:page});

	  });
	
};