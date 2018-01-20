import React from 'react';
import request from 'superagent';

import SearchContainer from './search/search_container.jsx';
import DisplayContainer from './display/display_container.jsx';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      balance: '',
      transactions: [],
      isLoading: null,
      socketOpen: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getBalanceAndTransactions = this.getBalanceAndTransactions.bind(this);
  }

  openWebSocket (address) {
    console.log(address);
  }

  getBalanceAndTransactions (address) {
    const URL = 'https://blockchain.info/rawaddr/' + address + '&cors=true';
    console.log(URL);
    request.get(URL)
           .then((response) => {
              const {final_balance, txs} = response.body;
              this.setState({
                balance: final_balance,
                transactions: txs,
                isLoading: false,
              });
              this.openWebSocket(address);
           });
  }

  handleSearch (address) {
    this.setState({isLoading: true});
    this.getBalanceAndTransactions(address);
  }

  render () {
    return (
      <div>
        <SearchContainer handleSearch={this.handleSearch} />
        <DisplayContainer isLoading={this.state.isLoading}
                          balance={this.state.balance}
                          transactions={this.state.transactions} />
      </div>
    );
  }
}