const BlockchainDAO = require('../services/blockchain_DAO.js');

class DataController {
  static getBalanceAndHistory (req, res) {
    const address = req.query;
    BlockchainDAO.singleAddress(address).then((data) => {
      res.status(200).json(data);
    });
  }
}

module.exports = DataController;
