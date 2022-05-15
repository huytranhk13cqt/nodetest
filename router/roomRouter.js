const router = require('express').Router();
const listRoom = require('../controller/roomController');
const middleware = require('../middleware/middlewareController');

// [POST]
router.post('/room/add', middleware.checkLoginStatus, listRoom.addRoom);

// [GET]
router.get('/room/getall', middleware.checkAdminStatus, listRoom.getAllRoom);

// [GET]
router.get('/room/get/:id', middleware.checkLoginStatus, listRoom.getMyRoom);

// [DELETE]
router.delete('/room/delete/:id', listRoom.deleteRoom);

// [DELETE]
router.delete('/room/deleteall', listRoom.deleteAllRoom);

module.exports = router;
