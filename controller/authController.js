const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;
// var nodemailer = require('nodemailer');

// const { sendmail } = require('./sendmail');

/*|============================================================================| 
	|	- function support : tạo token không có expires 													 |
	|	- tài khoản đầu tiên mặc định là admin																		 |
	| - đăng nhập : trả về token để sử dụng và token này được lưu trong database |
	| - đăng xuất : xóa token trong database và header đi												 |
	|============================================================================| */

const authCtr = {
	// Function support
	createToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				admin: user.admin,
			},
			process.env.JWT_ACCESS_SECRET_KEY
		);
	},

	// [POST] - ĐĂNG KÝ TÀI KHOẢN
	registerUser: async (req, res) => {
		try {
			const userExist = await User.where('admin').exists();
			console.log(userExist.length);

			if (userExist.length) {
				const salt = await bcrypt.genSalt(saltRound);
				const hashed = await bcrypt.hash(req.body.passWord, salt);

				// CREATE NEW USER
				const newUser = await new User({
					userName: req.body.userName,
					email: req.body.email,
					admin: req.body.admin,
					passWord: hashed,
				});

				// SAVE USER INFO INTO DB
				const saveUser = await newUser.save();

				// SEND MAIL
				// var transporter = nodemailer.createTransport({
				// 	service: 'gmail',
				// 	auth: {
				// 		user: 'thantai1802@gmail.com',
				// 		pass: 'Huy080820',
				// 	},
				// });

				// var mailOptions = {
				// 	from: 'thantai1802@gmail.com',
				// 	to: 'huy.tranhk13cqt@hcmut.edu.vn',
				// 	subject: 'Sending Email using Node.js',
				// 	text: 'That was easy!',
				// };

				// transporter.sendMail(mailOptions, function (error, info) {
				// 	if (error) {
				// 		console.log(error);
				// 	} else {
				// 		console.log('Email sent: ' + info.response);
				// 	}
				// });

				res.status(200).json(saveUser);
			} else {
				// HASHED PASSWORD
				const salt = await bcrypt.genSalt(saltRound);
				const hashed = await bcrypt.hash(req.body.passWord, salt);

				// CREATE NEW USER
				const newUser = await new User({
					userName: req.body.userName,
					email: req.body.email,
					admin: true,
					passWord: hashed,
				});

				// SAVE USER INFO INTO DB
				const saveUser = await newUser.save();

				return res.status(200).json(saveUser);
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [POST] - ĐĂNG NHẬP
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({ userName: req.body.userName });

			const token = authCtr.createToken(user);

			user.longToken.push(token);
			await user.save();

			// const { passWord, ...others } = user._doc;

			return res.status(200).json({ token });
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	// [POST] - ĐĂNG XUẤT
	logoutUser: async (req, res) => {
		try {
			const user = req.user;
			const tokenHeader = req.tok;

			user.longToken = user.longToken.filter((token) => {
				return token !== tokenHeader;
			});
			console.log(user.longToken);
			await user.save();

			res.status(200).json('[SUCCESS]: Đăng xuất thành công');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE] - XÓA HẾT USER
	deleteAllUser: async (req, res) => {
		try {
			await User.remove();
			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = authCtr;
