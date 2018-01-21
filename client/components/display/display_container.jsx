import React from 'react';
import request from 'superagent';
import DisplayView from './display_view.jsx';
import LoadingView from './loading_view.jsx';

export default class DisplayContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      addressData: null,
      isLoading: true,
    }
  }

  componentDidMount () {
    this.getBalanceAndTransactions(this.props.address);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.address !== this.props.address) {
      this.closeChannel(this.props.address);
      this.getBalanceAndTransactions(nextProps.address);
    }
  }

  openChannel (address) {
    const subscribeMessage = `{'op':'sub_addr', 'addr':'${address}'}`;
    this.props.socket.send(subscribeMessage);
  }

  closeChannel (address) {
    const unsubscribeMessage = `{'op':'unsub_addr', 'addr':'${address}'}`;
    this.props.socket.send(unsubscribeMessage);
  }

  getBalanceAndTransactions (address) {
    request.get(`/data?address=${address}`)
           .then((response) => {
              const data = JSON.parse(response.text);
              this.setState({
                addressData: data,
                isLoading: false,
              });
              this.openChannel(address);
           });
  }

  render () {
    const loading = this.state.isLoading;
    return (
      <div>
      {
        loading ? <LoadingView />
                : <DisplayView data={this.state.addressData} />
      }
      </div>
    );
  }
}
