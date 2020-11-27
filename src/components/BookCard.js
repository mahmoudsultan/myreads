import PropTypes from 'prop-types';
import { BOOKSHELFS } from '../constants';

const UNKNOWN_AUTHOR_NAME = 'Unknown';

const BookCard = ({ id, title, author, currentShelf, cover, onChangeShelf }) => {
  return (
    <div role="gridcell" className="book">
      <div className="book-top">
        <div role="img" className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={currentShelf} onChange={(e) => onChangeShelf(e.target.value, id)}>
            <option value="move" disabled>Move to...</option>
            <option
              value={BOOKSHELFS.CURRENTLY_READING}
            >
              Currently Reading
            </option>

            <option
              value={BOOKSHELFS.WANT_TO_READ}
            >
              Want to Read
            </option>

            <option 
              value={BOOKSHELFS.READ}
            >
              Read
            </option>

            <option 
              value={BOOKSHELFS.NONE}
            >
              None
            </option>
          </select>
        </div>
      </div>
      <div role="heading" className="book-title">{ title }</div>
      <div className="book-authors">{ author || UNKNOWN_AUTHOR_NAME }</div>
    </div>
  );
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  cover: PropTypes.string,
  currentShelf: PropTypes.string,
  onChangeShelf: PropTypes.func,

};

BookCard.defaultProps = {
  author: UNKNOWN_AUTHOR_NAME,
};

export default BookCard;
