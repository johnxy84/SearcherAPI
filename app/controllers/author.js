'use strict';
const httpStatus = require('http-status');
const errors = require('app/errors.js');

class AuthorsController {

    constructor (postsService){
        this.postsService = postsService;
    }

    getPostById(req, res) {
        // For the authenticated user, we get his ID from the response object
        const authorId = req.params.author_id || res.tokenData._id;
        this.postsService.getByKeyAndValue('creator', authorId)
        .then(posts => {
            res.status(httpStatus.OK).json(posts);
        })
        .catch(error => {
            switch(error.constructor) {
                case errors.ResourceNotFound:
                    res.status(httpStatus.NOT_FOUND).json(error);
                    break;
                default:
                    res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json(new errors.InternalServerError(error.toString()));
            }
        });
    }

}

module.exports = (logger, postsService) => new AuthorsController(logger, postsService);