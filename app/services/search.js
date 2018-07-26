'use strict';
const shortid = require('shortid');
const httpClient = require('app/components/httpClient');
class SearchService {

    constructor(logger, userModel){
        this.logger = logger;
        this.userModel = userModel;
    }

    searchOnGit(username, location, language) {
        const reqId = shortid.generate();
        let url = `http://api.github.com/search/users`;
        url += `?q=${username}+language:${language}+location:${location}`;
        this.logger.info(`Request ID: ${reqId} - Searching for User...`);

        return httpClient.get(url)
        .then(users => {
            this.logger.info(`Request ID: ${reqId} - gotten users successfully`);
            let promises = [];
            users.items.map(user => {
                promises.push(
                    this.userModel.createUser(user)
                    .catch(error => {
                        throw error;
                    })
                );
            });

            return Promise.all(promises)
            .then(() => {
                this.logger.info(`Request ID: ${reqId} - saved ${users.items.length} user(s) successfully`);

                return {
                    users: users.items
                };
            })
            .catch(error => {
                throw error;
            });
        })
        .catch(error => {
            this.logger.error(`Request ID: ${reqId} - Error searching user, reason: ${error.toString()}`);
            throw error;
        });
    }
}

module.exports = SearchService;