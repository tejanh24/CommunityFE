import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';

import axios from 'axios';
import Swal from 'sweetalert2';

import '../views.css';

var Buffer = require('buffer/').Buffer 
class Register extends Component {

  constructor() {
    super()

    this.state = {
      tenant_name: "",
      tenant_admin_email: "",
      tenant_admin_first_name: "",
      tenant_admin_last_name: "",
      tenant_domain: "",
      tenant_phone_number:"",
      errors:""
    }
    this.chaneName = this.chaneName.bind(this);
    this.formSubmission = this.formSubmission.bind(this);
  }


  validateForm() {

    let errors = {};
    let formIsValid = true;



    
    if (!this.state.tenant_name) {
      formIsValid = false;
      errors["tenant_name"] = "*Please enter your name";
    }

    if (!this.state.tenant_admin_first_name) {
      formIsValid = false;
      errors["tenant_admin_first_name"] = "*Please enter user first name";
    }


    if (!this.state.tenant_admin_last_name) {
      formIsValid = false;
      errors["tenant_admin_last_name"] = "*Please enter user last name";
    }

    if (!this.state.tenant_name) {
      formIsValid = false;
      errors["tenant_name"] = "*Please enter your name";
    }

    if (!this.state.tenant_domain) {
      formIsValid = false;
      errors["tenant_domain"] = "*Please enter your domain name";
    }

  
  if (!this.state.tenant_admin_password) {
    formIsValid = false;
    errors["tenant_admin_password"] = "*Please enter your password";
  }

    if (!this.state.tenant_admin_email) {
      formIsValid = false;
      errors["tenant_admin_email"] = "*Please enter your email";
    }else if (typeof this.state.tenant_admin_email !== "undefined") {
      if (!this.state.tenant_admin_email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
        formIsValid = false;
        errors["tenant_admin_email"] = "*Please enter valid email";
      }
    }

    if (!this.state.tenant_admin_password) {
        formIsValid = false;
        errors["tenant_admin_password"] = "*Please enter your password";
    }
   

      this.setState({
        errors: errors
      });
      return formIsValid;

}

  formSubmission(e) {
    e.preventDefault()

    e.preventDefault();
    if (this.validateForm()) {
            
      console.log("Form submitted");
     
   // console.log(this.state);
    const obj = {
        contact_phone_number:this.state.tenant_phone_number,
        organisation_name: this.state.tenant_name,
        contact_email_id:this.state.tenant_admin_email,
        organisation_admin_email_id: this.state.tenant_admin_email,
        organisation_admin_password: Buffer.from(this.state.tenant_admin_password).toString('base64'),
        organisation_admin_first_name: this.state.tenant_admin_first_name,
        organisation_admin_last_name: this.state.tenant_admin_last_name,
        organisation_domain: this.state.tenant_domain,
      };

      
      axios.post(window.MyserviceHostUrl+'/api/tenant/registration', obj)
          .then(res => {
              console.log(res.data)
            if(  res.data.status_type == "DUPLECATE"){
               //alert("The email address is already in use, try with another email")
               Swal.fire({
                title: '',
                text: "The email address is already in use, try with another email"
              });
            } else if(res.data.status_type == "SUCCESS") {
                    

            Swal.fire({
              title: '',
              text: "Your registration completed, Do you want to login?",
             // type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {
                this.props.history.push("/login");
              }});
          

          }
        });
      }
      
 }



/*
  chaneName(e){
    console.log(this.state+"state is...");
    this.setState({
      tenant_name: this.state.tenant_name,
      tenant_admin_email: this.state.tenant_admin_email,
      tenant_admin_password: this.state.tenant_admin_password,
      tenant_admin_first_name: this.state.tenant_admin_first_name,
      tenant_admin_last_name: this.state.tenant_admin_last_name,
      tenant_domain: this.state.tenant_domain
    });

    //axios.post('https://b3b3c2d2.ngrok.io/api/tenant/register', obj)
    //     .then(res => console.log(res.data));

  }
*/
  chaneName(e) {
    console.log(this.state + "state is...");
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.formSubmission}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">

                      <Input type="text" placeholder="Tenant name" value={this.state.tenant_name} name="tenant_name" onChange={this.chaneName} className="form-control" autoComplete="off"/>
                      
                    </InputGroup>
                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_name}</div> 

                    <InputGroup className="mb-3">
                      {/* <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon> */}
                      <Input type="text" placeholder="Tenant  email" value={this.state.tenant_admin_email} name="tenant_admin_email" onChange={this.chaneName} className="form-control" autoComplete="off" />
                    </InputGroup>
                      <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_admin_email}</div> 
                    <InputGroup className="mb-3">
                      <Input type="password" placeholder="Tenant password" value={this.state.tenant_admin_password} name="tenant_admin_password" onChange={this.chaneName} className="form-control" autoComplete="off" />
                    </InputGroup>
                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_admin_password}</div> 
                    <InputGroup className="mb-3">
                      {/* <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon> */}
                      <Input type="text" placeholder="Tenant user firstname" value={this.state.tenant_admin_first_name} name="tenant_admin_first_name" onChange={this.chaneName} className="form-control" autoComplete="off" />
                    </InputGroup>
                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_admin_first_name}</div> 
                    <InputGroup className="mb-4">

                      <Input type="text" placeholder="Tenant user lastname" value={this.state.tenant_admin_last_name} name="tenant_admin_last_name" onChange={this.chaneName} className="form-control" autoComplete="off" />
                    </InputGroup>
                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_admin_last_name}</div> 

                    <InputGroup className="mb-3">
                      <Input type="text" placeholder="Tenant Domain" value={this.state.tenant_domain} name="tenant_domain" onChange={this.chaneName} className="form-control" autoComplete="off" />
                    </InputGroup>
                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_domain}</div> 

                       <InputGroup className="mb-3 xs-6">
                  <Button color="success">Create Account</Button>
                  </InputGroup>
                  <InputGroup className="mb-3 xs-6">
                  <a href="/login" title="Click here to go homepage">  Already a user? Login </a>     &nbsp;   &nbsp;
                  </InputGroup>

                   
                 
                 
                   
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row> 
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
