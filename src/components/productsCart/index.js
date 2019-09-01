import React from 'react';
import './index.css';


function ProductsCart(props) {
  return (
    <table className="table-light table">
      <thead>
        <tr>
          <th>Title</th>
        {/* <th>Quantity</th> */}
          <th>Price</th>
          <th>Remove Product</th>
        </tr>
      </thead>

      <tbody>
        {
          props.cart &&
            props.cart.map( (product, index) =>
              <tr key={index}>
                <td>{product.title}</td>
                {/* <td>Quantity</td> */}
                <td>${product.price}</td>
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
          <td colSpan="4"><b>Total: </b> ${props.total}</td>
        </tr>
      </tfoot>

    </table>
  );
}


export default ProductsCart;
