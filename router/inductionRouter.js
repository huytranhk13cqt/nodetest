const router = require('express').Router();
const listInduction = require('../controller/inductionController');

// [POST]
router.post('/induction/add', listInduction.addInduction);

// [GET]
router.get('/induction/get/:id', listInduction.getInduction);

// [PUT]
router.put('/induction/update/:id', listInduction.updateInduction);

// [DELELE]
router.delete('/induction/delete/:id', listInduction.deleteInduction);

router.get('/induction/getall', listInduction.getAllInduction);

module.exports = router;
