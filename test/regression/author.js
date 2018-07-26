'use strict';

const server = require('server');
const request = require('supertest')(server);
const joi = require('joi');
const postHelper = require('test/helpers/posts');
const authHelper = require('test/helpers/authentication');

describe('Authors', () => {
    let userData = '';

    before((done) => {
        authHelper.registerUser(authHelper.loginFixture())
        .then(user => {
            userData = user;
            done();
        })
        .catch(done);
    });


    describe('GET', () => {
        it(`should show a no token Provided error when made without token`, done => {
            request.get(`/authors/posts`)
                .send()
                .expect(400)
                .expect(res => {
                    const schema = authHelper.getNoTokenErrorSchema();
                    joi.assert(res.body, schema);
                })
                .end(done);
        });

        it(`should return a collection of posts when sent valid Id`, done => {
            // Add a new post to ensure we are getting it back
            const payload = postHelper.postFixture();
            payload.creator = userData.id;

            postHelper.createPost(payload)
            .then(post => {
                request.get(`/authors/${userData.id}/posts`)
                .set('x-access-token', userData.token)
                .send()
                .expect(200)
                .expect(res => {
                    const schema = postHelper.getAuthorsUsersSchema(userData.id);
                    joi.assert(res.body, schema);
                })
                .end(done);
            })
            .catch(done);
        });

        it(`should return a collection of authenticated user's post when sent valid Id`, done => {
            // Add a new post to ensure we are getting it back
            const payload = postHelper.postFixture();
            payload.creator = userData.id;

            postHelper.createPost(payload)
            .then(post => {
                request.get(`/authors/posts`)
                .set('x-access-token', userData.token)
                .send()
                .expect(200)
                .expect(res => {
                    const schema = postHelper.getAuthorsUsersSchema(userData.id);
                    joi.assert(res.body, schema);
                })
                .end(done);
            })
            .catch(done);
        });

        it(`should return a validation error when sent invalid ID`, done => {

            const errorMessage = 'Error validating request params. "author_id" with value "1" ' + 
                'fails to match the required pattern: /^[0-9a-fA-F]{24}$/.';

            request.get(`/authors/1/posts`)
            .set('x-access-token', userData.token)
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect(res => {
                console.log(res.error.text);
                joi.assert(res.error.text, errorMessage);
            })
            .end(done);

        });
    });

});
