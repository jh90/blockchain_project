const BlockchainDAO = require('../services/blockchain_DAO.js');

class DataController {
  static getBalanceAndHistory (req, res) {
    console.log('controller');
    const address = req.query;
    console.log(address);
    BlockchainDAO.singleAddress(address).then((data) => {
      res.status(200).json(data);
      console.log('returned');
    });
  }
}

module.exports = DataController;
