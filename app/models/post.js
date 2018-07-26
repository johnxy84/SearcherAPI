'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp-date-unix');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { ___v: true } });

const errors = require ('app/errors');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		body: {
			type: String,
			required: true,
   		},
		picture: {
			type: String,
			required: true,
		},
		creator: {
			type: String,
			required: [true, 'Creator Id is needed'],
		},
		deactivated: {
			type: Boolean,
			default: false
			
		},
		taggedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
	{ minimize: false }
);


PostSchema.plugin(timestamps, {
	createdAt: 'createdDate',
	updatedAt: 'updatedDate'
});
PostSchema.plugin(mongooseStringQuery);
PostSchema.plugin(mongooseHidden);
const Post = mongoose.model('Post', PostSchema);

module.exports = {
	createPost: (postData) => {
		return new Promise((resolve, reject)=>{
			const post = new Post(postData);
			post.save((err, savedPost) => {
				if (err) {
					reject(err);
				} else {
					resolve(savedPost);
				}
			});
		});
	},

	findByKeyAndValue: (key, value) => {
		const findWhereCondition = {};
		findWhereCondition[key] = value;
		return new Promise((resolve, reject) => {
			Post.find(findWhereCondition)
			.populate('taggedUsers')
			.exec((err, posts) => {
				if (err) {
					return reject(err);
				}
				if (posts.length === 0){
					reject( new errors.ResourceNotFound('No Post Found'));
				} else {
					resolve(posts);
				}
			});
		});
	},

	updatePost: (id, updateData) => {
		return new Promise((resolve, reject)=>{
			Post.findOneAndUpdate({ '_id': id }, updateData, { 'new': true},  (err, post) => {
				if (err) {
					return reject(err);
				}
				if(post){
					resolve(post);
				}
				else{
					reject(new errors.ResourceNotFound('Post not Found'));
				}
			});
		});  
	},

	find: (id) => {
		return new Promise((resolve, reject) => {
			Post.findOne({'_id': id}, (err, post) => {
				if (err) {
					return reject(err);
				}
				if (post) {
					resolve(post);
				}
				else {
					reject(new errors.ResourceNotFound('Post not found'));
				}
			});
		});
	}
};