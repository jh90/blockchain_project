import React from 'react';

export default class DisplayContainer extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const loading = this.props.isLoading;
    const balance = this.props.balance;
    const transactions = this.props.transactions;
    console.log(loading);
    console.log(balance);
    if (transactions.length > 1) {
      console.log('display has transactions');
    }
    return (
      <ul>
        <li>{loading}</li>
        <li>{balance}</li>
      </ul>
    );
  }
}
