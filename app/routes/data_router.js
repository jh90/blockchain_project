const express = require('express');
const BlockchainDAO = require('../services/blockchain_dao.js');

const router = express.Router();

router.get('/:address', BlockchainDAO.querySingleAddress);

module.exports = router;
