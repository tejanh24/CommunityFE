//import React, { Component } from 'react';

import React, { Component, lazy, Suspense } from 'react';
import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';

import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class Help extends Component {

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white">
                            <CardBody className="pb-0">
                                <div className="text-value">Platform help</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white">
                            <CardBody className="pb-0">
                                <div className="text-value">Advisory Services</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white">
                            <CardBody className="pb-0">
                                <div className="text-value">FAQs</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Help;