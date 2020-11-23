import PropTypes from 'prop-types';
import { BOOKSHELFS } from '../constants';

const UNKNOWN_AUTHOR_NAME = 'Unknown';

const BookCard = ({ id, title, author, cover, onChangeShelf }) => {
  return (
    <div role="gridcell" className="book">
      <div className="book-top">
        <div className="book-shelf-changer">
          <select>
            <option value="move" disabled>Move to...</option>
            <option 
              onClick={() => onChangeShelf(BOOKSHELFS.CURRENTLY_READING, id)}
              value="currentlyReading"
            >
              Currently Reading
            </option>

            <option
              onClick={() => onChangeShelf(BOOKSHELFS.WANT_TO_READ, id)}
              value="wantToRead"
            >
              Want to Read
            </option>

            <option onClick={() => onChangeShelf(BOOKSHELFS.READ, id)}
              value="read"
            >
              Read
            </option>

            <option onClick={() => onChangeShelf(BOOKSHELFS.NONE, id)}
              value="none"
            >
              None
            </option>
          </select>
        </div>
        <div role="img" className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}></div>
      </div>

      <h1 role="heading" className="book-title">{ title }</h1>
      <p className="book-author">{ author || UNKNOWN_AUTHOR_NAME }</p>
    </div>
  );
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  cover: PropTypes.string,
  onChangeShelf: PropTypes.func,

};

BookCard.defaultProps = {
  author: UNKNOWN_AUTHOR_NAME,
};

export default BookCard;
