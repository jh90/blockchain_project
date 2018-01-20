import React from 'react';

export default class DisplayView extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>
        <div>{this.props.balance}</div>
        <ul>
        {
          this.props.transactions.map((tx) => {
            return (<li>{tx}</li>);
          })
        }
        </ul>
      </div>
    );
  }
}
