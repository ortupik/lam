'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Product = mongoose.model('Product');

/**
 * Get Products
 */
exports.getProducts = function(req, res) {
	Product.find({}, function(err, products){
	    if (err) return res.send(500, { message: err , success: 0});
	    res.json({success:0, data:products}); 
	});
};

/**
 * Get Single Product
 */
exports.getProduct = function(req, res) {
	var product_id = {
		id: req.param("id")
	}
	Product.findOne(product_id, function(err, product){
	    if (err) return res.send(500, { message: err , success: 0});
	    res.render('pages/product.pug',{product: product});
	});

};

/**
 * Create Product
 */
exports.createProduct = function(req, res) {
	if(req.user){
       // Init Variables
		var product = new Product(req.body);

		var message = null;

		// Then save the user 
		product.save(function(err) {
			if (err) {
				return res.status(400).send({
					message:err
				});
			} else {
				res.json(product);
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}

};

