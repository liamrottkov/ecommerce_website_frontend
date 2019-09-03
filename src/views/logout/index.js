import React, { Component } from 'react';
import './index.css';

class Logout extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1>Logout</h1>
            <form onSubmit={this.props.handleLogout}>
              <input type="submit" className="btn btn-primary send" value="Logout" />
            </form>
          </div> {/* ends col */}
        </div> {/*ends row */}
      </div>
    );
  }
}
export default Logout;
