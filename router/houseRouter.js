const router = require('express').Router();
const listHouse = require('../controller/houseController');
const middlewareController = require('../middleware/middlewareController');

// [POST]
router.post('/house/add', listHouse.addHouse);

// [GET]
router.get('/house/getall', listHouse.getAllHouse);

// [GET]
router.get('/house/get/:id', listHouse.getMyHouse);

// [DELETE]
router.delete('/house/delete/:id', listHouse.deleteGateway);

// [DELETE]
router.delete('/house/deleteall', listHouse.deleteAllGateway);

module.exports = router;
