'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { ___v: true } });

const UserSchema = new mongoose.Schema(
	{
		login: { type: String},
		id: { type: Number},
		node_id: { type: String},
		avatar_url: { type: String},
		gravatar_id: { type: String},
		url: { type: String},
		html_url: { type: String},
		followers_url: { type: String},
		subscriptions_url: { type: String},
		organizations_url: { type: String},
		repos_url: { type: String},
		received_events_url: { type: String},
		type: { type: String},
		score: { type: Number},
	},
	{ minimize: false }
);

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);
UserSchema.plugin(timestamps, {
	createdAt: 'createdDate',
	updatedAt: 'updatedDate'
});
UserSchema.plugin(mongooseHidden);
const User = mongoose.model('User', UserSchema);

module.exports = {
	createUser : (userData) => {
		return new Promise((resolve, reject)=>{
			const options = { upsert: true, new: true, setDefaultsOnInsert: true };

			User.findOneAndUpdate({id: userData.id}, userData, options, (err, user)=>{
				if (err){
					return reject (err);
				}
				resolve(user);
			});
		});
	}
};