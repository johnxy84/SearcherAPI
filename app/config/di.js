'use strict';

const serviceLocator =  require ('app/libs/service_locator.js');
const config = require('app/config/config.js');
/**
 * This class registers all our dependencies
 * we would be using throughout our application
 */

serviceLocator.register('logger', () =>{
    return require('app/libs/logger.js').create(config.loggerConfig);
});

serviceLocator.register('postService', () =>{
    const logger = serviceLocator.get('logger');
    const postModel = require('app/models/post');
    const PostsService = require('app/services/post');
    return new PostsService(logger, postModel);
});

serviceLocator.register('authService', () =>{
    const logger = serviceLocator.get('logger');
    const authUserModel = require('app/models/authUser');
    const AuthService = require('app/services/auth');
    return new AuthService(logger, authUserModel);
});

serviceLocator.register('searchService', () =>{
    const logger = serviceLocator.get('logger');
    const userModel = require('app/models/User');
    const SearchService = require('app/services/search');
return new SearchService(logger, userModel);
});

serviceLocator.register('searchController', (serviceLocator)=>{
    const searchService = serviceLocator.get('searchService');
    return require('app/controllers/search')(searchService);
});

serviceLocator.register('authController', (serviceLocator)=>{
    const authService = serviceLocator.get('authService');
    return require('app/controllers/auth')(authService);
});

serviceLocator.register('postController', (serviceLocator)=>{
    const postService = serviceLocator.get('postService');
    return require('app/controllers/post')(postService);
});

serviceLocator.register('authorController', (serviceLocator)=>{
    const postService = serviceLocator.get('postService');
    return require('app/controllers/author')(postService);
});


module.exports = serviceLocator;