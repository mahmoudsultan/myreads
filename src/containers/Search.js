import PropTypes from 'prop-types';
import { useState } from 'react';

import * as _ from 'lodash';

import * as BookAPI from '../BooksAPI';

import BookCard from '../components/BookCard';
import SearchField from '../components/SearchField';

const Search = ({ getShelfNameForBook, onShelfChange, onShowBooksShelvesPage }) => {
  const [searchResults, setSearchResults] = useState([]);

  const onShelfChangeWithBookObject = (oldShelf, newShelf, bookId) => {
    const book = _.find(searchResults, (book) => book.id === bookId);
    onShelfChange(oldShelf, newShelf, book);
  };

  const formatBook = (bookFromAPI) => {
    return {
      ..._.pick(bookFromAPI, ['title', 'authors', 'id']),
      cover: bookFromAPI.imageLinks.smallThumbnail,
    };
  };

  const onSearchTermChange = async (searchTerm) => {
    let results = [];
    results = await BookAPI.search(searchTerm);
    if (results.error) {
      setSearchResults([]);
    } else {
      setSearchResults(results.map(formatBook));
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={onShowBooksShelvesPage}>Close</button>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <SearchField
            onSearchTermChange={onSearchTermChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { searchResults.length && searchResults.map(book => {
              return (
                <li key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    cover={book.cover}
                    currentShelf={getShelfNameForBook(book)}
                    onChangeShelf={onShelfChangeWithBookObject}
                  />
                </li>
              );
          }) }
        </ol>
      </div>
    </div> 
  );
};

Search.propTypes = {
  getShelfNameForBook: PropTypes.func.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  onShowBooksShelvesPage: PropTypes.func.isRequired,
};

export default Search;
