import React, { Component } from 'react';

import {
    Button,
    Card,
    CardBody,
    Col,
    Row
 
} from 'reactstrap';

class RPABotConfig extends Component {


    onBackButtonClick() {
        this.props.history.push("/bots");
    }


    render() {
        return (
            <div>
                <div className="float-right">
                    <Button color="primary" onClick={() => this.onBackButtonClick()} >Back</Button>
                </div>
                <br/><br/>
                <Card>
                <CardBody> 
    
                <form onSubmit={this.formSubmission}>
                <Row>
                <Col xs="6">  
                <div >
                <lable>Application Name:</lable>
                <input type= "text" value="" name="empname" onChange={this.chaneName} className="form-control"/>
                </div>
                </Col>
                <Col xs="6">
                <div   >
                <lable>Domain:</lable>
                <input type= "text"  value="" name="branch" onChange={this.chaneName} className="form-control"/>
                </div>
                </Col>
                </Row>
                <div   ><br/><br/>
                <lable><strong>Authentication Details:</strong></lable>
                {/* <input type= "text"  value="Basic Auth" name="branch" onChange={this.chaneName} className="form-control"/> */}
                <p><strong>Basic Auth:</strong></p>
                </div>
                <Row>
                <Col xs="6">  
                <div>     
                <lable>Username:</lable>
                <input type= "text"  value="" name="number" onChange={this.chaneName} className="form-control"/>
                </div>
                </Col>
                <Col xs="6">
                <div   >
                <lable>Password:</lable>
                <input type= "text"  value="" name="branch" onChange={this.chaneName} className="form-control"/>
                </div>
                <br/>
                </Col>
                </Row>
                <div className="form-group">
                <button type="submit" className="btn btn-success float-center" >Submit</button>
                </div>
                </form>
                </CardBody>
                </Card> 
            </div>

        )
    }

}

export default RPABotConfig;