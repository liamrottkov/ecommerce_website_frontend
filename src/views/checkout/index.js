import React, { Component } from 'react';
import './index.css';
import CheckoutTable from '../../components/checkoutTable';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from '../../components/checkoutForm';


class Checkout extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1>Checkout</h1>
            <CheckoutTable
              cart={this.props.cart}
              removeItem={this.props.removeItem}
              total={this.props.total}
            />
            <Elements>
              <CheckoutForm
              total={this.props.total}
              />
            </Elements>
          </div> {/*ends col */}
        </div> {/*ends row */}
      </div>
    );
  }
}

export default Checkout;
