const express = require('express');
const request = require('superagent');

//convert times and values, clean up variable names
const cleanTransactionData = function (tx) {
  const convertedTime = tx.time;
  const cleaninputs = tx.inputs.map((input) => {
    if (input.address = tx.address) {
      const txdirection = 'Sent';
    }
    const cleaninput = { address: input.address, value: input.value };
    return cleaninput;
  });
  const cleanoutputs = tx.outputs.map((output) => {
    if (output.address = tx.address) {
      const txdirection = 'Received';
    }
    const cleanoutput = { address: output.address, value: output.value };
    return cleanoutput;
  });
  const cleantx = {
    inputs: cleaninputs,
    outputs: cleanoutputs,
    time: convertedTime,
    direction: txdirection
  };
  return cleantx;
}

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
