import React, { Component, lazy, Suspense } from 'react';

import {
  
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class BotServices extends Component {
    constructor() {
        super();

        this.state = {
            previousButtonEnabled: true,
            submitButtonEnabled: false
        }
    }

    // onBotSelect(botname) {
    //     var returnedValue = window.confirm("Do you want to enable " + botname);

    //     if (returnedValue == true) {
    //         this.setState({ nextButtonEnabled: true });
    //     }
    //     else {
    //         this.setState({ nextButtonEnabled: false });
    //     }
    // }

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
                            <CardHeader> HR BOT </CardHeader>
                            <CardBody>
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Leave Request</td>
                                            <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td>
                                        </tr>
                                        <tr>
                                            <td>Leave Approval</td>
                                            <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td>
                                        </tr>
                                        <tr>
                                            <td>Time Sheet Submit</td>
                                            <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td>
                                        </tr>
                                        <tr>
                                            <td>Time Sheet Approval</td>
                                            <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Button color="primary" disabled={!this.state.previousButtonEnabled} onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>
                    <Button color="primary" disabled={!this.state.submitButtonEnabled} onClick={(e) => this.onSubmitButtonClick()}>Submit</Button>
                </Row>

            </div>
        )
    }
}

export default BotServices;
