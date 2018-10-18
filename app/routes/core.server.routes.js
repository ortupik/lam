'use strict';


module.exports = function(app) {

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
	app.get('/account', function (req, res) {
	  res.render('pages/account.pug');
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
	app.get('/checkout', function (req, res) {
	  res.render('pages/checkout.pug');
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
	
 
};