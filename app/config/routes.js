'use strict';
const authMiddleware = require('app/middleware').auth;

// const formatter = require('app/libs/formatter');

module.exports = (app, serviceLocator) => {
	const auth = require('app/routes/auth')(serviceLocator);
	const post = require('app/routes/post')(serviceLocator);
	const search = require('app/routes/search')(serviceLocator);
	const author = require('app/routes/author')(serviceLocator);

	app.use('/auth', auth);
	app.use(authMiddleware);
	app.use('/posts', post);
	app.use('/search', search);
	app.use('/authors', author);

	// app.use(formatter);
	
	app.use('/home', (req, res) => {
		res.status(200).json('Searcher API');
	});
};
