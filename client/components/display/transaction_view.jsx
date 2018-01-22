import React from 'react';

const TransactionView = (props) => {
  return (
    <div>
      <h3>{props.tx.direction} {props.tx.value} {props.tx.time}</h3>
      <ul>
        {
          props.tx.counterparties.map((cp) => {
            return (
              <li>{cp}</li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default TransactionView;
