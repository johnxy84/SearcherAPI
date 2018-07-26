'use strict';

const serviceLocator = require('app/config/di.js');
const authService = serviceLocator.get('authService');
const faker = require('faker');
const joi = require('joi');

class Authentication {

    static loginFixture() {
        return {
            email: faker.internet.email(),
            password: faker.internet.password()
        };
    }

    static invalidCredentialsFixture() {
        return {
            email: 'fake@email.com',
            password: 'fakepassword'
        };
    }

    static login() {
        let payload = this.fixture();
        return authService.login(payload.email, payload.password);
    }

    static registerUser(payload) {
        return authService.registerUser(payload);
    }

    static getNoTokenErrorSchema() {
        return joi.object({
            stack: joi.array().required(),
            message: joi.string().valid('No Token Provided').required(),
            code: joi.string().valid('BAD_REQUEST').required(),
          });
    }

    static getNotFoundErrorSchema() {
        return joi.object({
            stack: joi.array().required(),
            message: joi.string().valid('AuthUser not Found').required(),
            code: joi.string().valid('RESOURCE_NOT_FOUND').required(),
          });
    }
}

module.exports = Authentication;
