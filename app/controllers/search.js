'use strict';
const httpStatus = require('http-status');
const errors = require('app/errors.js');

class SearchController {

    constructor (searchService){
        this.searchService = searchService;
    }

    search(req, res) {
        const query = req.query;
        this.searchService.searchOnGit(query.name, query.location, query.language)
        .then(posts => {
            res.status(httpStatus.OK).json(posts);
        })
        .catch(error => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(new errors.InternalServerError(error.toString()));
        });
    }

}

module.exports = (searchService) => new SearchController(searchService);