import PropTypes from 'prop-types';

import { useState } from 'react';

import BookCard from '../components/BookCard';

const Search = ({ getShelfNameForBook, onShelfChange, onShowBooksShelvesPage }) => {
  const [searchResults, setSearchResults] = useState([
    {
      id: 'book-7',
      title: 'The Adventures of Tom Sawyer',
      author: 'Mark Twain',
      cover: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
    }
  ]);

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
          <input type="text" placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { searchResults.map(book => {
              return (
                <li key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    cover={book.cover}
                    currentShelf={getShelfNameForBook(book)}
                    onChangeShelf={onShelfChange}
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
