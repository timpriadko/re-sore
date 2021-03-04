import React from 'react';
import { connect } from 'react-redux';

import './ShoppingCartTable.scss';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {

  const renderRow = (item, idx) => {
    const { id, name, count, total } = item;

    return (
      <tr key={id}>

        <td>
          {idx + 1}
        </td>

        <td>
          {name}
        </td>

        <td>
          {count}
        </td>

        <td>
          {total}
        </td>

        <td>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o"></i>
          </button>
          <button
            onClick={() => onIncrease(id)}
            className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle"></i>
          </button>
          <button
            onClick={() => onDecrease(id)}
            className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle"></i>
          </button>
        </td>

      </tr>
    )
  };

  return (
    <div className="shopping-cart-table">

      <h2>Yout Order</h2>

      <table className="table">

        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {
            items.map((item, idx) => renderRow(item, idx))
          }

          {/* <tr>

            <td>
              1
            </td>

            <td>
              Site Reliability Endineering
            </td>

            <td>
              2
            </td>

            <td>
              $40
            </td>

            <td>
              <button className="btn btn-outline-danger btn-sm">
                <i className="fa fa-trash-o"></i>
              </button>
              <button className="btn btn-outline-success btn-sm">
                <i className="fa fa-plus-circle"></i>
              </button>
              <button className="btn btn-outline-warning btn-sm">
                <i className="fa fa-minus-circle"></i>
              </button>
            </td>

          </tr> */}

        </tbody>

      </table>

      <div className="total">
        Total: $201
      </div>

    </div>
  )
}

const mapStateToProps = ({ cartItems, orderTotal }) => {
  return {
    items: cartItems,
    total: orderTotal
  }
}

const mapDispatchToProps = () => {
  return {
    onIncrease: (id) => {
      console.log(`Increase ${id}`)
    },

    onDecrease: (id) => {
      console.log(`Decrease ${id}`)
    },

    onDelete: (id) => {
      console.log(`Delete ${id}`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)
