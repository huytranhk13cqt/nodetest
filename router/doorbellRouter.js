const router = require('express').Router();
const listDoorbell = require('../controller/doorbellController');

// [POST]
router.post('/doorbell/add', listDoorbell.addDoorbell);

// [GET]
router.get('/doorbell/get/:id', listDoorbell.getdDoorbell);

// [POST]
router.post('/doorbell/shoot/:id', listDoorbell.shootPicture);

// [DELETE]
router.delete('/doorbell/delete/:id', listDoorbell.deleteDoorbell);

module.exports = router;
