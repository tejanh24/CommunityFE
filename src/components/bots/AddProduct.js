import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      rid: '',
      sapmodule: '',
      landscape: 'DEVELOPMENT',
      system: '',
	    client: '',
      instance_domain: '',
      auth_username:'',
      auth_password:'',
      errors:""
      
    }
    //console.log('IS editable'+props.isEditProduct);
    if(props.product){
      this.state = props.product
      //this.decrptPasword();
    } else {
      this.state = this.initialState;
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    
            let errors = {};
            let formIsValid = true;
      
            if (!this.state.sapmodule) {
              formIsValid = false;
              errors["sapmodule"] = "*Please enter your System";
            }

            if (!this.state.landscape) {
              formIsValid = false;
              errors["landscape"] = "*Please enter your Landscape";
            }
            
            if (!this.state.system) {
              formIsValid = false;
              errors["system"] = "*Please enter your SID";
            }
      
            if (!this.state.client) {
              formIsValid = false;
              errors["client"] = "*Please enter your Client";
            }

            if (!this.state.instance_domain) {
              formIsValid = false;
              errors["instance_domain"] = "*Please enter your Domain.";
            }
            if (!this.state.auth_username) {
              formIsValid = false;
              errors["auth_username"] = "*Please enter your Username.";
            }
            if (!this.state.auth_password) {
              formIsValid = false;
              errors["auth_password"] = "*Please enter your Password";
            }
        
              
              this.setState({
                errors: errors
              });
              return formIsValid;
      
    
        }



 decrptPasword() {
    let temp_auth_password = this.state.auth_password;
    temp_auth_password = Buffer.from(temp_auth_password, 'base64').toString('ascii');
    //alert(temp_auth_password);
    this.setState({
      auth_password:temp_auth_password
    });
    //return auth_password;
}

  handleChange(event) {
    const name  = event.target.name;
    const value = event.target.value;
    
    //if (!event.target.validity.valid) {
    //  event.target.setCustomValidity(event.target.getAttribute("data-error"));
    //WW}
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    if (this.validateForm()) {
    
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);

    }
      
  }

  componentDidMount() {
    if(this.state.auth_password.length>2){
       this.decrptPasword();
    }
  }  

  render() {

    let pageTitle;
    if(this.state.rid) {
      pageTitle = <h4 style={{color:'#5068c2'}}>Edit Instance</h4>
    } else {
      pageTitle = <h4 style={{color:'#5068c2'}}>New Instance</h4>
    }

    return(
      <div>
        
        {pageTitle}

        <Form onSubmit={this.handleSubmit}>
            
        <Row>
          <Col sm={6}>
              <Form.Group controlId="sapmodule">
                <Form.Label><lable> System </lable></Form.Label>
                <Form.Control
                  type="text"
                  name="sapmodule"
                  value={this.state.sapmodule}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  placeholder="System" 
                  required
                    />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.sapmodule}</div> */}

              </Form.Group>
              </Col>
              <Col sm={6}>
               <Form.Group controlId="landscape">
                <Form.Label><lable>Landscape</lable></Form.Label>
                <Form.Control
                  type="text"
                  name="landscape"
                  value={this.state.landscape}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  required
                  placeholder="Landscape" />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.landscape}</div> */}

              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col sm={6}>
              <Form.Group controlId="system">
                <Form.Label><lable>SID</lable></Form.Label>
                <Form.Control
                  type="text"
                  name="system"
                  value={this.state.system}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  placeholder="SID"
                  required
                   />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.system}</div> */}

              </Form.Group>
             </Col>
              <Col sm={6}>
              <Form.Group controlId="client">
                <Form.Label><lable>Client</lable></Form.Label>
                <Form.Control
                  type="number"
                  name="client"
                  value={this.state.client}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  placeholder="Client"
                  required
                  />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.client}</div> */}

              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col sm={6}>
                <Form.Group controlId="instance_domain">
                <Form.Label><lable>Domain</lable></Form.Label>
                <Form.Control
                  type="text"
                  name="instance_domain"
                  value={this.state.instance_domain}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  placeholder="Domain"
                  required
                   />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.instance_domain}</div> */}

              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col sm={6}>
               <Form.Group controlId="auth_username">
                <Form.Label><lable>Username</lable></Form.Label>
                <Form.Control
                  type="text"
                  name="auth_username"
                  value={this.state.auth_username}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  required
                  placeholder="Username" />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.auth_username}</div> */}

              </Form.Group> 
              </Col>
              <Col sm={6}>
             <Form.Group controlId="auth_password">
                <Form.Label><lable>Password</lable></Form.Label>
                <Form.Control
                  type="password"
                  name="auth_password"
                  value={this.state.auth_password}
                  onChange={this.handleChange}
                  minLength={3} maxLength={200}
                  required
                  placeholder="Password" />
                  {/* <div className="errorMsg" style={{color: "red"}}>{this.state.errors.auth_password}</div> */}

              </Form.Group>
              </Col>
              </Row>
              
           <Form.Group>
                <Form.Control type="hidden" name="rid" value={this.state.rid} />
                <Button variant="success" type="submit">Save</Button>
           </Form.Group>
          
          </Form>
     </div>
    )
  }
}

export default AddProduct;