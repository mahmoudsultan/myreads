import * as _ from 'lodash';
import React, { useState, useEffect } from 'react'

import './App.css'

import Search from './containers/Search';
import BooksList from './components/BooksList';
import { APP_TITLE, BOOKSHELFS } from './constants';

const useCachedState = (cacheKey, initialValue={}) => {
  const cachedValue = localStorage.getItem(cacheKey);
  const [state, setState] = useState(cachedValue ? JSON.parse(cachedValue) : initialValue);

  useEffect(() => {
    localStorage.setItem(cacheKey, JSON.stringify(state));
  }, [cacheKey, state]);

  return [state, setState];
};

const BooksApp = () => {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useCachedState('currentlyReading', {});
  const [wantToReadBooks, setWantToReadBooks] = useCachedState('wantToRead', {});
  const [readBooks, setReadBooks] = useCachedState('readBooks', {});

  const getBook = (shelf, bookId) => {
    const [state] = stateHookFromShelfName(shelf);
    return state[bookId];
  }

  const getShelfNameForBook = (book) => {
    if (currentlyReadingBooks[book.id]) {
      return BOOKSHELFS.CURRENTLY_READING;
    } else if (wantToReadBooks[book.id]) {
      return BOOKSHELFS.WANT_TO_READ;
    } else if (readBooks[book.id]) {
      return BOOKSHELFS.READ;
    } else {
      return BOOKSHELFS.NONE;
    }
  }

  const stateHookFromShelfName = (shelf) => {
    switch(shelf) {
      case BOOKSHELFS.CURRENTLY_READING:
        return [currentlyReadingBooks, setCurrentlyReadingBooks];
      case BOOKSHELFS.WANT_TO_READ:
        return [wantToReadBooks, setWantToReadBooks];
      case BOOKSHELFS.READ:
        return [readBooks, setReadBooks];
      default:
        throw new Error('Undefined Shelf.');
    }
  }

  const removeBookFromShelf = (shelf, book) => {
    const [shelfState, setShelfState] = stateHookFromShelfName(shelf);
    return setShelfState({
      ..._.omit(shelfState, book.id),
    });
  }

  const addBookToSelf = (shelf, book) => {
    const [shelfState, setShelfState] = stateHookFromShelfName(shelf);
    return setShelfState({
      ...shelfState,
      [book.id]: book,
    });
  }

  const onShelfChange = (oldShelf, newShelf, book) => {
    let bookMoved = book;

    if (_.isString(book)) {
      bookMoved = getBook(oldShelf, book);
    }

    if (oldShelf !== BOOKSHELFS.NONE) {
      removeBookFromShelf(oldShelf, bookMoved);
    }

    if (newShelf !== BOOKSHELFS.NONE) {
      addBookToSelf(newShelf, bookMoved);
    }
  }

  const onShowBooksShelvesPage  = () => {
    setShowSearchPage(false);
  }

  const onShowSearchPage = () => {
    setShowSearchPage(true);
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <Search 
          getShelfNameForBook={getShelfNameForBook}
          onShelfChange={onShelfChange}
          onShowBooksShelvesPage={onShowBooksShelvesPage}
        />
      ) : (
        <BooksList
          appTitle={APP_TITLE}
          currentlyReadingBooks={Object.values(currentlyReadingBooks)}
          wantToReadBooks={Object.values(wantToReadBooks)}
          readBooks={Object.values(readBooks)}
          onShelfChange={onShelfChange}
          onShowSearchPage={onShowSearchPage}
        />
      )}
    </div>
  )
}

export default BooksApp;
