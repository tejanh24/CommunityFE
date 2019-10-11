import React, { Component, lazy, Suspense } from 'react';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
  
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import '../components.css';
import '../channels/channels.css'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class SAPBotServices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reseturl: "sap/opu/odata/SAP/ZUSER_DETAILS_88_SRV/ForgotPwdSet",
            unlockurl: "sap/opu/odata/SAP/ZUSER_DETAILS_88_SRV/UserUnlockSet",
            resetval: false,
            unlockval: false,
            checkedItems: new Map(),
            enabled_bot_services: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.chaneName = this.chaneName.bind(this);
    }




    handleInputChange(event) {
        const target = event.target;
        console.log("target is" + target);
        const value = target.type === 'checkbox' ? target.checked : target.value;

        console.log(value);
        const name = target.name;
        console.log(name + " and value is" + value);
        this.setState({
            [name]: value
        });

    }
    chaneName(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        const botservices = JSON.parse(localStorage.getItem('botservices'));
        //alert(":::::  BOT SERVICES   :::::::" + JSON.stringify(botservices));
        console.log("botservices......." + botservices);
        if (botservices !== null) {

            botservices.forEach(service => {
                console.log(service);

                if (service.service_code == 'sap_0001') {
                    console.log("welcome murty");
                    this.setState({
                        resetval: true,
                        reseturl: service.service_end_point_url
                    })
                    console.log(this.state.reseturl);
                }

                if (service.service_code == 'sap_0002') {
                    console.log("welcome murty unlock");
                    this.setState({
                        unlockval: true,
                        unlockurl: service.service_end_point_url
                    })
                    console.log(this.state.reseturl);
                }
            })

        }else{
           console.log('getting from localstorage');
           var enabled_bot_services = JSON.parse(localStorage.getItem("enabled_bot_services"));
           if(enabled_bot_services != null){
            enabled_bot_services.forEach(service => {
               // console.log(service);

                if (service.service_code == 'sap_0001') {
                    this.setState({
                        resetval: true,
                        reseturl: service.service_end_point_url
                    })
                }

                if (service.service_code == 'sap_0002') {
                    this.setState({
                        unlockval: true,
                        unlockurl: service.service_end_point_url
                    }) 
                }
            })
        }
            

        }


    }
    onBotSelect(resetval) {
        //this.props.history.push("/bots/channels");
        // this.props.history.push("/bots/config/" + botname);


        //this.state.sapbotconfigdata = localStorage.getItem('sapbotconfigdata');
        //console.log("after "+JSON.parse(this.state.sapbotconfigdata));
    }

    onSubmitButtonClick() {
        //alert("Submitted successfully");
        const appname = localStorage.getItem('appname');
        const appdomain = localStorage.getItem('appdomain');

        const authusername = localStorage.getItem('authusername');
        const authpassword = localStorage.getItem('authpassword');
        const aiplatform = localStorage.getItem('aiplatform');
        const dailogflowfile = localStorage.getItem('dailogflowfile');
        const aiprojectid = localStorage.getItem('aiprojectid');
        const system = localStorage.getItem('system');
        const client = localStorage.getItem('client');
        console.log(appname + "appname...and appdomain is" + appdomain + authusername + authpassword + aiplatform + client);


        console.log(JSON.stringify(this.state) + "state......" + JSON.stringify(this.state.unlockval));
        this.state.enabled_bot_services = [];
        this.props.history.push("/bots/channels");
        console.log(this.state.resetval);
        if (this.state.resetval == true) {
            const reset_obj =
            {
                "service_name": "Reset Password",
                "service_code": "sap_0001",
                "service_end_point_url": "sap/opu/odata/SAP/ZUSER_DETAILS_88_SRV/ForgotPwdSet"
            }



            //   const reset_obj1 = this.state.enabled_bot_services.concat(reset_obj);
            this.state.enabled_bot_services.push(reset_obj);
            console.log("resre obj....." + JSON.stringify(reset_obj));

            console.log("rst" + JSON.stringify(this.state.enabled_bot_services));
        }
        console.log(this.state.unlockval + "unl");
        if (this.state.unlockval == true) {
            console.log("unl");
            const unlock_obj =
            {
                "service_name": "Unlock Account",
                "service_code": "sap_0002",
                "service_end_point_url": "sap/opu/odata/SAP/ZUSER_DETAILS_88_SRV/UserUnlockSet"
            }

            this.state.enabled_bot_services.push(unlock_obj);
        }

        console.log("final " + JSON.stringify(this.state.enabled_bot_services));
        const { enabled_bot_services } = this.state;
        localStorage.setItem('enabled_bot_services', JSON.stringify(enabled_bot_services));
    }
    onPreviousButtonClick() {
        this.props.history.push("/bots/config/sapbot");
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <h4 >SERVICES</h4>
                </Row>
                <Row>
                    <Col xs="12" sm="6" md="8">
                        <Card>
                            <CardHeader> SAP BOT </CardHeader>
                            <CardBody>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="sertext">Reset Password</td>

                                            <td>
                                                <div className="custom-control custom-switch newpillclass">
                                                    <input type="checkbox" onChange={this.handleInputChange} checked={this.state.resetval} defaultChecked={this.state.resetval} className="custom-control-input" id="switch2" name="resetval" />
                                                    <label className="pilladj custom-control-label" for="switch2"></label>
                                                </div>
                                            </td>

                                            {/* <td><AppSwitch value="resetval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.resetval} /></td> */}
                                            <td><input type="text" name="reseturl" value={this.state.reseturl} placeholder="Please enter your endpoint url" name="reseturl" onChange={this.chaneName} className="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td className="sertext">Unlock Account</td>

                                            <td>
                                                <div class="custom-control custom-switch newpillclass">
                                                    <input type="checkbox" onChange={this.handleInputChange} checked={this.state.unlockval} value={this.state.unlockval} class="custom-control-input" id="switch1" name="unlockval" />
                                                    <label className="pilladj custom-control-label" for="switch1"></label>
                                                </div>
                                            </td>

                                            {/* <td><AppSwitch value="resetval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.unlockval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type="text" name="unlockval" value={this.state.unlockurl} placeholder="Please enter your endpoint url" name="unlockurl" onChange={this.chaneName} className="form-control" /></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="buttonsalign1 float-right">
                    <Button color="primary" onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>&nbsp;&nbsp;&nbsp;
                    <Button color="primary" onClick={(e) => this.onSubmitButtonClick()}>Next</Button>
                </Row>

            </div>
        )
    }
}

export default SAPBotServices;