'use strict';

const serviceLocator = require('app/config/di.js');
const postService = serviceLocator.get('postService');
const faker = require('faker');
const joi = require('joi');

class Authentication {

    static postFixture() {
        return {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            picture: faker.internet.avatar(),
            taggedUsers: []
        };
    }

    static createPost(payload) {
        return postService.create(payload);
    }

    static getPostSchema(payload) {
        const accountedTimeDifference = 10000;
        const currentTimeStamp = new Date().getTime();
        let maxDate = new Date(currentTimeStamp + accountedTimeDifference);
        let minDate = new Date(currentTimeStamp- accountedTimeDifference);
        // convert to unix timestamp, divide js timestamp by 1000 milliseconds
        minDate = parseInt((minDate.getTime() / 1000).toFixed());
        maxDate = parseInt((maxDate.getTime() / 1000).toFixed());

        return joi.object({
            title: joi.string().valid(payload.title).required(),
            body: joi.string().valid(payload.body).required(),
            picture: joi.string().valid(payload.picture).required(),
            taggedUsers: joi.array().length(payload.taggedUsers.length).required(),
            createdDate: joi.number().min(minDate).max(maxDate).required(),
            updatedDate: joi.number().min(minDate).max(maxDate).required(),
            deactivated: joi.bool().valid(payload.deactivated || false).required(),
            creator: joi.string().valid(payload.creator.toString()),
            _id: joi.string().required()
        });
    }

    static getAuthorsUsersSchema(authorId) {
        return joi.array().items(joi.object({
            title: joi.string().required(),
            body: joi.string().required(),
            picture: joi.string().required(),
            taggedUsers: joi.array().required(),
            createdDate: joi.number().required(),
            updatedDate: joi.number().required(),
            deactivated: joi.bool().required(),
            creator: joi.string().valid(authorId.toString()),
            _id: joi.string().required()
        }));
    }
}

module.exports = Authentication;
