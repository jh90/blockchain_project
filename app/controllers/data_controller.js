const BlockchainDAO = require('../services/blockchain_DAO.js');

class DataController {
  static getBalanceAndHistory (req, res) {
    const { address } = req.query;
    BlockchainDAO.singleAddress(address)
                 .then((data) => {
                    console.log(data.balance);
                    res.status(200).json(data);
                 });
  }
}

module.exports = DataController;
