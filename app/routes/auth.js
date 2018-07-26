'use strict';
const router = require('express').Router();
const validator = require('express-joi-validation')({});
const authSchema = require('app/validations/auth');

module.exports = (serviceLocator) => {
	const authController = serviceLocator.get('authController');

	/**
	 * Create a User
	 */
	router.post('/register',
	validator.body(authSchema.login),
	(req, res) => {
		authController.register(req, res);
	});

	/**
	 * Login user
	 */
	router.post('/login',
	validator.body(authSchema.login),
	(req, res) => {
		authController.login(req, res);
	});
    
    return router;
};