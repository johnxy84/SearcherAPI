'use strict';

const server = require('server');
const request = require('supertest')(server);
const joi = require('joi');
const postHelper = require('test/helpers/posts');
const authHelper = require('test/helpers/authentication');

describe('Posts', () => {
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
            request.get(`/posts/12345`)
                .send()
                .expect(400)
                .expect(res => {
                    const schema = authHelper.getNoTokenErrorSchema();
                    joi.assert(res.body, schema);
                })
                .end(done);
        });

        it(`should return a post when sent valid Id`, done => {
            // Add a new post to ensure we are getting it back
            const payload = postHelper.postFixture();
            payload.creator = userData.id;

            postHelper.createPost(payload)
            .then(post => {
                request.get(`/posts/${post._id}`)
                .set('x-access-token', userData.token)
                .send()
                .expect(200)
                .expect(res => {
                    const schema = postHelper.getPostSchema(payload);
                    joi.assert(res.body, schema);
                })
                .end(done);
            })
            .catch(done);

        });

        it(`should return a validation error when sent invalid ID`, done => {

            const errorMessage = 'Error validating request params. "id" with value "1" ' + 
                'fails to match the required pattern: /^[0-9a-fA-F]{24}$/.';

            request.get(`/posts/1`)
            .set('x-access-token', userData.token)
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect(res => {
                joi.assert(res.error.text, errorMessage);
            })
            .end(done);

        });
    });

    describe('POST', () => {
        it(`should show a no token Provided error when made without token`, done => {
            request.post(`/posts`)
                .set('Content-Type', 'application/json')
                .send({})
                .expect(400)
                .expect(res => {
                    const schema = authHelper.getNoTokenErrorSchema();
                    joi.assert(res.body, schema);
                })
                .end(done);
        });

        it(`should return a post when sent correct payload`, done => {
            let payload = postHelper.postFixture();

            request.post(`/posts`)
            .set('x-access-token', userData.token)
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect(200)
            .expect(res => {
                payload.creator = userData.id;
                const schema = postHelper.getPostSchema(payload);
                joi.assert(res.body, schema);
            })
            .end(done);

        });

        it(`should return a validation error when sent incorrect payload`, done => {

            const errorMessage = 'Error validating request body. "title" ' +
                'is required. "body" is required. "picture" is required.';
            request.post(`/posts`)
            .set('x-access-token', userData.token)
            .set('Content-Type', 'application/json')
            .send({})
            .expect(400)
            .expect(res => {
                joi.assert(res.error.text, errorMessage);
            })
            .end(done);
        });
    });

    describe('PUT', () => {
        it(`should show a no token Provided error when made without token`, done => {
            request.put(`/posts/123456`)
                .set('Content-Type', 'application/json')
                .send({})
                .expect(400)
                .expect(res => {
                    const schema = authHelper.getNoTokenErrorSchema();
                    joi.assert(res.body, schema);
                })
                .end(done);
        });

        it(`should return an updated post when sent correct payload`, done => {
            //  Add a new post to ensure we are getting it back
            const payload = postHelper.postFixture();
            payload.creator = userData.id;

            postHelper.createPost(payload)
            .then(post => {
                request.put(`/posts/${post._id}`)
                .set('x-access-token', userData.token)
                .set('Content-Type', 'application/json')
                .send({title: 'Updated Title'})
                .expect(200)
                .expect(res => {
                    payload.title = 'Updated Title';
                    const schema = postHelper.getPostSchema(payload);
                    joi.assert(res.body, schema);
                })
                .end(done);
            })
            .catch(done);

        });

        it(`should return a validation error when sent invalid ID`, done => {

            const errorMessage = 'Error validating request params. "id" with value "1" ' + 
                'fails to match the required pattern: /^[0-9a-fA-F]{24}$/.';

            request.put(`/posts/1`)
            .set('x-access-token', userData.token)
            .set('Content-Type', 'application/json')
            .send()
            .expect(400)
            .expect(res => {
                joi.assert(res.error.text, errorMessage);
            })
            .end(done);

        });
        it(`should return a validation error when sent incorrect payload`, done => {

            const errorMessage = 'Error validating request body. "name" is not allowed.';

            //  Add a new post to ensure we are getting it back
            const payload = postHelper.postFixture();
            payload.creator = userData.id;

            postHelper.createPost(payload)
            .then(post => {
                request.put(`/posts/${post._id}`)
                .set('x-access-token', userData.token)
                .set('Content-Type', 'application/json')
                .send({name: 'New Name'})
                .expect(400)
                .expect(res => {
                    joi.assert(res.error.text, errorMessage);
                })
                .end(done);
            })
            .catch(done);

        });
    });

    describe('DELETE', () => {
        it(`should show a no token Provided error when made without token`, done => {
            request.delete(`/posts/123456`)
                .set('Content-Type', 'application/json')
                .expect(400)
                .expect(res => {
                    const schema = authHelper.getNoTokenErrorSchema();
                    joi.assert(res.body, schema);
                })
                .end(done);
        });

        it(`should return an updated post with deactivated 'true' when sent correct payload`, done => {
            //  Add a new post to ensure we are getting it back
            const payload = postHelper.postFixture();
            payload.creator = userData.id;

            postHelper.createPost(payload)
            .then(post => {
                request.delete(`/posts/${post._id}`)
                .set('x-access-token', userData.token)
                .set('Content-Type', 'application/json')
                .expect(200)
                .expect(res => {
                    payload.deactivated = true;
                    const schema = postHelper.getPostSchema(payload);
                    joi.assert(res.body, schema);
                })
                .end(done);
            })
            .catch(done);

        });

        it(`should return a validation error when sent invalid ID`, done => {

            const errorMessage = 'Error validating request params. "id" with value "1" ' + 
                'fails to match the required pattern: /^[0-9a-fA-F]{24}$/.';

            request.delete(`/posts/1`)
            .set('x-access-token', userData.token)
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect(res => {
                joi.assert(res.error.text, errorMessage);
            })
            .end(done);

        });
    });
});
