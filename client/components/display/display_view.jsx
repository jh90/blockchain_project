import React from 'react';
import TransactionView from './transaction_view.jsx';

const DisplayView = (props) => {
    return (
      <div id='display'>
        <div id='balance'>Balance: {props.balance}</div>
        {
          props.transactions.map((tx) => {
            return (
              <TransactionView tx={tx} />
            );
          })
        }
        <button id='more' onClick={props.seeMore}>See More</button>
      </div>
    );
}

export default DisplayView;
