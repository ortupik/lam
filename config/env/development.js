'use strict';

//db: 'mongodb://heroku_hskbm0g1:6lo6nott6o6m46c57mgnva5qbi@ds131742.mlab.com:31742/heroku_hskbm0g1',
//db: 'mongodb://127.0.0.1:27017/lambano',
module.exports = {
	db: 'mongodb://127.0.0.1:27017/lambano',
	db_name: "",
	port: 8080,
	app: {
		title: 'lambano'
	},
	facebook: {
		clientID: '210126882934161',
		clientSecret: 'f974f5846983a242eb41a65aaa0df679',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: '0fMRxjGZ89A5DOf1y2cifzMna',
		clientSecret: 'W4WxO7940WViUgPhQhopqLk3e6n2skP0mvmdXQETtVjixwquLn',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
