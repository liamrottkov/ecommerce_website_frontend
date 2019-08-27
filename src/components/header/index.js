import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded fixed-top">
          <NavLink to='/' className="navbar-brand">Commerce</NavLink>
          <NavLink to='/checkout' className="navbar-brand">Checkout</NavLink>
          <NavLink to='/admin' className="navbar-brand">Admin</NavLink>
          <NavLink to='/contact' className="navbar-brand">Contact</NavLink>
          <NavLink to='/login' className="navbar-brand">Login</NavLink>
          <NavLink to='/register' className="navbar-brand">Register</NavLink>
          {
            this.props.logged_in &&
              <NavLink to='/data' className="navbar-brand">Data</NavLink>
          }
        </nav>
      </header>
    );
  }
}

export default Header;
