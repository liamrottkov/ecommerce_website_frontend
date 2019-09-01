import React from 'react';
import './index.css';


function GetProductForm(props) {
  return (
    <form onSubmit={props.getProducts}>
      <div className="form-group">
        {/* <label><b>Title:</b></label> */} 
        <input type="text" className="form-control" name="title" placeholder="Title"/>
      </div>
      <button type="submit" className="btn btn-primary">Get Product</button>
    </form>
  )
}


export default GetProductForm;
