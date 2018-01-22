import React from 'react';
import DisplayHeader from './display_header.jsx'
import TransactionView from './transaction_view.jsx';

const DisplayView = (props) => {
    const showMoreButton = props.areMoreTxs;
    return (
      <div id='display'>
        <DisplayHeader balance={props.balance}
                       descending={props.descending}
                       handleToggle={props.handleToggle} />
        {
          props.transactions.map((tx) => {
            return (
              <TransactionView tx={tx} />
            );
          })
        }
        {
          showMoreButton ? <button onClick={props.loadMore}>See More</button>
                 : false
        }
      </div>
    );
}

export default DisplayView;
