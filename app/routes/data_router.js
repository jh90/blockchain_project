const express = require('express');
const dataController = require('../controllers/data_controller.js');

const router = express.Router();

router.get('/', dataController.getBalanceAndHistory);
console.log('hit');

module.exports = router;
