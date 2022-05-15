const router = require('express').Router();
const listSwitch = require('../controller/switchController');
const middleware = require('../middleware/middlewareController');

// [POST]
router.post('/switch/add', listSwitch.addSwitch);

// [GET]
router.get('/switch/get/:id', listSwitch.getSwitch);

// [GET]
router.get('switch/getall', listSwitch.getallSwitch);

// [PUT]
router.put('/switch/update/:id', listSwitch.updateSwitch);

// [DELELE]
router.delete('/switch/delete/:id', listSwitch.deleteSwitch);

module.exports = router;
