import React from 'react';
import TransactionView from './transaction_view.jsx';

const DisplayView = (props) => {
    return (
      <div>
        <h3>Balance: {props.balance}</h3>
        {
          props.transactions.map((tx) => {
            return (
              <TransactionView tx={tx} />
            );
          })
        }
        <button onClick={props.seeMore}>See More</button>
      </div>
    );
}

export default DisplayView;
