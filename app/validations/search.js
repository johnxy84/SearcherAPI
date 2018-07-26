'use strict';

const Joi = require('joi');

const validator = {
    params: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        language: Joi.string().required(),
    })
};

module.exports = validator;