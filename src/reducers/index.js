import { BOOKS_LOADED, BOOKS_REQUESTED, BOOKS_ERROR, BOOK_ADDED_TO_CART, BOOK_INCREASE, BOOK_DECREASE, BOOK_DELETE } from '../actions/types'

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

const deleteCartItems = (cartItems, idx) => {

  return [
    ...cartItems.slice(0, idx),
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

const decreaseCartItem = (book, item = {}) => {

  const {
    id = book.id,
    count = 0,
    title = book.title,
    total = 0
  } = item;

  return {
    id,
    title,
    count: (count - 1) > 0 ? (count - 1) : 0,
    total: (total - book.price) > 0 ? (total - book.price) : 0
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

    case BOOK_INCREASE:
      const increaseBookId = action.payload;
      const increaseBook = state.books.find((book) => book.id === increaseBookId);
      const increaseitemIndex = state.cartItems.findIndex(({ id }) => id === increaseBookId);
      const increaseItem = state.cartItems[increaseitemIndex];

      const increaseNewItem = updateCartItem(increaseBook, increaseItem);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, increaseNewItem, increaseitemIndex)
      }

    case BOOK_DECREASE:
      const decreaseItemId = action.payload;
      const decreaseBook = state.books.find((book) => book.id === decreaseItemId);
      const decreaseItemIndex = state.cartItems.findIndex(({ id }) => id === decreaseItemId);
      const decreaseItem = state.cartItems[decreaseItemIndex];

      const decreaseNewItem = decreaseCartItem(decreaseBook, decreaseItem);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, decreaseNewItem, decreaseItemIndex)
      }

    case BOOK_DELETE:
      const deleteItemId = action.payload;
      // const deleteBook = state.books.find((book) => book.id === deleteItemId);
      const deleteItemIndex = state.cartItems.findIndex(({ id }) => id === deleteItemId);
      // const deleteItem = state.cartItems[deleteItemIndex];

      return {
        ...state,
        cartItems: deleteCartItems(state.cartItems, deleteItemIndex)
      }


    default:
      return state;
  }
}

export default reducer;