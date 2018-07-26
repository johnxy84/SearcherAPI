'use strict';
const shortid = require('shortid');

class PostsService {

    /**
     * Service class constructor
     * @param logger Instance of our logger
     * @param post Instance of our posts model
     */
    constructor(logger, post) {
        this.logger = logger;
        this.post = post;
    }

    /**
     * Deactivates a post by setting it's deactivated to true
     * @param postId 
     */
    deactivate(postId) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Deactivating post with ID: ${postId}`);

        return this.post.updatePost(postId, {deactivated: true})
        .then(post => {
            this.logger.info(`Request ID: ${reqId} - Deactivated post: ${postId} successfully`);
            return post;
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error deactivating post, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Gets a Post by a given key and value
     * @param key 
     * @param value 
     */
    getByKeyAndValue(key, value) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Getting posts by ${key} for: ${value}`);

        return this.post.findByKeyAndValue(key, value)
        .then(posts => {
            this.logger.info(`Request ID: ${reqId} - Gotten posts by ${key} for: ${value}`);
            return posts;
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error getting posts, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Gets a post by It's Id
     * @param id 
     */
    get(id) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Getting post by id: ${id}`);

        return this.post.find(id)
        .then(post => {
            this.logger.info(`Request ID: ${reqId} - Gotten posts id: ${id}`);
            return post;
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error getting post, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Gets all posts by their deactivated status
     * @param deactivated 
     */
    getAll(deactivated) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Getting posts by deactivated status: ${deactivated}`);

        return this.post.findByKeyAndValue('deactivated', deactivated)
        .then(posts => {
            this.logger.info(`Request ID: ${reqId} - Gotten posts with deactivated status: ${deactivated}`);
            return posts;
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error getting posts, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Creates a new Post
     * @param postData
     */
    create(postData) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Creating post with payload: ${JSON.stringify(postData)}`);

        return this.post.createPost(postData)
        .then(post => {
            this.logger.info(`Request ID: ${reqId} - Created post with Payload: ${JSON.stringify(postData)}`);
            return post;
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error creating post, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Updats an existing Post
     * @param postId
     * @param updateDat
     */
    update(postId, updateData) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Updating post: ${postId} with payload: ${JSON.stringify(updateData)}`);

        return this.post.updatePost(postId, updateData)
        .then(post => {
            this.logger.info(`Request ID: ${reqId} - Updated post: ${postId} with Payload: ${JSON.stringify(updateData)}`);
            return post;
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error updating post, reason: ${error.toString()}`);
            throw error;
        });
    }
}

module.exports = PostsService;