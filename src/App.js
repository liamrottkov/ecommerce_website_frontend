import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Admin from './views/admin';
import Contact from './views/contact';
import Commerce from './views/commerce';
import Login from './views/login';
import Logout from './views/logout';
import Register from './views/register';
import Checkout from './views/checkout';
import SECRET_KEY from './config.js';
import { StripeProvider } from 'react-stripe-elements';


let jwt = require('jsonwebtoken')

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged_in: false,
      admin: false,
      token: '',
      cart: [],
      products: [],
      total: 0,
    }
  }

  handleLogout = async(e) => {
    e.preventDefault();

    if (!window.confirm('Are you sure you want to logout?')) {
      return;
    }

    this.setState({
      'logged_in' : false,
    });
  }

  handleLogin = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = 'https://ecommerce-website-backend.herokuapp.com/authentication/login'

    let token = jwt.sign(
      { 'email':email, 'password':password },
      SECRET_KEY,
      { expiresIn: '10h' } // expires in 1 hour
    );

    let response = await fetch(URL, {
      'headers': {
        'Content-Type': 'application/json',
        'token': token
      }
    });

    let data = await response.json();

    if (data.message === 'success') {
      this.setState({
        'logged_in' : true,
        'token': data.token
    });

      if (data.admin === 1) {
        this.setState({ 'admin' : true });
      }
      localStorage.setItem('token', data.token);

      alert('You are now logged in!')
    } else {
      alert(data.message)
    }
  }


  handleRegister = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = 'https://ecommerce-website-backend.herokuapp.com/authentication/register'

    // encrypt a token with the proper payload info to send to our api
    let token = jwt.sign(
      { 'email':email, 'password':password },
      SECRET_KEY,
      { expiresIn: '10h' } // expires in 1 hour
    );

    // send the token to register the user
    let response = await fetch(URL, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'token': token
      }
    });

    let data = await response.json();

    // setup a message saying registered or error
    if (data.message === 'success') {
      alert('You are now registered!')
    } else {
      alert(data.message)
    }
  }

  getProduct = async(e) => {

    const URL = 'https://ecommerce-website-backend.herokuapp.com/api/retrieve/products';

    let response = await fetch(URL);

    let data = await response.json();

    console.log(data)

    this.setState({ products: data.products })
  }

   componentDidMount() {
     this.getProduct();
   }

  addItem = product_id => {
    // set state variables into local, as not to alter state directly
    let products = this.state.products;
    let cart = this.state.cart;

    // add item with correct id to local cart variable
    for (let i in products) {
      if (products[i].product_id === product_id) {
        cart.push(products[i]);
        break;
      }
    }
    // set the cart with updated values
    this.setState({ cart })
    this.getTotal();
  }

  removeItem = product_id => {

    let cart = this.state.cart;

    for (let i in cart) {
      if (cart[i].product_id === product_id) {
        cart.splice(i, 1);
        break;
      }
    }

    // reset the state
    this.setState({ cart });
    this.getTotal();
  }

  getTotal = () => {

    let cart = this.state.cart;

    let total = 0;

    for (let i in cart) {
      total += cart[i].price.toFixed(2);
    }
    this.setState({ total });
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_sTltal2Cd2L8A28D2htWtv5w00uLqPReZ0">
        <div className="App">
          <Header
          logged_in={this.state.logged_in}
          admin={this.state.admin}
          />
          <div className="container">
            <Switch>
              <Route exact path='/' render={() => <Commerce products={this.state.products}
              cart={this.state.cart}
              addItem={this.addItem}
              removeItem={this.removeItem}
              total={this.state.total}
              />} />

              <Route exact path='/checkout' render={() => <Checkout  cart={this.state.cart}
              removeItem={this.removeItem}
              total={this.state.total}
              />} />

              { (this.state.admin === true) ?
                <Route exact path='/admin' render={() => <Admin
                products={this.state.products}
                saveProduct={this.saveProduct}
                getProducts={this.getProduct}
                deleteProduct={this.deleteProduct}
                />} />
                :
                <Route exact path='/admin' render={() => <h2 className="center"><b>Sorry, you do not have the priviledges to access this page.</b></h2>} />
              }

              <Route exact path='/contact' render={() => <Contact />} />

              <Route exact path='/login' render={() => <Login handleLogin={this.handleLogin} />} />

              <Route exact path='/register' render={() => <Register handleRegister={this.handleRegister} />} />

              { (this.state.logged_in === true) ?
                <Route exact path='/logout' render={() => <Logout handleLogout={this.handleLogout} />} />
                :
                <Route exact path='/logout' render={() => <h2 className="center"><b>You are logged out!</b></h2>} />
              }

            </Switch>
          </div>
          <Footer />
        </div>
      </StripeProvider>
    );
  }
}


export default App;
