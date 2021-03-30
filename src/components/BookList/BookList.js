import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListItem from '../BookListItem';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import { withBookstoreService } from '../HOC';
import Spinner from '../Spinner/Spinner';
import ErrorIndicator from '../ErrorIndicator';

import './BookList.scss';

const BookList = ({ books, onAddedToCart }) => {

  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)}
              />
            </li>
          )
        })
      }
    </ul>
  )
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />
  }
};


const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error }
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  }
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
