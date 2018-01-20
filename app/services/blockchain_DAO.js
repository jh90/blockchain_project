const request = require('superagent');

class BlockchainDAO {
  static singleAddress ({ address }) {
    console.log('DAO');
    console.log(address);
    const apiURL = 'http://blockchain.info/rawaddr/';
    request.get(`${apiURL}${address}`)
           .then((response) => {
              console.log('API returned');
              console.log(response);
              const { final_balance, txs } = response.body;
              const addressData = { balance: final_balance, transactions: txs };
              return addressData;
           });
  }
}

module.exports = BlockchainDAO;
