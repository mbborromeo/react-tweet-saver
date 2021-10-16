import { useState, useCallback } from 'react';

const FormInput = ({ searchFunction }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if( keyword ){
        searchFunction( keyword );
        setKeyword(''); // reset field to empty      
      } else {
        return; // exit if field empty
      }
    },
    [keyword, searchFunction]
  );

  return (
    <form onSubmit={handleSubmit} className="top-wrapper">
      <input
        type="text"
        placeholder="Search Twitter"
        value={ keyword }
        onChange={ (e) => setKeyword(e.target.value) }
      />
      &nbsp;
      <button type="submit">Search</button>
    </form>
  );
};

export default FormInput;
