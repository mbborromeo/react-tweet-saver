import { useState, useCallback } from 'react';

const FormInput = ({ searchFunction }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if( keyword ){
      searchFunction( keyword );
      setKeyword(''); // reset field to empty      
    } else {
      return; // exit if field empty
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Twitter"
        value={ keyword }
        onChange={ (e) => setKeyword(e.target.value) }
      />
      &nbsp;
      <button type="submit">Search</button>
      {/* <input
        type="button"
        value="Clear"
        onClick={() => setKeyword('')}
      /> */}
    </form>
  );
};

export default FormInput;
