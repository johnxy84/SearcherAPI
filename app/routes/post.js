'use strict';
const router = require('express').Router();
const validator = require('express-joi-validation')({});
const postValidations = require('app/validations/post');

module.exports = (serviceLocator) => {
	const postController = serviceLocator.get('postController');

	/**
	 * Gets Posts by Id
	 */
	router.get('/:id',
	validator.params(postValidations.params),
	(req, res, next) => {
		postController.get(req, res, next);
	});

	/**
	 * Updates a user
	 */
	router.put('/:id',
	validator.params(postValidations.params),
	validator.body(postValidations.put),
	(req, res, next) => {
		postController.update(req, res, next);
	});

	/**
	 * Creates a new Post
	 */
	router.post('/',
	validator.body(postValidations.post),
	(req, res, next) => {
		postController.create(req, res, next);
	});

	/**
	 * Deactivate a post
	 */
	router.delete('/:id',
	validator.params(postValidations.params),
	(req, res, next) => {
		postController.deactivate(req, res, next);
    });
	
    return router;
};