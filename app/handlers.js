/**
 * @description Sets up the server handlers.
 */

'use strict';

const errors = require('app/errors');
const httpStatusCodes = require('http-status');

/**
 * Allows us to register the express server handlers.
 *
 * @param server An instance of the express server
 * @param logger An instance of our logger
 */
module.exports.setup = function setup(server, logger) {
    server.on('NotFound', (req, res) => {
        res.status(httpStatusCodes.NOT_FOUND).json(new errors.ResourceNotFound('Resource not found'));
    });

    server.on('VersionNotAllowed', (req, res) => {
        res.json(
            httpStatusCodes.NOT_FOUND,
            new errors.InvalidVersion('Unsupported API version requested')
        );
    });

    server.on('InvalidVersion', (req, res) => {
        res.json(
            httpStatusCodes.NOT_FOUND,
            new errors.InvalidVersion('Unsupported API version requested')
        );
    });

    server.on('uncaughtException', (req, res, route, error) => {
        // tell developer what went wrong
        logger.error(`UncaughtException Error: ${error.stack}`);
        res.json(
            httpStatusCodes.INTERNAL_SERVER_ERROR,
            new errors.InternalServerError('Internal Server Error')
        );
    });

    server.on('MethodNotAllowed', (req, res) => {
        res.json(
            httpStatusCodes.METHOD_NOT_ALLOWED,
            new errors.MethodNotImplemented('Method not Implemented')
        );
    });

};
