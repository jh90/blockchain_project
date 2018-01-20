import React from 'react';

export default class DisplayView extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>{this.props.balance}</div>
    );
  }
}
