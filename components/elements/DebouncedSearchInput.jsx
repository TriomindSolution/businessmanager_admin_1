// DebouncedSearchInput.js

import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const DebouncedSearchInput = ({ setSearch }) => {
  // Local state for the search input value
  const [searchValue, setSearchValue] = useState('');

  // Define the debounced search function
  const debounceSearch = useCallback(
    debounce((value) => {
      // Update the state directly
      setSearch(value);
      // Additional logic...
    }, 500),
    [setSearch]
  );

  // Handle search changes
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    debounceSearch(value);
  };

  return (

   
    <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 text-sm"
        value={searchValue}
        onChange={handleSearchChange}
    />

  );
};

export default DebouncedSearchInput;
