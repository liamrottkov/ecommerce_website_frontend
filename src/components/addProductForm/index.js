import React from 'react';
import './index.css';


function AddProductForm(props) {
  return (
    <form onSubmit={props.saveProduct}>
      <div className="form-group">
        {/*<label><b>Title:</b></label>*/}
        <input type="text" className="form-control" name="title" placeholder="Title"/>
      </div>
      <div className="form-group">
        {/*<label><b>Price:</b></label>*/}
        <input type="number" step="any" className="form-control" name="price" placeholder="Price"/>
      </div>
      <div className="form-group">
        {/*<label><b>Description:</b></label>*/}
        <textarea type="text" className="form-control" name="description" placeholder="Description"/>
      </div>
      <div className="form-group">
        {/*<label><b>Image URL (150x150):</b></label>*/}
        <textarea type="text" className="form-control" name="image_url" placeholder="Image URL (150x150)"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}


export default AddProductForm;
