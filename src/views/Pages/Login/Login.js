import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';



import axios from 'axios';
var Buffer = require('buffer/').Buffer 

class Login extends Component {

  constructor() {
    super()

    this.state = {
      tenant_admin_email: "",
      errors:"" ,
     
    }
    this.changeInfo = this.changeInfo.bind(this);
    this.loginformSubmission = this.loginformSubmission.bind(this);
  }

  
  


  changeInfo(e) {
    console.log(this.state + "state is...");
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validateForm() {

    let errors = {};
    let formIsValid = true;

    if (!this.state.tenant_admin_email) {
      formIsValid = false;
      errors["tenant_admin_email"] = "*Please enter your email";
    }else if (typeof this.state.tenant_admin_email !== "undefined") {
      if (!this.state.tenant_admin_email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
        formIsValid = false;
        errors["tenant_admin_email"] = "*Please enter valid email";
      }
    }
   

      this.setState({
        errors: errors
      });
      return formIsValid;

}

  loginformSubmission(e) {
    e.preventDefault();
    if (this.validateForm()) {
            
      console.log("Form submitted");
 
    //console.log(this.state);
    const obj = {
      userEmail: this.state.tenant_admin_email
    };
    axios.post('https://warm-taiga-34548.herokuapp.com/mouri-community/login', obj,{
      headers: {
        "Access-Control-Allow-Origin" : "*"
      }
    })
      .then(res => {
        if(res.status == 200) {
          localStorage.setItem('user_data', JSON.stringify(res.data));
          this.props.history.push("/bots");
        }
      }).catch((error) => {
          alert('Invalid login details');
      });
    
    }
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.loginformSubmission}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" value={this.state.tenant_admin_email} name="tenant_admin_email" onChange={this.changeInfo} className="form-control" autoComplete="off" />
                      </InputGroup>
                       <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_admin_email}</div> 
                      <div className="errorMsg" style={{color: "red"}}>{this.state.errors.tenant_admin_password}</div> 
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
