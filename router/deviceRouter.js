const router = require('express').Router();
const listDevice = require('../controller/device');
const middleware = require('../middleware/middlewareController');

router.get('/device/getall', listDevice.getAllDevice);

module.exports = router;
