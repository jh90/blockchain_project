import React from 'react';

export default class SearchView extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>
        <form><input onChange={this.props.handleChange}></input>
        <input type='submit' onClick={this.props.handleSubmit}/></form>
      </div>
    );
  }
}
