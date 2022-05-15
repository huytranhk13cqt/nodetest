const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;

const userCtr = {
	// [GET]
	getAllUser: async (req, res) => {
		try {
			const users = await User.find();

			res.status(200).json(users);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);

			res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [PUT]
	updateUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);

			const infor = req.body;

			if (infor.passWord) {
				const salt = await bcrypt.genSalt(saltRound);
				const hashed = await bcrypt.hash(infor.passWord, salt);
				infor.passWord = hashed;
			}

			await user.updateOne({ $set: infor });
			res.status(200).json('Update successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteUser: async (req, res) => {
		try {
			await User.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteAllUser: async (req, res) => {
		try {
			await User.remove();

			res.status(200).json('Delete all successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = userCtr;
