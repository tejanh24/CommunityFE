import React from 'react';
import {  Button, Alert } from 'react-bootstrap';
import axios from 'axios';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      products: [],
      response: {}
    }
  }

  componentDidMount() {
    // TODO : get data from database

   var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));


   var myOldId = organisation_data["_id"];
   axios.get(window.MyserviceHostUrl+'/api/tenant/organizationdata?id='+myOldId)
   .then(res => {
       console.log("data is" + res.data);
       organisation_data = res.data;
       localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
       }
       );
       var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));



   if (organisation_data.hasOwnProperty('application_config')) {
             const appconfigdata = organisation_data.application_config;
             appconfigdata.forEach(myData => {
               //alert(localStorage.getItem('products'));
                 if (myData.application_name == 'SAP' && localStorage.getItem('products') == null) {
                  localStorage.setItem('products',JSON.stringify(myData.instances));
                 }
             });
     }




    // console.log('inside ProductList'+JSON.stringify(localStorage.getItem('products')));
     
     let productList = localStorage.getItem('products');
    if(productList) {
      productList = JSON.parse(productList);
    } else {
      productList = [];
    }

    this.setState({
        products: productList
    });
  }

  deleteProduct(productId) {
    const { products } = this.state;
    const reaminingProducts = products.filter(product => product.rid !== productId);
    localStorage.setItem('products', JSON.stringify(reaminingProducts));
    this.setState({
        products: reaminingProducts
    });
  }

  render() {
    const { error, products} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
           
           <table class="table table-bordered  table-striped table-hover mt-25">

            <thead>
              <tr>
                <th style={{color:'#fff',backgroundColor:'#5068c2'}}>System</th>
                <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Landscape</th>
                <th style={{color:'#fff',backgroundColor:'#5068c2'}}>SID</th>
                <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Client</th>
                <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Domain</th>
                <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Username</th>
                {/* <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Password</th> */}
                <th  style={{color:'#fff',backgroundColor:'#5068c2'}} > &nbsp; </th>
              </tr>
            </thead>
            <tbody> 
              {products.map(product => (
                <tr key={product.rid}>
                  <td>{product.sapmodule}</td>
                  <td>{product.landscape}</td>
                  <td>{product.system}</td>
                  <td>{product.client}</td>
                  <td>{product.instance_domain}</td>
                  <td>{product.auth_username}</td>
                  {/* <td>{product.auth_password}</td> */}
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(product.rid)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.rid)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default ProductList;