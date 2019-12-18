'use strict';

module.exports = {
	port: 443,
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://heroku_hskbm0g1:6lo6nott6o6m46c57mgnva5qbi@ds131742.mlab.com:31742/heroku_hskbm0g1',
	app: {
		title: 'Lambano'
	},
};