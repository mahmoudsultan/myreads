import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';

import BookCard from './BookCard';

import { BOOKSHELFS } from '../constants';

describe('BookCard', () => {
  const mockBookId = '123';
  const mockBookTitle = 'Mock Book';
  const mockBookAuthor = 'Author';
  const mockBookThumbnail = 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api';

  it('renders the correct book title', () => {
    render(<BookCard
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);
    expect(screen.getByText(mockBookTitle)).toBeInTheDocument();
  });

  it('renders the correct author name', () => {
    render(<BookCard
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);
    expect(screen.getByText(mockBookAuthor)).toBeInTheDocument();
  });

  it('sets author name to unknown if not passed', () => {
    render(<BookCard
      id={mockBookId}
      title={mockBookTitle}
      cover={mockBookThumbnail}
    />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('sets author name to unknown if author is falsy', () => {
    render(<BookCard
      id={mockBookId}
      title={mockBookTitle}
      author={''}
      cover={mockBookThumbnail}
    />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders book thumbnail correctly', () => {
    render(<BookCard
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').style.backgroundImage).toEqual(`url(${mockBookThumbnail})`);
  });

  it('renders move to currently reading option', () => {
    render(<BookCard 
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);

    expect(screen.getByText('Currently Reading')).toBeInstanceOf(Option);
  });

  it('renders move to want to read option', () => {
    render(<BookCard 
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);

    expect(screen.getByText('Want to Read')).toBeInstanceOf(Option);
  });

  it('renders move to read option', () => {
    render(<BookCard 
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);

    expect(screen.getByText('Read')).toBeInstanceOf(Option);
  });

  it('renders move to none option', () => {
    render(<BookCard 
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
    />);

    expect(screen.getByText('None')).toBeInstanceOf(Option);
  });

  it('calls changeShelf with correct value on option click', () => {
    const mockChangeShelf = jest.fn();

    render(<BookCard
      id={mockBookId}
      title={mockBookTitle}
      author={mockBookAuthor}
      cover={mockBookThumbnail}
      onChangeShelf={mockChangeShelf}
    />);

    fireEvent.click(screen.getByText('Currently Reading'));
    expect(mockChangeShelf).toHaveBeenCalledWith(BOOKSHELFS.CURRENTLY_READING, mockBookId);

    fireEvent.click(screen.getByText('Want to Read'));
    expect(mockChangeShelf).toHaveBeenCalledWith(BOOKSHELFS.WANT_TO_READ, mockBookId);

    fireEvent.click(screen.getByText('Read'));
    expect(mockChangeShelf).toHaveBeenCalledWith(BOOKSHELFS.READ, mockBookId);

    fireEvent.click(screen.getByText('None'));
    expect(mockChangeShelf).toHaveBeenCalledWith(BOOKSHELFS.NONE, mockBookId);
  });
});
