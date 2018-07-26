'use strict';
const config = require('app/config/config.js');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const shortid = require('shortid');
const errors = require('app/errors');

class AuthService {

    /**
     * Constructor
     * @param logger 
     * @param authUserModel 
     */
    constructor(logger, authUserModel)
    {
        this.logger = logger;
        this.authUserModel = authUserModel;
    }

    /**
     * Logs a user in
     * @param email 
     * @param password 
     */
    loginUser(email, password){
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Signing in User with email ${email}`);

        return this.authUserModel.findAuthUser(email)
        .then(user =>{
            this.logger.info(`Request ID: ${reqId} - User exists, validating Password...`);
            return this.isValidPassword(password, user.password)
            .then(valid => {
                if (valid) {
                    this.logger.info(`Request ID: ${reqId} - Validated password successfully`);
                    const token = this.generateToken(user);
                    return {
                        token: token,
                    };
                } else {
                    //invalid password
                    this.logger.error(`Request ID: ${reqId} - Password is invalid`);
                    throw new errors.Unauthorized('Invalid Password');
                }
            });
        })
        .catch(error=>{
            this.logger.error(`Request ID: ${reqId} - Error Logging user in, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Register a new user
     * @param userData 
     */
    registerUser(userData){
        const reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Registering new User with email ${userData.email}`);

        return this.authUserModel.createAuthUser(userData)
        .then(user => {
            this.logger.info(`Request ID: ${reqId} - Registered user  with email ${userData.email}`);
            const token = this.generateToken(user);
            return {
                token: token,
                id: user._id,
                email: user.email
            };
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error creating user, reason: ${error.toString()}`);
            throw error;
        });
    }

    /**
     * Generates a token for a user
     * @param  user 
     */
    generateToken (user) {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign({ 
            _id: user._id,
            email: user.email,
            exp: parseInt(expiry.getTime() / 1000),
            }, config.jwt.secret);  
    }

    /**
     * Validates a user's password
     * @param password 
     * @param userPassword 
     */
    isValidPassword (password, userPassword) {
        return new Promise ((resolve, reject)=>{
            bcrypt.compare(password, userPassword, function (err, result) {
                if(err){
                    //there was an error authenticating
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
}

module.exports = AuthService;