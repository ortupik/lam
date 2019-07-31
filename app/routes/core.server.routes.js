'use strict';


module.exports = function(app) {

	// Root routing	
	app.get('/', function (req, res) {
		if(req.session.user){
			res.render('index.pug',{role:req.session.user.role});
		}else{
			res.render('login.pug');
		}
	  
	});
	
	app.get('/test', function (req, res) {
	  res.render('test.html');
	});
	app.get('/index', function (req, res) {
	  res.render('index.pug');
	});
	app.get('/login', function (req, res) {
	  res.render('login.pug');
	});
	
	app.get('/logout', function (req, res) {
	  res.render('login.pug');
	});
	app.get('/forgot_password', function (req, res) {
	  res.render('forgot_password.pug');
	});
	app.get('/company', function (req, res) {
	  if(req.session.user){
	    res.render('company.pug',{role:req.session.user.role});
      }else{
        res.render('login.pug');
	  }
	});
	app.get('/request_access', function (req, res) {
	  res.render('request_access.pug');
	});
	app.get('/401', function (req, res) {
	  res.render('401.html');
	});
	app.get('/404', function (req, res) {
	  res.render('404.html');
	});
 
};