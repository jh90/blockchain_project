import React from 'react';
import LoadingView from './loading_view.jsx';

const DisplayView = function (props) {
  if (props.loading) {
    return <LoadingView />;
  }
  else {
    return <div>{props.balance}</div>
  }
}

export default DisplayView;
