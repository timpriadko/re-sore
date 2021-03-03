import React from 'react';
import { BookstoreServiceConsumer } from '../BookstoreServiceContext';

const withBookstoreService = () => (Wrapped) => (

  (props) => (
    <BookstoreServiceConsumer>
      {
        (bookstoreService) => (
          <Wrapped
            {...props}
            bookstoreService={bookstoreService}
          />
        )
      }
    </BookstoreServiceConsumer>
  )
);

export default withBookstoreService;
