import React from 'react';

const DisplayContainer = (props) => {
  if (props.loading) {
    return <div>LOADING</div>;
  }
  else {
    return <div>{props.data.balance}</div>;
  }
}

export default DisplayContainer;
