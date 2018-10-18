'use strict';

module.exports = {
	app: {
		title: 'E-Commerce',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};