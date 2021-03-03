import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { withBookstoreService } from '../HOC';
import { HomePage, CartPage } from '../Pages';
import ShopHeader from '../ShopHeader';

import './App.scss';

const App = ({ bookstoreService }) => {

  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={34} />
      <Switch>
        <Route path='/' component={HomePage} exact />

        <Route path='/cart' component={CartPage} />
      </Switch>
    </main>
  );
}

export default withBookstoreService()(App);
