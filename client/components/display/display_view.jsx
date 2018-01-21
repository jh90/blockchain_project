import React from 'react';

const DisplayView = (props) => {
    return (
      <div>
        {props.balance}
        <ul>
          {
            props.transactions.map((tx) => {
              return (
                <li>{tx.time}</li>
              );
            })
          }
        </ul>
        <button onClick={props.seeMore}>See More</button>
      </div>
    );
}

export default DisplayView;
