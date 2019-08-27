import React from 'react';
import './index.css';


function ContactForm(props) {
  return (
    <form onSubmit={props.savePost}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" name="name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" name="email" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea type="text" className="form-control" name="message" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}


export default ContactForm;
