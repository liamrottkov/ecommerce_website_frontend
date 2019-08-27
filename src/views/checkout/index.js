import React, { Component } from 'react';
import './index.css';
import CheckoutTable from '../../components/checkoutTable';

class Checkout extends Component {

  getCart = async(e) => {

    let URL = 'http://localhost:5000/api/retrieve/cart';

    let response = await fetch(URL);

    let data = await response.json();

    // console.log(data)
    this.setState({ cart:data.cart })
  }

   // componentDidMount() {
   //   this.getCart();
   // }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1>Checkout</h1>
            <CheckoutTable
              cart={this.props.cart}
              removeItem={this.props.removeItem}
            />
          </div> {/*ends col */}
        </div> {/*ends row */}
      </div>
    );
  }
}

export default Checkout;
