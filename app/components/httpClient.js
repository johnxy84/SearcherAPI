'use strict';

const request = require('request-promise');
class HttpClient {


	get(url) {
        var options = {
            headers: {
                'User-Agent': 'Request-Promise'
            },
            uri: url,
            json: true
        };
        return request(options)
            .catch(function (err) {
                throw err;
            });
	}

}

module.exports = new HttpClient();
