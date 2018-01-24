import React from 'react';
import SearchContainer from './search/search_container.jsx';
import DisplayContainer from './display/display_container.jsx';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      showDisplay: false,
      websocket: null,
      address: null,
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
  }

  handleSearch (bitcoinAddress) {
    this.setState({ address: bitcoinAddress, showDisplay: true });
  }

  render () {
    const display = this.state.showDisplay;
    return (
      <div>
        <SearchContainer handleSearch={this.handleSearch} />
        {
          display ? <DisplayContainer address={this.state.address}
                                      socket={this.state.websocket}
                                      search={this.handleSearch} />
                  : false
        }
      </div>
    );
  }
}
