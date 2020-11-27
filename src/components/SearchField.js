import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const SearchField = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.length >= 3) {
      onSearchTermChange(searchTerm)
    }
  }, [searchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="text"
      placeholder="Search by title or author"/>
  );
};

SearchField.propTypes = {
  onSearchTermChange: PropTypes.func.isRequired,
}

export default SearchField;
