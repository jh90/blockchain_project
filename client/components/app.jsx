import React from 'react';
import request from 'superagent';
import SearchContainer from './search/search_container.jsx';
import DisplayContainer from './display/display_container.jsx';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      websocket: null,
      address: null,
      addressData: null,
      showDisplay: false,
      isLoading: false,
      channelOpen: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount () {
    this.openSocket();
  }

  openSocket() {
    const btcWebsocketURL = 'wss://ws.blockchain.info/inv';
    const connection = new WebSocket(btcWebsocketURL);
    connection.onopen = () => {
      this.setState({ websocket: connection });
      console.log('socket open');
    }
    connection.onclose = () => {
      console.log('socket closed');
    }
    connection.onerror = (error) => {
      console.log(`ERROR: ${error}`);
    }
    connection.onmessage = () => {
      this.getBalanceAndTransactions(this.state.address);
    }
  }

  openChannel (address) {
    const subscribeMessage = `{'op':'sub_addr', 'addr':'${address}'}`;
    this.state.websocket.send(subscribeMessage);
    this.setState({ channelOpen: true });
  }

  closeChannel () {
    const unsubscribeMessage = `{'op':'unsub_addr', 'addr':'${this.state.address}'}`;
    this.state.websocket.send(unsubscribeMessage);
  }

  getBalanceAndTransactions (bitcoinAddress) {
    request.get(`/data?address=${bitcoinAddress}`)
           .then((response) => {
              const data = JSON.parse(response.text);
              this.setState({
                address: bitcoinAddress,
                addressData: data,
                isLoading: false,
              });
              this.openChannel(bitcoinAddress);
           });
  }

  handleSearch (address) {
    if (this.state.channelOpen) {
      this.closeChannel();
    }
    this.setState({ showDisplay: true, isLoading: true });
    this.getBalanceAndTransactions(address);
  }

  render () {
    const display = this.state.showDisplay;
    return (
      <div>
        <SearchContainer handleSearch={this.handleSearch} />
        {
          display ? <DisplayContainer data={this.state.addressData}
                                      loading={this.state.isLoading} />
                  : false
        }
      </div>
    );
  }
}
