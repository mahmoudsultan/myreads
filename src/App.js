import * as _ from 'lodash';
import React, { useState } from 'react'

// import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './containers/Search';
import BooksList from './components/BooksList';
import { APP_TITLE, BOOKSHELFS } from './constants';

const BooksApp = () => {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState({
    'book-1': {
      id: 'book-1',
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
    },
    'book-2': {
      id: 'book-2',
      title: 'Ender\'s Game',
      authors: ['Orson Scott Card'],
      cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
    },
  });
  const [wantToReadBooks, setWantToReadBooks] = useState({
    'book-3': {
      id: 'book-3',
      title: '1776',
      authors: ['David McCullough'],
      cover: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
    },
    'book-4': {
      id: 'book-4',
      title: 'Harry Potter and the Sorcerer\'s Stone',
      authors: ['J.K. Rowling'],
      cover: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
    },
  });
  const [readBooks, setReadBooks] = useState({
    'book-5': {
      id: 'book-5',
      title: 'The Hobbit',
      authors: ['J.R.R. Tolkien'],
      cover: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
    },
    'book-6': {
      id: 'book-6',
      title: 'Oh, the Places You\'ll Go!',
      authors: ['Seuss'],
      cover: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
    },
    'book-7': {
      id: 'book-7',
      title: 'The Adventures of Tom Sawyer',
      authors: ['Mark Twain'],
      cover: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
    }
  });

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

export default BooksApp
