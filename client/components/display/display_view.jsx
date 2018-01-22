import React from 'react';

const DisplayView = (props) => {
    return (
      <div>
        <h3>Balance: {props.balance}</h3>
        <ul>
          {
            props.transactions.map((tx) => {
              return (
                <li>{tx.time.toString()}</li>
              );
            })
          }
        </ul>
        <button onClick={props.seeMore}>See More</button>
      </div>
    );
}

export default DisplayView;
