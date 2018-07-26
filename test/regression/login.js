'use strict';

const server = require('server');
const request = require('supertest')(server);
const joi = require('joi');
const authenticationHelper = require('test/helpers/authentication.js');

describe('POST Auth', () => {

    it(`should show a not found error if an invalid credential is supplied`, done => {

        request.post(`/auth/login`)
            .send(authenticationHelper.invalidCredentialsFixture())
            .expect(404)
            .expect(res => {
                joi.assert(res.body, authenticationHelper.getNotFoundErrorSchema());
            })
            .end(done);
    });

    it(`should successfully return a JWT if valid credentials is supplied`, (done) => {
        const payload = authenticationHelper.loginFixture();

        // Register a new User before proceeding to login
        authenticationHelper.registerUser(payload)
        .then(() => {
            request.post(`/auth/login`)
            .send(payload)
            .expect(200)
            .expect(res => {
                const schema = {
                    token: joi.string()
                };
                joi.assert(res.body, schema);
            })
            .end(done);
        })
        .catch(done);
    });
});
