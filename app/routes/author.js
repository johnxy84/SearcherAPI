'use strict';
const router = require('express').Router();
const validator = require('express-joi-validation')({});
const authorValidations = require('app/validations/author');

module.exports = (serviceLocator) => {
	const authorController = serviceLocator.get('authorController');
	/**
	 * Gets Posts by Id
	 */
	router.get('/:author_id/posts',
	validator.params(authorValidations.params),
	(req, res, next) => {
		authorController.getPostById(req, res, next);
    });
    

    /**
	 * Gets Posts by Id
	 */
	router.get('/posts', (req, res, next) => {
		authorController.getPostById(req, res, next);
    });
    return router;
};