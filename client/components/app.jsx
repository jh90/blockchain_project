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
      isLoading: false,
      socketOpen: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getBalanceAndTransactions = this.getBalanceAndTransactions.bind(this);
    this.openWebSocket = this.openWebSocket.bind(this);
  }

  openWebSocket (address) {
    console.log(this.state.balance);
    const connection = new WebSocket('wss://ws.blockchain.info/inv');
    connection.onopen = () => {
      console.log('open');
      const openChannelMessage = {'op': 'addr_sub', 'addr': address};
      connection.send(JSON.stringify(openChannelMessage));
    };
    connection.onclose = () => {
      console.log('closed');
    }
    connection.onerror = (error) => {
      console.log(`error: ${error}`);
    };
    connection.onmessage = (message) => {
      console.log(message);
    }
  }

  getBalanceAndTransactions (address) {
    request.get(`/data?address=${address}`)
           .then((response) => {
              console.log(response);
              const cleanData = JSON.parse(response.text);
              console.log(cleanData);
              this.setState({
                balance: cleanData.balance,
                transactions: cleanData.transactions,
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
