import React from 'react';

const Search = ({children, value, onChange}) => (
	<form>
    {children}<input type="text"
      onChange={onChange} 
      value={value}/>
  </form>
);

export default Search;



