import * as _ from 'lodash';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css'

import Search from './containers/Search';
import BooksList from './components/BooksList';
import { APP_TITLE, BOOKSHELFS } from './constants';

import useCachedState from './hooks/useCachedState';

const BooksApp = () => {
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

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => (
            <BooksList
              { ...props }
              appTitle={APP_TITLE}
              currentlyReadingBooks={Object.values(currentlyReadingBooks)}
              wantToReadBooks={Object.values(wantToReadBooks)}
              readBooks={Object.values(readBooks)}
              onShelfChange={onShelfChange}
            />
          )} />
          <Route path="/search" render={(props) => (
            <Search 
              { ...props }
              getShelfNameForBook={getShelfNameForBook}
              onShelfChange={onShelfChange}
            />
          )} />
        </Switch>
      </Router>
    </div>
  )
}

export default BooksApp;
