import React from 'react';

const SearchView = (props) => {
  return (
    <div id='search-div'>
      <form><input onChange={this.props.handleChange}></input>
      <input type='submit' onClick={this.props.handleSubmit}/></form>
    </div>
  );
}

export default SearchView;
