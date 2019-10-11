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
import { AppSwitch } from '@coreui/react'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import '../components.css';
import '../channels/channels.css'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class EditSNOWBotServices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // reseturl: "http://sapserver2.us.mouritech.net:8001/sap/opu/odata/SAP/ZUSER_DETAILS_88_SRV/ForgotPwdSet",
            // unlockurl: "http://sapserver2.us.mouritech.net:8001/sap/opu/odata/SAP/ZUSER_DETAILS_88_SRV/UserUnlockSet",
            // resetval:false,
            // unlockval:true,

            getincidentsurl:"",
            getchangesurl:"",
            approvalsurl:"",
            getincidentsval:false,
            getchangesval:false,
            getapprovalsval:false,

            checkedItems: new Map(),
            enabled_bot_services: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.chaneName = this.chaneName.bind(this);
    }

    componentDidMount() {
        const appname = localStorage.getItem('appname');
        console.log(appname + "appname");

     
            const botservices = JSON.parse(localStorage.getItem('botservices'));
            console.log("botservices......."+botservices);
            botservices.forEach(service=>{
                console.log(service);
               

                if(service.service_code == 'snow_0001'){
                    console.log("welcome murty");
                    this.setState({
                        getincidentsval:true,
                        getincidentsurl:service.service_end_point_url
                    })
                //console.log(this.state.reseturl);
                }
    
                if(service.service_code == 'snow_0002'){
                    console.log("welcome murty ");
                    this.setState({
                        getchangesval:true,
                        getchangesurl:service.service_end_point_url
                    })
                //console.log(this.state.reseturl);
                }

                if(service.service_code == 'snow_0003'){
                    console.log("welcome murty ");
                    this.setState({
                        approvalsval:true,
                        approvalsurl:service.service_end_point_url
                    })
               // console.log(this.state.reseturl);
                }
    
    
    
            })
    
        
    }


    handleInputChange(event) {
        const target = event.target;
        console.log("target is" + target);
        const value = target.type === 'checkbox' ? target.checked : target.value;



        // const item = event.target.name;
        // const isChecked = event.target.checked;
        // this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));






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

    onBotSelect(getincidentsval) {
        //this.props.history.push("/bots/channels");
        // this.props.history.push("/bots/config/" + botname);


        //this.state.sapbotconfigdata = localStorage.getItem('sapbotconfigdata');
        //console.log("after "+JSON.parse(this.state.sapbotconfigdata));
    }

    onSubmitButtonClick() {
        //alert("Submitted successfully");
        // const appname = localStorage.getItem('appname');
        // const appdomain = localStorage.getItem('appdomain');

        // const authusername = localStorage.getItem('authusername');
        // const authpassword = localStorage.getItem('authpassword');
        // const aiplatform = localStorage.getItem('aiplatform');
        // const dailogflowfile = localStorage.getItem('dailogflowfile');
        // const aiprojectid = localStorage.getItem('aiprojectid');
        // const system = localStorage.getItem('system');
        // const client = localStorage.getItem('client');
        // console.log(appname+"appname...and appdomain is"+appdomain + authusername + authpassword + aiplatform + client);


        console.log(JSON.stringify(this.state) + "state......" + JSON.stringify(this.state.approvalsval));
        this.state.enabled_bot_services = [];
        this.props.history.push("/bots/snowchannels");
        console.log(this.state.getincidentsval);
        if (this.state.getincidentsval == true) {
            const getincidents_obj =
            {
                "service_name": "Get Incidents",
                "service_code": "snow_0001",
                "service_end_point_url": "https://dev39355.service-now.com/api/now/table/incident?sysparm_query=assigned_to.first_name%3D{username_first_name}%5Eassigned_to.last_nameSTARTSWITH{username_last_name}%5EstateNOT%20IN3%2C6%2C7%2C8&sysparm_fields=number%2Cshort_description%2Cpriority%2Cbusiness_duration%2Csys_id&sysparm_limit=10"
            }
            //   const reset_obj1 = this.state.enabled_bot_services.concat(reset_obj);
            this.state.enabled_bot_services.push(getincidents_obj);
            console.log("getincidents_obj....." + JSON.stringify(getincidents_obj));

            console.log("rst" + JSON.stringify(this.state.enabled_bot_services));
        }
        console.log(this.state.getchangesval + "getchangesval");
        if (this.state.getchangesval == true) {
            console.log("getchangesval");
            const getchanges_obj =
            {
                "service_name": "Get Changes",
                "service_code": "snow_0002",
                "service_end_point_url": "https://dev39355.service-now.com/api/now/table/sysapproval_approver?sysparm_query=approver.first_name%3D{username_first_name}%5Eapprover.last_nameSTARTSWITH{username_last_name}%5Estate%3Drequested&sysparm_display_value=true&sysparm_fields=sys_id%2Cstate%2Capprover%2Csysapproval%2Cdocument_id.short_description%2Cdocument_id.description%2Cdocument_id.opened_by%2Csys_id&sysparm_limit=10"
            }
            this.state.enabled_bot_services.push(getchanges_obj);
        }

        console.log(this.state.approvalsval);
        if (this.state.approvalsval == true) {
            const approvals_obj =
            {
                "service_name": "Approvals",
                "service_code": "snow_0003",
                "service_end_point_url": "https://dev39355.service-now.com/api/now/table/sysapproval_approver?sysparm_query=approver.first_name%3D{username_first_name}%5Eapprover.last_nameSTARTSWITH{username_last_name}%5Estate%3Drequested&sysparm_display_value=true&sysparm_fields=sys_id%2Cstate%2Capprover%2Csysapproval%2Cdocument_id.short_description%2Cdocument_id.description%2Cdocument_id.opened_by%2Csys_id&sysparm_limit=10"
            }
            this.state.enabled_bot_services.push(approvals_obj);
        }
        const { enabled_bot_services } = this.state;
        localStorage.setItem('enabled_bot_services', JSON.stringify(enabled_bot_services));
    }
    onPreviousButtonClick() {
        this.props.history.push("/bots/config/editsnowbot");
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <h4>Features Configuration</h4>
                </Row>
                <Row>
                    <Col xs="12" sm="6" md="8">
                        <Card>
                            <CardHeader> SNOW BOT </CardHeader>
                            <CardBody>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="sertext">Get Incidents</td>

                                            <td>

                                            <div className="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange}  checked={this.state.getincidentsval}  value={this.state.getincidentsval}  className="custom-control-input" id="switch2" name="getincidentsval" />
                                            <label className="pilladj custom-control-label" for="switch2"></label>
                                            </div>


                                            </td>

                                            {/* <td><AppSwitch value="resetval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.resetval} /></td> */}
                                            <td><input type="text" name="getincidentsurl"  value={this.state.getincidentsurl} placeholder="Please enter your endpoint url" name="getincidentsurl" onChange={this.chaneName} className="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td className="sertext">Get Changes</td>

                                            <td>

                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.getchangesval}  value={this.state.getchangesval} class="custom-control-input" id="switch1" name="getchangesval" />
                                            <label className="pilladj custom-control-label" for="switch1"></label>
                                            </div>

                                            </td>

                                            {/* <td><AppSwitch value="resetval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.unlockval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type="text" name="getchangesurl" value={this.state.getchangesurl} placeholder="Please enter your endpoint url" name="getchangesurl" onChange={this.chaneName} className="form-control" /></td>
                                        </tr>
                                        <tr>
                                            <td className="sertext">Approvals</td>

                                            <td>

                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange}     checked={this.state.approvalsval}  value={this.state.approvalsval} class="custom-control-input" id="switch3" name="approvalsval" />
                                            <label className="pilladj custom-control-label" for="switch3"></label>
                                            </div>

                                            </td>

                                            {/* <td><AppSwitch value="resetval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.unlockval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"    name="getapprovalsurl" value={this.state.approvalsurl} placeholder="Please enter your endpoint url" name="approvalsurl" onChange={this.chaneName} className="form-control"/></td>

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

export default EditSNOWBotServices;
