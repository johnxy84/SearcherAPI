'use strict';

const httpStatus = require('http-status');
const errors = require('app/errors.js');

class AuthController {

    constructor( authService){
        this.authService = authService;
    }
    
    register(req, res){
        this.authService.registerUser(req.body)
        .then(user => {
            res.status(httpStatus.OK).json(user);
        })
        .catch(error => {
            switch(error.constructor) {
                case errors.UserExists:
                    res.status(httpStatus.BAD_REQUEST).json(error);
                    break;
                default:
                    res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json(new errors.InternalServerError(error.toString()));
            }        
        });
    }

    login(req, res){
        this.authService.loginUser(req.body.email, req.body.password)
        .then(result => {
            res.status(httpStatus.OK).json(result);
        })
        .catch(error => {
            switch(error.constructor) {
                case errors.ResourceNotFound:
                    res.status(httpStatus.NOT_FOUND).json(error);
                    break;
                case errors.Unauthorized:
                    res.status(httpStatus.UNAUTHORIZED).json(error);
                    break;
                default:
                    res.status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json(new errors.InternalServerError(error.toString()));
            }
        });
    }
}

module.exports = (authService) => new AuthController(authService);