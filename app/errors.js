/**
 @description Define errors available in project
 **/

'use strict';

const create = require('custom-error-generator');
const constants = require('app/config/constants.js');

module.exports = {

    InvalidVersion: create('InvalidVersion', { code: constants.INVALID_VERSION }),

    MethodNotImplemented: create('MethodNotImplemented', { code: constants.METHOD_NOT_IMPLEMENTED }),

    InvalidParamError: create('InvalidParamError', { code: constants.INVALID_PARAMS }),

    InvalidContentTypeError: create('InvalidContentType', { code: constants.INVALID_CONTENT_TYPE }),

    InternalServerError: create('InternalServerError', { code: constants.INTERNAL_SERVER_ERROR }),

    BadRequest: create('BadRequest', {code: constants.BAD_REQUEST}),

    ResourceNotFound: create('ResourceNotFound', { code: constants.RESOURCE_NOT_FOUND }),

    AuthUserExists: create('UserExists', {code: constants.USER_EXISTS}),

    Unauthorized: create('Unauthorized', { code: constants.UNAUTHORIZED }),

};

