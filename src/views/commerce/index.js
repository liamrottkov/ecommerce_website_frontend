import React, { Component } from 'react';
import './index.css';
import ProductsTable from '../../components/productsTable';
import ProductsCart from '../../components/productsCart';


class Commerce extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1>Company Products</h1>
            <ProductsTable
              products={this.props.products}
              addItem={this.props.addItem}
            />
          </div>
          <div className="col-md-4">
            <h1>Shopping Cart</h1>
            <ProductsCart
              cart={this.props.cart}
              removeItem={this.props.removeItem}
            />
          </div> {/* ends col 1*/}
        </div> {/*ends row */}
      </div>
    );
  }
}

export default Commerce;
