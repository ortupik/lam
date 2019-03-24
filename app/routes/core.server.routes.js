'use strict';


module.exports = function(app) {

	var shipping = require('../../app/controllers/shipping.server.controller'); 


	// Root routing	
	app.get('/', function (req, res) {
	  res.render('pages/index.pug');
	});
	app.get('/index', function (req, res) {
	  res.render('pages/index.pug');
	});
	app.get('/401', function (req, res) {
	  res.render('401.html');
	});
	app.get('/404', function (req, res) {
	  res.render('pages/404.pug');
	});
	app.get('/about', function (req, res) {
	  res.render('pages/about.pug');
	});
	app.get('/login', function (req, res) {
	  res.render('pages/login.pug');
	});
	app.get('/logout', function (req, res) {
	  res.render('pages/logout.pug');
	});
	app.get('/register', function (req, res) {
	  res.render('pages/register.pug');
	});
	app.get('/forgot_password', function (req, res) {
	  res.render('pages/forgot_password.pug');
	});
	app.get('/article', function (req, res) {
	  res.render('pages/article.pug');
	});
	app.get('/blog', function (req, res) {
	  res.render('pages/blog.pug');
	});
	app.get('/brands', function (req, res) {
	  res.render('pages/brands.pug');
	});
	app.get('/cart', function (req, res) {
	  res.render('pages/cart.pug');
	});	
	app.get('/compare', function (req, res) {
	  res.render('pages/compare.pug');
	});
	app.get('/contacts', function (req, res) {
	  res.render('pages/contacts.pug');
	});
	app.get('/delivery', function (req, res) {
	  res.render('pages/delivery.pug');
	});
	app.get('/faq', function (req, res) {
	  res.render('pages/faq.pug');
	});
	app.get('/favorites', function (req, res) {
	  res.render('pages/favorites.pug');
	});
	app.get('/news', function (req, res) {
	  res.render('pages/news.pug');
	});
	app.get('/personal', function (req, res) {
	  res.render('pages/personal.pug');
	});
	app.get('/settings', function (req, res) {
	  res.render('pages/settings.pug');
	});
	app.get('/test', function (req, res) {
	  res.render('pages/test.pug');
	});
	app.get('/payment', function (req, res) {
	  res.render('pages/payment.pug');
	});
	app.get('/mobile', function (req, res) {
	  res.render('pages/mobile.pug');
	});
	app.get('/card', function (req, res) {
	  res.render('pages/card.pug');
	});

	
 
};