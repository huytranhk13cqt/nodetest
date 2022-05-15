const router = require('express').Router();
const listAircon = require('../controller/airconController');

// [POST]
router.post('/aircon/add', listAircon.addAircon);

// [GET]
router.get('/aircon/get/:id', listAircon.getAircon);

// [GET]
router.get('/aircon/getall', listAircon.getallAircon);

// [PUT]
router.put('/aircon/update/:id', listAircon.updateAircon);

// [DELETE]
router.delete('/aircon/delete/:id', listAircon.deleteAircon);

module.exports = router;
