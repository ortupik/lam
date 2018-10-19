'use strict';

module.exports = function(app) {

	var products = require('../../app/controllers/products.server.controller'); 
	var catalog = require('../../app/controllers/catalog.server.controller'); 

	app.route('/product/create').post(products.createProduct);

	app.route('/products/all').get(products.getProducts);

	app.route('/product').get(products.getProduct);

	app.route("/product").post(products.getOneProduct);

	app.route('/catalog').get(catalog.getCatalog);

	app.route('/category').get(catalog.getCategoryCatalog);

	app.route('/subcategory').get(catalog.getSubCategoryCatalog);

	app.route('/filter/getBrands').post(products.getBrands);
	
};