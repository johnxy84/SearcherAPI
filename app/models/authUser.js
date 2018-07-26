'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const bcrypt = require ('bcrypt');
const errors = require ('app/errors');

const AuthUserSchema = new mongoose.Schema(
	{
		email: {
				type: String,
				required: true,
		},
		password: {
			type: String,
			required: true
		}
	},
	{ minimize: false }
);

AuthUserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function (err, hash){
	  if (err) {
		return next(err);
	  }
	  user.password = hash;
	  next();
	});
  });

AuthUserSchema.plugin(timestamps);
AuthUserSchema.plugin(mongooseStringQuery);

const AuthUser = mongoose.model('AuthUser', AuthUserSchema);

module.exports = {

		createAuthUser : (userData) => {
			return new Promise((resolve, reject)=>{
				//check if user with email already exists
				AuthUser.findOne({email: userData.email}, (err, user)=>{
					if (err){
						reject (err);
						return;
					}
					//user already exist
					if(user)
					{
						return reject( new errors.AuthUserExists('AuthUser with email already exist'));
					}

					//Doesn't exist, create a new user
					user = new AuthUser(userData);
					user.save((err, newAuthUser) => {
						if (err) {
							reject(err);
						} else {
							resolve(newAuthUser);
						}
					});
				});
			});
		},

		findAuthUser : (email) => {
			return new Promise((resolve, reject) => {
				AuthUser.findOne({ email: email }, (err, user) => {
					if (err) {
							reject(err);
							return;
					}

					if (!user){
						reject(new errors.ResourceNotFound('AuthUser not Found'));
					} else {
						resolve(user);
					}
				});
			});
		},
};