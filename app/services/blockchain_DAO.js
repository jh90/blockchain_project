const request = require('superagent');

class BlockchainDAO {
  static singleAddress ({ address }) {
    const apiURL = 'http://blockchain.info/rawaddr/';
    request.get('${apiURL}${address}')
           .then((response) => {
              const { final_balance, txs } = response.body;
              const addressData = { balance: final_balance, transactions: txs };
              return addressData;
           });
  }
}

module.exports = BlockchainDAO;
