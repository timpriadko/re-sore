import React from 'react';
import { Link } from 'react-router-dom';

import './ShopHeader.scss';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">

      <Link to="/">
        <h1 className="logo text-dark">ReStore</h1>
      </Link>

      <Link to="/cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {`${numItems} items (${total})`}
      </Link>

    </header>
  )
}

export default ShopHeader
