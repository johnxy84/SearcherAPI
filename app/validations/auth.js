'use strict';

const Joi = require('joi');

const validator = {
    registerSchema: Joi.object().keys({
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email: Joi.string().email().required(),
    }),
    
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    }),
    
};

module.exports = validator;