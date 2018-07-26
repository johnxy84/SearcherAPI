'use strict';

const config = require('app/config/config');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const errors = require('app/errors.js');

const authMiddleware = {

	auth(req, res, next) {
		if (req.method !== 'GET' && req.method !== 'DELETE' && !req.is('application/json')) {
			res.status(httpStatus.BAD_REQUEST).json(new errors.BadRequest('Request was not in Json'));
		}
	
		var token = req.params.token || req.query.token || req.headers['x-access-token'];
		// decode and validate token
		if(token){
			// verifies secret and checks exp
			jwt.verify(token, config.jwt.secret, function(err, decodedToken) {      
				if (err) {
					res.status(httpStatus.BAD_REQUEST).json(new errors.BadRequest('Invalid token'));
				} else {
					// if everything is good, save to request for use in other routes
					res.tokenData = decodedToken;
					next();
				}
			});
		} else {
			// if there is no token, return an error
			res.status(httpStatus.BAD_REQUEST).json(new errors.BadRequest('No Token Provided'));
		}
	}
};

module.exports = authMiddleware;
