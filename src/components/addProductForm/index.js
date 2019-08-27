import React from 'react';
import './index.css';


function AddProductForm(props) {
  return (
    <form onSubmit={props.saveProduct}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" className="form-control" name="title" />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" step="any" className="form-control" name="price" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea type="text" className="form-control" name="description" />
      </div>
      <div className="form-group">
        <label>Image URL (150x150)</label>
        <textarea type="text" className="form-control" name="image_url" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}


export default AddProductForm;
