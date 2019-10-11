import React, { Component, lazy, Suspense } from 'react';

import {
  
    Button,
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import '../channels/channels.css'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class BotAssetServices extends Component {
    constructor() {
        super();

        this.state = {
            previousButtonEnabled: true,
            submitButtonEnabled: false
        }
    }

  
    onSubmitButtonClick() {
        alert("Submitted successfully");
    }

    onPreviousButtonClick() {
        this.props.history.push("/channels");
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <h4 className="header-color">SERVICES</h4>
                </Row>
                <Row>
                    <Col xs="12" sm="6" md="8">
                        <Card>

                            <CardBody>
                                <table className="table">
                                    <thead>
                                        <th>BOT NAME</th>
                                        <th>SERVICE</th>
                                        <th>Application/Tool</th>
                                        <th>Enable/Disable</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>HR BOT </td>
                                            <td>Leave Request</td>
                                            <td>Successfactors</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch9" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch9"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>HR BOT </td>
                                            <td>Leave Approval</td>
                                            <td>Successfactors</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch8" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch8"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>HR BOT </td>
                                            <td>Time Sheet Submit</td>
                                            <td>Successfactors</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch7" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch7"></label>
                                                </div>
                                                
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>HR BOT </td>
                                            <td>Time Sheet Approval</td>
                                            <td>Successfactors</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch6" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch6"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SNOW BOT </td>
                                            <td>Get Incidents</td>
                                            <td>ServiceNow</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch5" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch5"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SNOW BOT </td>
                                            <td>Get Changes</td>
                                            <td>ServiceNow</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch4" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch4"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SNOW BOT </td>
                                            <td>Approvals</td>
                                            <td>ServiceNow</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch3" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch3"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SAP BOT </td>
                                            <td>Reset Password</td>
                                            <td>SAP</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch2" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch2"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SAP BOT </td>
                                            <td>Unlock Account </td>
                                            <td>SAP</td>
                                            <td>
                                                <div className="custom-control custom-switch newpillclass1">
                                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.skypeforbusiness} className="custom-control-input" id="switch1" name="skypeforbusiness" />
                                                <label className="custom-control-label" for="switch1"></label>
                                                </div>
                                                {/* <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} /> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button color="primary"  >All Services In Single Bot</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button color="success" >Individual Bot for some set of services</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* // <Row className="align-center">
                //     <Button color="primary"  >All Services In Single Bot</Button>
                //     <Button color="success" >Individual Bot for some set of services</Button>
                // </Row> */}

            </div>
        )
    }
}

export default BotAssetServices;
