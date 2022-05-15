const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			minlength: 1,
			maxlength: 20,
			unique: true, // CHECK EXIST
			required: true,
		},
		email: {
			type: String,
			minlength: 5,
			maxlength: 50,
			unique: true,
			required: true,
		},
		passWord: {
			type: String,
			minlength: 1,
			required: true,
		},
		admin: {
			type: Boolean,
			default: 'false',
		},
		longToken: {
			type: [String],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
