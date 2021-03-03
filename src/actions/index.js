import { BOOKS_LOADED, BOOKS_REUESTED, BOOKS_ERROR } from './types'

const booksLoaded = (newBooks) => {
  return {
    type: BOOKS_LOADED,
    payload: newBooks
  }
}

const booksRequested = () => {
  return {
    type: BOOKS_REUESTED
  }
}

const booksError = (error) => {
  return {
    type: BOOKS_ERROR,
    payload: error
  }
}

export {
  booksLoaded,
  booksRequested,
  booksError
}