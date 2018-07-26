'use strict';

const joi = require('joi');

const validator = {
    post: joi.object({
        title: joi.string().required(),
        body: joi.string().required(),
        picture: joi.string().required(),
        taggedUsers: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional()
    }),

    put: joi.object({
        title: joi.string().optional(),
        body: joi.string().optional(),
        picture: joi.string().optional(),
        taggedUsers: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional()
    }),

    params: joi.object({
        id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }) 
};

module.exports = validator;