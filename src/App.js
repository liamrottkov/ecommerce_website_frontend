import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Admin from './views/admin';
import Contact from './views/contact';
import Commerce from './views/commerce';
import Data from './views/data';
import Login from './views/login';
import Register from './views/register';
import Checkout from './views/checkout';
import SECRET_KEY from './config.js';

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
    }
  }

  handleLogin = async(e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.pass.value;

    const URL = 'http://localhost:5000/authentication/login'

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
        'admin': true,
        'token': data.token
    });

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

    const URL = 'http://localhost:5000/authentication/register'

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

    let URL = 'http://localhost:5000/api/retrieve/products';

    let response = await fetch(URL);

    let data = await response.json();

    console.log(data)

    this.setState({ products:data.products })
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
  }

  getTotal = price => {

    let cart = this.state.cart;

    for (let i in cart) {
      if (cart[i].price === price) {
        return i; 
        break;
      }
    }
    this.setState({ cart })
  }

  render() {
    return (
      <div className="App">
        <Header
        logged_in={this.state.logged_in}
        />
        <div className="container">
          <Switch>
            <Route exact path='/' render={() => <Commerce products={this.state.products}
            cart={this.state.cart}
            addItem={this.addItem}
            removeItem={this.removeItem}/>} />
            <Route exact path='/checkout' render={() => <Checkout cart={this.state.cart}
            removeItem={this.removeItem}/>} />
            <Route exact path='/admin' render={() => <Admin />} />
            <Route exact path='/contact' render={() => <Contact />} />
            <Route exact path='/login' render={() => <Login handleLogin={this.handleLogin} />} />
            <Route exact path='/register' render={() => <Register handleRegister={this.handleRegister} />} />
            {
            this.state.logged_in ?
            <Route exact path='/data' render={() => <Data />} /> :
            <p>You're not allowed to access this page, please log in.</p>
            }
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
