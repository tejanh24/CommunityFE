// import React, { Component } from 'react';

import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class BotGroups extends Component {

    constructor() {
        super();
        //this.onBotSelect = this.onBotSelect.bind(this);

        this.state = {
            // nextButtonEnabled: false
        }
    }

    // onNextButtonClick() {
    //     this.props.history.push("/channels");
    // }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white">
                            <CardBody className="pb-0">
                                <div className="text-value">BotGroups</div>
                                <div>(email, sms, notification template format)</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '49px' }}>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white">
                            <CardBody className="pb-0">
                                <div className="text-value">Language Support</div>
                                <div>(english, Hindi etc..,)</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white">
                            <CardBody className="pb-0">
                                <div className="text-value">Personalised Voice</div>
                                <div>(Personalise the Voice for each text in the conversation for a Scenario (Experimental))</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '8px' }}>
                            </div>
                        </Card>
                    </Col>


                </Row>
            </div>
        )
    }

}

export default BotGroups;