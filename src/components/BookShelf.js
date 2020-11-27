import PropTypes from 'prop-types';
import BookCard from './BookCard';

const BookShelf = ({ title, shelfValue, books, onShelfChange }) => {
  return (
    <div className="bookshelf">
      { title && <h2 className="bookshelf-title">{title}</h2> }
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map(book => {
              return (
                <li key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    cover={book.cover}
                    currentShelf={shelfValue}
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

BookShelf.propTypes = {
  title: PropTypes.string,
  shelfValue: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    cover: PropTypes.string,
  })),
  onShelfChange: PropTypes.func.isRequired,
};

export default BookShelf;
