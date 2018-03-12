import React from 'react';

const Search = ({children, value, onChange, onSubmit}) => (
	<form onSubmit={onSubmit}>
    <input type="text"
      onChange={onChange} 
      value={value}/>
    <button type="submit">
    	{children}
    </button>
  </form>
);

export default Search;



