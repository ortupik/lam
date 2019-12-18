'use strict';

module.exports = {
	app: {
		title: 'Lambano',
	},
	port: process.env.PORT || 3000,
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};