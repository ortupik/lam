'use strict';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

require('./config/init');

const config = require('./config/config');
const connection = require('./app/db/dbconnect')();
const app = require('./config/express')(connection);

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Lambano application started on port ' + config.port);