console.log('router');
const express = require('express');
const dataController = require('../controllers/data_controller.js');

const router = express.Router();

router.get('/:address', dataController.getBalanceAndHistory);

module.exports = router;
