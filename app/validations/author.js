'use strict';

const joi = require('joi');

const validator = {
    params: joi.object({
        author_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }) 
};

module.exports = validator;