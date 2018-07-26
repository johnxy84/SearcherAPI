'use strict';

const defaultPort = 6969;
const config = {
	info: {
		name: 'SearcherAPI',
		version: '1.0'
	},
	secretKey: 'SuperDuperSecretKey',

	port: process.env.PORT || defaultPort,
	base_url: process.env.BASE_URL || `http://localhost:${defaultPort}`,

	//used to setup our logger
	loggerConfig: {
        file: process.env.LOG_PATH || '/tmp/searcher.log',
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
	},
	
	//db config
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://searcher_mongodb',
	},
    jwt: {
        secret: process.env.JWT_SECRET,
    }
};

module.exports = config;