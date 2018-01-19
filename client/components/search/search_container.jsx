import React from 'react';

import SearchView from './search_view.jsx';

export default class SearchContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      address: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    event.preventDefault();
    const input = event.target.value;
    this.setState({address: input});
  }

  handleSubmit () {
    this.props.handleSearch(this.state.address);
  }

  render () {
    return (
      <div>
        <input onChange={this.handleChange}></input>
        <p onClick={this.handleSubmit}>Submit</p>
      </div>
    );
  }
}
