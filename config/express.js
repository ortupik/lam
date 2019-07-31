'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'), 
	http = require('http'),
	https = require('https'),
	express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path');

module.exports = function(connection) {
	// Initialize express app
	var app = express();

	// Setting application local variables
	app.locals.logged_in = false;
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;


	 	// Passing the request url to environment locals
	app.use(function(req, res, next) {

		res.locals.url = req.protocol + '://' + req.headers.host + req.url;

		next();
	});

	

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
        /** Serving from the same express Server
    No cors required */
    app.use(express.static('../client'));
    app.use(bodyParser.json());  

	// Showing stack errors
	app.set('showStackError', true); 


	 // Initialize the ejs template engine
    app.engine('html', require('ejs').renderFile);

    app.set('view engine', 'pug');

	app.set('views', './app/views/pages');
	//app.locals.basedir = app.get('pages');


	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
		/*store: new MongoStore({
			 url: config.db
		}),*/
	}));

	// connect flash for flash messages
	app.use(flash());

	app.use(function(req,res,next){
		if(req.session.user == undefined){
			res.locals.session = "not_logged_in";
			//res.redirect('/login');
		}else{
			res.locals.session = req.session.user;
		}	    
	    next();
	});

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app,connection);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('pages/404.pug', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	/*app.use(function(req, res) {
		res.status(404).render('pages/404.pug', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});*/



	if (process.env.NODE_ENV === 'secure') {
		// Log SSL usage
		console.log('Securely using https protocol');

		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./config/sslcerts/server.key', 'utf8');
		var certificate = fs.readFileSync('./config/sslcerts/server.crt', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	// Return Express server instance
	return app;
};