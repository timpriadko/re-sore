import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListItem from '../BookListItem';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';
import { withBookstoreService } from '../HOC';
import Spinner from '../Spinner/Spinner';
import ErrorIndicator from '../ErrorIndicator';

import './BookList.scss';

class BookList extends Component {

  componentDidMount() {
    // const {
    //   bookstoreService,
    //   booksLoaded,
    //   booksRequested,
    //   booksError
    // } = this.props;

    // booksRequested();
    // bookstoreService.getBooks()
    //   .then((data) => booksLoaded(data))
    //   .catch((err) => booksError(err));
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return (
      <ul className="book-list">
        {
          books.map((book) => {
            return (
              <li key={book.id}>
                <BookListItem book={book} />
              </li>
            )
          })
        }
      </ul>
    )
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error }
}

// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError
// };
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;

  return {
    fetchBooks: () => {

      dispatch(booksRequested());
      bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
    }
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
