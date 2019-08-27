import React from 'react';
import './index.css';


function DisplayItems(props) {
  return (
    <tr>
      <td>{props.product.title}</td>
      <td>{props.product.price}</td>
      <td>{props.product.description}</td>
      <td>{props.product.image_url}</td>
      <td>
        <button
          onClick={() => props.deleteProduct(props.product.product_id)}
          className="btn btn-danger">X</button>
      </td>
    </tr>
  );
}

export default DisplayItems;
