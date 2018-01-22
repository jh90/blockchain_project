import React from 'react';
import SearchView from './search_view.jsx';

export default class SearchContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const input = event.target.value;
    this.setState({query: input});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.handleSearch(this.state.query);
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Address' onChange={this.handleChange} />
          <button type='submit'>Search</button>
        </form>
      </div>
    );
  }
}
