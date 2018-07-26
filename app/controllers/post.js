'use strict';
const httpStatus = require('http-status');
const errors = require('app/errors.js');

class PostsController {

    constructor (postsService){
        this.postsService = postsService;
    }

    create(req, res) {
        // set post's creator to jwt user's id
        req.body.creator = res.tokenData._id;
        this.postsService.create(req.body)
        .then(post => {
            res.status(httpStatus.OK).json(post);
        })
        .catch(error => {
            switch(error.constructor) {
                case errors.BadRequest:
                    res.status(httpStatus.BAD_REQUEST).json(error);
                    break;
                default:
                    res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json(new errors.InternalServerError(error.toString()));
            }   
        });
    }

    get(req, res) {
        this.postsService.get(req.params.id)
        .then(post => {
            res.status(httpStatus.OK).json(post);
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

    deactivate(req, res) {
        this.postsService.deactivate(req.params.id)
        .then(deactivatedPost => {
            res.status(httpStatus.OK).json(deactivatedPost);
        })
        .catch(error => {
            switch(error.constructor) {
                case errors.ResourceNotFound:
                    res.status(httpStatus.NOT_FOUND).json(error);
                    break;
                default:
                    res.json(httpStatus.INTERNAL_SERVER_ERROR)
                    .json(new errors.InternalServerError(error.toString()));
            }
        });
    }

    update(req, res) {
        this.postsService.update(req.params.id, req.body)
        .then(post => {
            res.status(httpStatus.OK).json(post);
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

module.exports = (logger, postsService) => new PostsController(logger, postsService);