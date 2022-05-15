const router = require('express').Router();
const authCtr = require('../controller/authController');
const middlewareCtr = require('../middleware/middlewareController');

// [POST]
router.post('/register', authCtr.registerUser);

// [POST]
router.post('/login', middlewareCtr.checkLoginBefore, authCtr.loginUser);

// [POST]
router.post('/logout/', middlewareCtr.checkLoginStatus, authCtr.logoutUser);

// [DELETE]
router.delete('/deleteall', authCtr.deleteAllUser);

module.exports = router;
