const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bcrypt = require('bcrypt');

/*|============================================================================| 
	|	- function support : giải mã token để lấy id của user											 |
	|	- checkLoginBefore : dùng cho route đăng nhập kiểm 												 |
	|			tra tài khoản này đã đăng nhập ở chỗ khác chưa												 |
	| - checkLoginStatus : dùng cho các route để xác nhận user đã đăng nhập			 |
	| - checkAdminStatus : dùng cho các route yêu cầu user là admin							 |
	|============================================================================| */

const middleware = {
	// function support
	parseJwt: (token) => {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);

		return JSON.parse(jsonPayload);
	},

	// valid = userNameDB tức là tìm được user này rồi
	// valid = 0 nếu sai các điều kiện ràng buộc
	validUserName: async (userName, passWord) => {
		try {
			const userNameBody = userName;
			const passWordBody = passWord;
			if (userNameBody.length < 1 || passWordBody.length < 1) {
				return 0;
			} else {
				const usernameDB = await User.find({ userName: userName });
				if (usernameDB) {
					return usernameDB;
				} else {
					return 0;
				}
			}
		} catch (error) {
			return 0;
		}
	},

	checkLoginBefore: async (req, res, next) => {
		try {
			// get user from Body
			const userNameBody = req.body.userName;
			console.log(userNameBody);
			const passWordBody = req.body.passWord;
			console.log(passWordBody);

			// valid = userNameDB tức là tìm được user này rồi
			// valid = 0 nếu sai các điều kiện ràng buộc
			const valid = await middleware.validUserName(userNameBody, passWordBody);
			console.log(valid);

			if (valid) {
				const user = valid[0]; // userName trong DB

				// compare password
				const checkPassword = await bcrypt.compare(passWordBody, user.passWord);
				// compare not successfully
				if (!checkPassword) {
					return res.status(404).json('[NOT FOUND]: mật khẩu không đúng !');
				}
				// compare successfully
				else {
					// find token of user
					const currentToken = user.longToken[0];
					// if token exist then block
					if (currentToken) {
						return res.status(403).json('[FORBIDEN]: Account này đã Login ở nơi khác !');
					}
					// else token doesn't exist then catch user and next for login
					else {
						console.log('ACCOUNT NÀY ĐƯỢC PHÉP LOGIN');
						req.user = user;
						next();
					}
				}
			} else {
				return res.status(400).json('Account does not exist');
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	checkLoginStatus: async (req, res, next) => {
		try {
			console.log('START CHECK LOGIN STATUS');
			const tokenHeader = req.headers.token;

			if (tokenHeader) {
				const object = middleware.parseJwt(tokenHeader.split(' ')[1]);
				const user = await User.findById(object.id);

				if (user == null) {
					return res.status(403).json('[FORBIDEN]: Bạn chưa đăng nhập !');
				}

				if (tokenHeader.split(' ')[1] != user.longToken[0]) {
					return res.status(403).json('[FORBIDEN]: Bạn chưa đăng nhập !');
				} else {
					req.user = user;
					req.tok = tokenHeader.split(' ')[1];
					console.log('CHECK LOGIN STATUS SUCCESSFULLY');
					next();
				}
			} else {
				return res.status(403).json('[FORBIDEN]: Bạn chưa đăng nhập !');
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	checkAdminStatus: (req, res, next) => {
		middleware.checkLoginStatus(req, res, () => {
			console.log(req.user.admin);
			if (req.user.admin === true) {
				next();
			} else {
				return res.status(403).json('[FORBIDEN]: Bạn không phải admin');
			}
		});
	},
};

module.exports = middleware;

/*| ==========================================================================================|
	| đã xong phần valid input - check login ở 1 nơi - check coi login chưa - check quyền admin | 
	| ==========================================================================================| */
