import React from 'react';
import './index.css';
import DisplayItems from '../displayItems'


function GetProductsTable(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Delete Product</th>
        </tr>
      </thead>

      <tbody>
        { props.products &&
            props.products.map( product =>
              <DisplayItems
                product={product}
                key={product.product_id}
                deleteProduct={props.deleteProduct}
              />
            )
        }
      </tbody>
    </table>
  );
}

export default GetProductsTable;
