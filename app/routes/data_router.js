const express = require('express');
const request = require('superagent');

const getBalanceAndTransactions = function (req, res) {
    const { address, offset } = req.query;
    const URL = `http://blockchain.info/rawaddr/${address}?offset=${offset}`;
    request.get(URL)
           .then((response) => {
              const { final_balance, txs } = response.body;
              const addressData = { balance: final_balance, transactions: txs };
              res.status(200).send(addressData);
           });
}

const router = express.Router();

router.get('/', getBalanceAndTransactions);

module.exports = router;
