'use strict';
const router = require('express').Router();
const validator = require('express-joi-validation')({});
const searchValidation = require('app/validations/search');

module.exports = (serviceLocator) => {
	const searchController = serviceLocator.get('searchController');

    /**
	 * Gets Posts by Id
	 */
	router.get('/git_users',
	validator.query(searchValidation.params),
	(req, res) => {
		searchController.search(req, res);
    });
    
    return router;
};