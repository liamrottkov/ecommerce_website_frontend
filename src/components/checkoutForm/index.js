import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './index.css';


class CheckoutForm extends React.Component {
  constructor() {
    super();

    this.state = {
      completed: false,
      name: '',
      email: '',
      street: '',
      city: '',
      state: '',
      country: '',
    }
  }

  convertToPennies = () => {
    let total = this.props.total;
    total *= 100;
    total = Math.floor(total);
    return total;
  }

  handleSubmit = async(e) => {
    let { token } = await this.props.stripe.createToken({
      email:this.state.email,
      name:this.state.name,
      address_city:this.state.city,
      address_line1:this.state.street,
      address_state:this.state.state,
      address_country:this.state.country
      });

    let total = this.convertToPennies();
    let email = this.state.email
    let name = this.state.name
    let city = this.state.city
    let street = this.state.street
    let state = this.state.state
    let country = this.state.country


    let URL = 'http://localhost:5000/api/payment';

    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "token" : token.id,
        "email" : email,
        "amount" : total,
        "name": name,
        "street": street,
        "city": city,
        "state": state,
        "country": country,
      }
    });

    let data = await response.json();

    if (data.message === 'success') {
      this.setState({ completed : true });
    }
  }

  render() {
    if (this.state.completed) return <h2 className="center">Purchase Complete. Your products will be delivered ASAP!</h2>
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div>
              <p className="checkout"><b>Please enter your Credit Card and Shipping information below:</b></p>
              <div className="form-group creditcard">
                <CardElement />
              </div>
              <div className="form-group">
            {/* <label><b>Email:</b></label> */}
                <input value={this.state.email} onChange={(e) => this.setState({ 'email' : e.target.value })} type="text" className="form-control" name="email" placeholder="Email"/>
              </div>
              <div className="form-group">
                {/* <label><b>Name:</b></label> */}
                <input value={this.state.name} onChange={(e) => this.setState({ 'name' : e.target.value })} type="text" className="form-control" name="name" placeholder="Name"/>
              </div>
              <div className="form-group">
                {/* <label><b>Street Address:</b></label> */}
                <input value={this.state.street} onChange={(e) => this.setState({ 'street' : e.target.value })} type="text" className="form-control" name="street" placeholder="Street Address"/>
              </div>
              <div className="form-group">
                {/* <label><b>City:</b></label> */}
                <input value={this.state.city} onChange={(e) => this.setState({ 'city' : e.target.value })} type="text" className="form-control" name="city" placeholder="City"/>
              </div>
              <div className="form-group">
                {/* <label><b>State:</b></label> */}
                <input value={this.state.state} onChange={(e) => this.setState({ 'state' : e.target.value })} type="text" className="form-control" name="state" placeholder="State"/>
              </div>
              <div className="form-group">
                {/* <label><b>Zip Code:</b></label> */}
                <input value={this.state.country} onChange={(e) => this.setState({ 'country' : e.target.value })} type="text" className="form-control" name="country" placeholder="Country"/>
              </div>
              <button className="purchase" onClick={() => this.handleSubmit()}>Confirm Purchase</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm);
