import React from 'react';

const SearchView = (props) => {
  return (
    <div>
        <form onSubmit={props.handleSubmit} id='search-form'>
          <input type='text'
                 placeholder='Address'
                 onChange={props.handleChange}
                 id='search-field' />
          <button type='submit' id='search-button'>Search</button>
        </form>
      </div>
  );
}

export default SearchView;
