import React, { Component } from 'react';

import { Button } from 'reactstrap';
import '../components.css'
import '../channels/channels.css'

//import ProductTable from './productstable';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var data;
//var SapInstances=[];

const cellEditProp = {
    mode: 'click',
    blurToSave: true
};
// import Sapbotservice from '../botservices/sapbotservices';
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!

class Sampledemo extends Component {


    chaneName(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onNextButtonClick(e) {
        
     
    }

    onPreviousButtonClick() {
        this.props.history.push("/bots");
    }

    render() {

        return (

            <div>
                <div className="float-right">
                    <Button color="primary" onClick={() => this.onBackButtonClick()}>Back</Button>
                </div>
                
            </div>
        )
    }

}

export default Sampledemo;
