'use strict';

//New Relic setup if needed
if (process.env.NEW_RELIC_APP_NAME !== undefined && process.env.NEW_RELIC_LICENSE_KEY !== undefined) {
	try {
		require('newrelic');
	} catch (e) {
		console.log(e);
	}
}

/**
 * Module Dependencies
 */
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const serviceLocator = require('app/config/di.js');
const logger = serviceLocator.get('logger');
const router = express.Router();
const config = require('app/config/config');
const bodyParser = require('body-parser');
const handlers = require('app/handlers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

//TODO: DO this
handlers.setup(app, logger);

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri);

	const db = mongoose.connection;
	db.on('error', (err) => {
	    logger.error(err.stack);
	    process.exit(1);
	});

	db.once('open', () => {
		require('app/config/routes')(app, serviceLocator);
	    logger.info(`Server is listening on port ${config.port}`);
    });
});

// for regression tests purpose
module.exports = server;