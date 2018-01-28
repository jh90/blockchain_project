import React from 'react';
import request from 'superagent';
import moment from 'moment';
import DisplayView from './display_view.jsx';
import LoadingView from './loading_view.jsx';

export default class DisplayContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      balance: null,
      transactions: null,
      isLoading: true,
      pageCount: 1,
      descending: true,
      areMore: false,
    }
    this.getMoreTransactions = this.getMoreTransactions.bind(this);
    this.toggleTransactionOrder = this.toggleTransactionOrder.bind(this);
  }

  componentDidMount () {
    this.getBalanceAndTransactions(this.props.address);
    this.props.socket.onmessage = (data) => {
      this.handleNewTransaction(data);
    }
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

  cleanTransactionData (tx) {
    const parsedTime = moment.unix(tx.time);
    const displayTime = parsedTime.format("kk:mm:ss YYYY-MM-DD");
    let txDirection;
    let txValue;
    let txCounterparties;
    const inputs = tx.inputs.map((input) => {
      const btcValue = input.prev_out.value / 100000000;
      if (input.prev_out.addr == this.props.address) {
        txDirection = 'Sent';
        txValue = btcValue;
      }
      const cleanInput = input.prev_out.addr;
      return cleanInput;
    });
    const outputs = tx.out.map((output) => {
      const btcValue = output.value / 100000000;
      if (output.addr == this.props.address) {
        txDirection = 'Received';
        txValue = btcValue;
      }
      const cleanOutput = output.addr;
      return cleanOutput;
    });
    if (txDirection == 'Sent') {
      txCounterparties = outputs;
    }
    else {
      txCounterparties = inputs;
    }
    const cleanTx = {
      value: txValue,
      time: displayTime,
      direction: txDirection,
      counterparties: txCounterparties,
    };
    return cleanTx;
}

  getBalanceAndTransactions (address) {
    request.get(`/data?address=${address}&offset=0`)
           .then((response) => {
              const data = JSON.parse(response.text);
              const cleanTxs = data.transactions.map((tx) => {
                return this.cleanTransactionData(tx);
              });
              let showMore = false;
              if (data.totalTxs > 50) {
                showMore = true;
              }
              this.setState({
                balance: data.balance,
                transactions: cleanTxs,
                isLoading: false,
                areMore: showMore,
              });
              this.openChannel(address);
           });
  }

  getMoreTransactions () {
    const offset = this.state.pageCount * 50;
    const address = this.props.address;
    request.get(`/data?address=${address}&offset=${offset}`)
           .then((response) => {
              const data = JSON.parse(response.text);
              const cleanTxs = data.transactions.map((tx) => {
                return this.cleanTransactionData(tx);
              });
              let newTxs;
              if (this.state.descending) {
                newTxs = [].concat(this.state.transactions, cleanTxs);
              }
              else {
                newTxs = [].concat(cleanTxs, this.state.transactions);
              }
              const newPageCount = this.state.pageCount + 1;
              let showMore = false;
              if (data.totalTxs > (newPageCount * 50)) {
                showMore = true;
              }
              this.setState({
                transactions: newTxs,
                pageCount: newPageCount,
                areMore: showMore,
              });
           });
  }

  handleNewTransaction (tx) {
    const stateClone = Object.assign({}, this.state);
    const cleanTx = this.cleanTransactionData(tx);
    if (this.state.descending) {
      stateClone.transactions.unshift(cleanTx);
    }
    else {
      stateClone.transactions.push(cleanTx);
    }
    this.setState({ transactions: stateClone.transactions });
  }

  toggleTransactionOrder () {
    const stateClone = Object.assign({}, this.state);
    const reverseOrder = stateClone.transactions.reverse();
    const newOrder = !stateClone.descending;
    this.setState({
      transactions: reverseOrder,
      descending: newOrder,
    });
  }

  render () {
    const loading = this.state.isLoading;
    return (
      <div>
      {
        loading ? <LoadingView />
                : <DisplayView balance={this.state.balance}
                               transactions={this.state.transactions}
                               loadMore={this.getMoreTransactions}
                               descending={this.state.descending}
                               handleToggle={this.toggleTransactionOrder}
                               areMoreTxs={this.state.areMore}
                               search={this.props.search} />
      }
      </div>
    );
  }
}
