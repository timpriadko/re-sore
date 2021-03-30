import { BOOKS_LOADED, BOOKS_REQUESTED, BOOKS_ERROR, BOOK_ADDED_TO_CART, BOOK_INCREASE, BOOK_DECREASE, BOOK_DELETE } from './types'

const booksLoaded = (newBooks) => {
  return {
    type: BOOKS_LOADED,
    payload: newBooks
  }
}

const booksRequested = () => {
  return {
    type: BOOKS_REQUESTED
  }
}

const booksError = (error) => {
  return {
    type: BOOKS_ERROR,
    payload: error
  }
}

const bookAddedToCart = (bookId) => {
  return {
    type: BOOK_ADDED_TO_CART,
    payload: bookId
  }
}

const onIncreaseBooks = (bookId) => {
  return {
    type: BOOK_INCREASE,
    payload: bookId
  }
}

const onDecreaseBooks = (bookId) => {
  return {
    type: BOOK_DECREASE,
    payload: bookId
  }
}

const onDeleteBooks = (bookId) => {
  return {
    type: BOOK_DELETE,
    payload: bookId
  }
}

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
}

export {
  fetchBooks,
  bookAddedToCart,
  onIncreaseBooks,
  onDecreaseBooks,
  onDeleteBooks
}