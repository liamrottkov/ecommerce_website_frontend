import React, { Component } from 'react';
import './index.css';
import ContactForm from '../../components/contactForm';

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      'contacts': []
    }
  }

  savePost = async(e) => {
    e.preventDefault();
    let name = e.target.elements.name.value;
    let email = e.target.elements.email.value;
    let message = e.target.elements.message.value;

    let URL = 'http://localhost:5000/api/save/contact';

    let response = await fetch(URL, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "name": name,
        "email": email,
        "message": message,

      }
    });

    let data = await response.json();
    console.log(data);

    if (data.success) {
      alert('Message recieved! We will get back to you as soon as we can!')
    } else {
      alert('Message was not recieved. Pleast try again!')
    }
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Send us a Message</h1>
            <ContactForm savePost={this.savePost} />
          </div> {/* ends col */}
        </div> {/*ends row */}
      </div>
    );
  }
}

export default Contact;
