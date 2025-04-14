import React, { useState } from 'react';
import '../app/styles/components/Input.css';
import { IoSearchSharp } from "react-icons/io5";

const Input = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${query}`;
    }
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='field_input'>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={handleKeyDown}        
      />
      <IoSearchSharp className='search' onClick={handleSearch} />
    </div>
  );
};

export default Input;
