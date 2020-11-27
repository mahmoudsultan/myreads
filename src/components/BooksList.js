import PropTypes from 'prop-types';

import BookShelf from './BookShelf';
import { BOOKSHELFS } from '../constants';

const BooksList = ({ appTitle, onShelfChange, currentlyReadingBooks, wantToReadBooks, readBooks, onShowSearchPage }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{ appTitle }</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title='Currently Reading'
            shelfValue={BOOKSHELFS.CURRENTLY_READING}
            books={currentlyReadingBooks}
            onShelfChange={onShelfChange}
          />
          <BookShelf
            title='Want to Read'
            shelfValue={BOOKSHELFS.WANT_TO_READ}
            books={wantToReadBooks}
            onShelfChange={onShelfChange}
          />
          <BookShelf
            title='Read'
            shelfValue={BOOKSHELFS.READ}
            books={readBooks}
            onShelfChange={onShelfChange}
          />
        </div>
      </div>
      <div className="open-search">
        <button onClick={onShowSearchPage}>Add a book</button>
      </div>
    </div>
  )
}

const BookShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  cover: PropTypes.string,
}

BooksList.propTypes = {
  appTitle: PropTypes.string.isRequired,
  currentlyReadingBooks: PropTypes.arrayOf(PropTypes.shape(BookShape)),
  wantToReadBooks: PropTypes.arrayOf(PropTypes.shape(BookShape)),
  readBooks: PropTypes.arrayOf(PropTypes.shape(BookShape)),
  onShelfChange: PropTypes.func.isRequired,
  onShowSearchPage: PropTypes.func.isRequired, // TODO: Replace with react-router
}

export default BooksList;
