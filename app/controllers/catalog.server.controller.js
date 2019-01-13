'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	Catalog = mongoose.model('Catalog'),
	Product = mongoose.model('Product');


/**
 * Get Catalogs
 */
exports.getCategoryCatalog = function(req, res) {

	var category = req.param("c");

	var query = {};
	var page = {};
    page.breadcrumbs = [];
    page.breadcrumbs.push({href:"/catalog",name:"Catalog"});

	var isSubCateg = false;
    query["id"] = category;

	if(category == undefined){
		 res.json({success:0,message:"Invalid parameters"}); 
	}

	Catalog.findOne(query,{_id:0}, function(err, catalog){
	      if (err) return res.send(500, { message: err , success: 0});
	      page.title = catalog.name;
          res.render('pages/category.pug',{category:catalog,page:page});  
	});

};



exports.getCatalog = function(req, res) {

	var query = {};
	var page = {};
    page.breadcrumbs = [];

	Catalog.find({}, function(err, catalog){
	      if (err) return res.send(500, { message: err , success: 0});
	      page.title = "Catalog";

	      Product.count({}, function(err, c) {
              page.quantity = c;
              var data = {
                 page:page,
                 catalog:catalog
              }
              res.render('pages/catalog.pug',data);  
          });

	});

};

/**
 * Get SubCatalogs
 */
exports.getSubCategoryCatalog = function(req, res) {

	var category = req.param("c");
	var subcategory = req.param("s");

	var page = {};
    page.breadcrumbs = [];
    page.breadcrumbs.push({href:"/catalog",name:"Catalog"});

	if(category == undefined && subcategory == undefined){
		 res.json({success:0,message:"Invalid parameters"}); 
	}

	var query = {
	   id: category,
	   "items.id":subcategory
	}

	Catalog.findOne(query,{"items.$":1,name:1,_id:0,id:1}, function(err, catalog){
	      if (err || catalog == undefined || catalog.length < 0){
	      	return res.send(500, { message: err , success: 0});
	      }else{
	      	 var item = catalog.items[0];
		      page.title = item.name;
	          page.breadcrumbs.push({href: "/category?c="+catalog.id,name:catalog.name});
		      page.breadcrumbs.push({href: "/subcategory?c="+catalog.id+"&s="+item.id,name:item.name});
		      res.render('pages/subcategory.pug',{category:catalog,page:page});
	      } 
	});

};

/**
 * Create Catalog
 */
exports.createCatalog = function(req, res) {
	if(req.user){
       // Init Variables
		var catalog = new Catalog(req.body);

		var message = null;

		// Then save the user 
		catalog.save(function(err) {
			if (err) {
				return res.status(400).send({
					message:err
				});
			} else {
				res.json(catalog);
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}

};

