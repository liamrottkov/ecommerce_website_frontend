import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <nav className="navbar navbar-expand-lg bg-primary rounded fixed-top">

          <NavLink to='/' className="navbar-brand">Commerce</NavLink>

          <NavLink to='/checkout' className="navbar-brand">Checkout</NavLink>

          <NavLink to='/contact' className="navbar-brand">Contact</NavLink>

          {
            !this.props.logged_in &&
              <NavLink to='/register' className="navbar-brand">Register</NavLink>
          }

          {
            !this.props.logged_in &&
              <NavLink to='/login' className="navbar-brand">Login</NavLink>
          }

          {
            (this.props.logged_in && this.props.admin) &&
              <NavLink to='/admin' className="navbar-brand">Admin</NavLink>
          }

          {
            this.props.logged_in &&
            <NavLink to='/logout' onClick={this.props.handleLogout} className="navbar-brand">Logout</NavLink>
          }


        </nav>
      </header>
    );
  }
}

export default Header;
