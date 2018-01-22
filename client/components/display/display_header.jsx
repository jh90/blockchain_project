import React from 'react';

const DisplayHeader = (props) => {
  const toggleText = props.descending ? 'Newest First' : 'Oldest First';
  return (
    <div>
      <div id='balance'>Balance:
        <span id='balance-text'>{props.balance} BTC</span>
      </div>
      <div id='txs-header'>Transactions
        <span id='toggle' onClick={props.handleToggle}>{toggleText}</span>
      </div>
    </div>
  );
}

export default DisplayHeader;
