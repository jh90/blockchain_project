import React from 'react';
import DisplayView from './display_view.jsx';
import LoadingView from './loading_view.jsx';

export default class DisplayContainer extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    const loading = this.props.isLoading;
    const balance = this.props.balance;
    return (
      <div>
        {loading ? <LoadingView /> :
                   <DisplayView balance={this.props.balance} />}
      </div>
    );
  }
}
