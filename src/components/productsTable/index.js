import React from 'react';
import './index.css';

function ProductsTable(props) {
  return (
    <div className="row">
      {
        props.products &&
          props.products.map( product =>
            <div key={product.product_id} className="card col-md-3">
              <img className="card-img-top" src={product.image_url} alt="Card" />
                <h4 className="card-title">{product.title}</h4>
                <p className="card-text">${product.price}</p>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-success"
                onClick={() => props.addItem(product.product_id)}
                >Add to Cart</button>
            </div>
            )
        }
    </div>
  );
}

export default ProductsTable;

// code for table version is below

// function ProductsTable(props) {
//   return (
//     <table className="table-dark table">
//       <thead>
//         <tr>
//           <th>Product ID</th>
//           <th>Title</th>
//           <th>Price</th>
//           <th>Description</th>
//           <th>Image</th>
//           <th>Add Product</th>
//         </tr>
//       </thead>
//
//       <tbody>
//         {
//           props.products &&
//             props.products.map( product =>
//               <tr key={product.product_id}>
//                 <td>#{product.product_id}</td>
//                 <td>{product.title}</td>
//                 <td>${product.price}</td>
//                 <td>{product.description}</td>
//                 <td><img src={product.image_url} alt="placeholder"/></td>
//                 <td>
//                   <button className="btn btn-success"
//                   onClick={() => props.addItem(product.product_id)}
//                   >Add to Cart</button>
//                 </td>
//               </tr>
//             )
//         }
//       </tbody>
//     </table>
//   );
// }
