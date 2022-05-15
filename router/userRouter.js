const router = require('express').Router();
const userCtr = require('../controller/userController');
const middlewareCtr = require('../middleware/middlewareController');

// [GET]
router.get('/user/getall', userCtr.getAllUser);

// [GET]
router.get('/user/get/:id', userCtr.getUser);

// [PUT]
router.put('/user/update/:id', userCtr.updateUser);

// [DELETE]
router.delete('/user/delete/:id', middlewareCtr.checkAdminStatus, userCtr.deleteUser);

// [DELETE]
router.delete('/user/deleteall', userCtr.deleteAllUser);

module.exports = router;
