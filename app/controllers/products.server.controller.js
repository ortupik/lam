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

	var category = req.param("c");
	var subcategory = req.param("s");
	var page = parseInt(req.param("page"));
	var from = parseInt(req.param("from"));
	var to = parseInt(req.param("to"));
	var price_sort = parseInt(req.param("price_sort"));
	var brand = req.param("brand");
	var searchText = req.param("search");

	var displayLimit = 7;

	var query = {
        price: { $gte: from, $lte: to}
	};

	if(category == undefined && subcategory == undefined){
		// res.json({success:0,message:"Invalid parameters"}); 
	}else if(category != undefined && subcategory != undefined){
		 query["subcategory"] = subcategory;
	}else if(category != undefined && subcategory == undefined){
          query["category"] = category;
	}

	if(brand != undefined){
       query["brand.name"] = { $in: brand };
	}

	if(searchText){
		query["name"] = { '$regex' : searchText, '$options' : 'i' };
	}

	var options = {
	    sort: { price: price_sort},
	    page: page,
	    limit: displayLimit
	};

	Product.paginate(query,options).then(function(result) {
		res.json({success:1, total: result.total, pages:result.pages, data:result.docs}); 
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

exports.getOneProduct = function(req, res) {
	var product_id = {
		id: req.body.id
	}
	Product.findOne(product_id, function(err, product){
	    if (err) return res.send(500, { message: err , success: 0});
	    res.json({success:1,product: product});
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


exports.getBrands = function(req, res) {

	var category = req.body.c;
	var subcategory = req.body.s;
	var from = parseInt(req.body.from);
	var to = parseInt(req.body.to);
	var brand = req.body.brand;
	var searchText = req.body.search;

	var query = {
        price: { $gte: from, $lte: to}
	};

	if(category == undefined && subcategory == undefined){
		// res.json({success:0,message:"Invalid parameters"}); 
	}else if(category != undefined && subcategory != undefined){
		 query["subcategory"] = subcategory;
	}else if(category != undefined && subcategory == undefined){
          query["category"] = category;
	}

	if(searchText){
		query["name"] = { '$regex' : searchText, '$options' : 'i' };
	}



	Product.aggregate([{ $match: query},{$group: {_id: {brand:"$brand.name"},total: {$sum: 1}}} ],function(err, result){
       if (err){
       	return res.send(500, { message: err , success: 0});
       }else{
       		return res.send(200, {  data:result , success: 1});
       }
       
	});

};



