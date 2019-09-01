import React from 'react';
import './index.css';


function CheckoutTable(props) {
  return (
    <table className="table-light table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Remove Product</th>
        </tr>
      </thead>

      <tbody>
        {
          props.cart &&
            props.cart.map( product =>
              <tr key={product.product_id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td><img src={product.image_url} alt="placeholder"/></td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => props.removeItem(product.product_id)}
                  >Remove from Cart</button>
                </td>
              </tr>
            )
        }
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="5"> <b>Total: </b> ${props.total}</td>
        </tr>
      </tfoot>

    </table>
  );
}


export default CheckoutTable;
