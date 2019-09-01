import React, { Component } from 'react';
import './index.css';
import AddProductForm from '../../components/addProductForm';
import GetProductsTable from '../../components/getProductsTable';
import GetProductForm from '../../components/getProductForm';

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      'products': []
    }
  }

  saveProduct = async(e) => {
    e.preventDefault();

    let title = e.target.elements.title.value;
    let price = e.target.elements.price.value;
    let description = e.target.elements.description.value;
    let image_url = e.target.elements.image_url.value;

    let URL = 'http://localhost:5000/api/save';

    let response = await fetch(URL, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "title": title,
        "price": price,
        "description": description,
        "image_url": image_url,
      }
    });

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Try again, sorry!')
    }
  }



  getProducts = async(e) => {
    e.preventDefault();

    let title = e.target.elements.title.value;


    let URL = 'http://localhost:5000/api/retrieve';

    let response = await fetch(URL, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "title": title,
      }
    });

    let data = await response.json();
    console.log(data)
    if (data.products) {
      //store only products into variable
      let products = data.products;

      this.setState({ products });
    }
  }

  deleteProduct = async(title) => {

    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    let URL = 'http://localhost:5000/api/delete';

    let response = await fetch(URL, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "title": title
      }
    });

    let data = await response.json();

    console.log(data);

    if (data.success) {
      let products = this.state.products;

      products = products.filter(product => product.title !== title);

      this.setState({ products });

      alert('Successfully deleted the product.');
    } else {
      alert('Sorry, but we could not delete the product.');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Add Product</h1>
            <AddProductForm saveProduct={this.saveProduct} />
            <h1>Get Product</h1>
            <GetProductForm getProducts={this.getProducts}
            />
            <GetProductsTable
              products={this.state.products}
              deleteProduct={this.deleteProduct}
            />
          </div> {/* ends col */}
        </div> {/*ends row */}
      </div>
    );
  }
}

export default Admin;
