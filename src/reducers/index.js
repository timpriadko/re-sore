import { BOOKS_LOADED, BOOKS_REQUESTED, BOOKS_ERROR, BOOK_ADDED_TO_CART } from '../actions/types'

const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
}

const updateCartItems = (cartItems, item, idx) => {

  if (idx === -1) {
    return [
      ...cartItems,
      item
    ]
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]
}

const updateCartItem = (book, item = {}) => {

  const {
    id = book.id,
    count = 0,
    title = book.title,
    total = 0
  } = item;

  return {
    id,
    title,
    count: count + 1,
    total: total + book.price
  }
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case BOOKS_REQUESTED:
      return {
        ...state,
        book: [],
        loading: true,
        error: null
      }

    case BOOKS_LOADED:
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      }

    case BOOKS_ERROR:
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      }

    case BOOK_ADDED_TO_CART:
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      const itemIndex = state.cartItems.findIndex(({ id }) => id === bookId);
      const item = state.cartItems[itemIndex];

      const newItem = updateCartItem(book, item);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
      }

    default:
      return state;
  }
}

export default reducer;