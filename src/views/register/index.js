import React, { Component } from 'react';
import './index.css';

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1>Register</h1>
            <form onSubmit={this.props.handleRegister}>
              <input className="form-control" type="text" name="email" placeholder="Email..." />
              <br />
              <input className="form-control" type="password" name="pass" placeholder="Password..." />
              <br />
              <input type="submit" className="btn btn-primary send" value="Register" />
            </form>
          </div> {/* ends col */}
        </div> {/*ends row */}
      </div>
    );
  }
}
export default Register;
