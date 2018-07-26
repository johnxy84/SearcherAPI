'use strict';

const server = require('server');
const request = require('supertest')(server);
const joi = require('joi');
const searchHelper = require('test/helpers/search');
const authHelper = require('test/helpers/authentication');

describe('GET Search', () => {
    let token = '';

    before((done) => {
        authHelper.registerUser(authHelper.loginFixture())
        .then(user => {
            token = user.token;
            done();
        })
        .catch(done);
    });

    it(`should show a no token Provided error when made without token`, done => {

        request.get(`/search/git_users`)
            .query({})
            .send()
            .expect(400)
            .expect(res => {
                const schema = authHelper.getNoTokenErrorSchema();
                joi.assert(res.body, schema);
            })
            .end(done);
    });

    it(`should show invalid parameter error when invalid params are passed`, done => {

        const errorMessage = joi.string().valid('Error validating request query. "name"' +
            ' is required. "location" is required. "language" is required.');

        request.get(`/search/git_users`)
        .query({})
        .set('x-access-token', token)
        .send()
        .expect(400)
        .expect(res => {
            joi.assert(res.error.text, errorMessage);
        })
        .end(done);

    });

    it(`should return git users when passed actual parameters`, done => {
        const params = {name: 'John', language: 'JavaScript', location: 'Barcelona'};
        searchHelper.nockGitHub(params);

        request.get(`/search/git_users`)
        .query(params)
        .set('x-access-token', token)
        .send()
        .expect(200)
        .expect(res => {
            const schema = joi.object({
                users: joi.array().items(joi.object({
                    login: joi.string(),
                    id: joi.number(),
                    avatar_url: joi.string(),
                    gravatar_id: joi.string(),
                    url: joi.string(),
                    html_url: joi.string(),
                    followers_url: joi.string(),
                    gists_url: joi.string(),
                    starred_url: joi.string(),
                    subscriptions_url: joi.string(),
                    organizations_url: joi.string(),
                    repos_url: joi.string(),
                    events_url: joi.string(),
                    received_events_url: joi.string(),
                    type: joi.string(),
                    site_admin: joi.bool()
                }))
            });
            joi.assert(res.bod, schema);
        })
        .end(done);

    });

});
