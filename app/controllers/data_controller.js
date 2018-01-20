const BlockchainDAO = require('../services/blockchain_DAO.js');

class DataController {
  static getBalanceAndHistory (req, res) {
    const bitcoinAddress = req.params.address;
    BlockchainDAO.singleAddress({ bitcoinAddress }).then((data) => {
      res.status(200).json(data);
    });
  }
}

module.exports = DataController;
