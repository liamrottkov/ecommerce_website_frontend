import React from 'react';
import './index.css';


function ProductsCart(props) {
  return (
    <table className="table-light table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
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
    </table>
  );
}


export default ProductsCart;
