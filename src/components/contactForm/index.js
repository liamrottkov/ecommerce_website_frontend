import React from 'react';
import './index.css';


function ContactForm(props) {
  return (
    <form onSubmit={props.savePost}>
      <div className="form-group">
        {/* <label><b>Name:</b></label> */}
        <input type="text" className="form-control" name="name" placeholder="Name"/>
      </div>
      <div className="form-group">
        {/* <label><b>Email:</b></label> */}
        <input type="text" className="form-control" name="email" placeholder="Email"/>
      </div>
      <div className="form-group">
        {/* <label><b>Message:</b></label> */}
        <textarea type="text" className="form-control" name="message" placeholder="Message"/>
      </div>
      <button type="submit" className="btn btn-primary">Send Message</button>
    </form>
  )
}


export default ContactForm;
