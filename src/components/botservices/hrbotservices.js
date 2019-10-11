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

class HRBotServices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // leaverequrl: "https://apisalesdemo2.successfactors.eu/odata/v2/EmployeeTime?workflowConfirmed=true",
            // timesheetsurl: "https://apisalesdemo2.successfactors.eu/odata/v2/upsert?$format=json",
            // lrapprovalurl:"https://apisalesdemo2.successfactors.eu/odata/v2/approveWfRequest?wfRequestId=1080L",
           lrrejectionurl:"/odata/v2/rejectWfRequest",
            leavebalanceurl:"/odata/v2/EmpTimeAccountBalance",
            resetpwdurl:"/odata/v2/User('103226')",
            pendingleavesurl:"/odata/v2/User('103226')",

           
            leaverequrl: "/odata/v2/EmployeeTime?workflowConfirmed=true",
            timesheetsurl: "/odata/v2/upsert?$format=json",
            lrapprovalurl:"/odata/v2/approveWfRequest?wfRequestId=1080L",

            
            leavereqval:false,
            timesheetsval:false,
            lrapproval:false,
            lrrejection:false,
            leavebalance:false,
            resetpwdval:false,
            pendingleavesval:false,
            checkedItems: new Map(),
            enabled_bot_services: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.chaneName = this.chaneName.bind(this);
    }

    componentDidMount() {
        const appname = localStorage.getItem('appname') ;
        console.log(appname+"appname");

        const botservices = JSON.parse(localStorage.getItem('botservices'));
      //  alert(":::::  BOT SERVICES   :::::::" + JSON.stringify(botservices));
        console.log("botservices......." + botservices);
        if (botservices !== null) {

            botservices.forEach(service => {
                console.log(service);

                if (service.service_code == 'hr_0001') {
                       this.setState({
                        leavereqval: true,
                        leaverequrl: service.service_end_point_url
                    })
                 }

                if (service.service_code == 'hr_0002') {
                    this.setState({
                        timesheetsval: true,
                        timesheetsurl: service.service_end_point_url
                    })
                 }

                 if (service.service_code == 'hr_0003') {
                    this.setState({
                        lrapproval: true,
                        lrapprovalurl: service.service_end_point_url
                 })
              }

             if (service.service_code == 'hr_0004') {
                 this.setState({
                    lrrejection: true,
                    lrrejectionurl: service.service_end_point_url
                 })
              }
              if (service.service_code == 'hr_0005') {
                this.setState({
                    leavebalance: true,
                    leavebalanceurl: service.service_end_point_url
             })
          }

         if (service.service_code == 'hr_0006') {
             this.setState({
                resetpwdval: true,
                resetpwdurl: service.service_end_point_url
             })
          }
          if (service.service_code == 'hr_0007') {
            this.setState({
                pendingleavesval: true,
                pendingleavesurl: service.service_end_point_url
            })
         }
            })

        }else{
           console.log('getting from localstorage');
           var enabled_bot_services = JSON.parse(localStorage.getItem("enabled_bot_services"));
           if(enabled_bot_services != null){
            enabled_bot_services.forEach(service => {
              
                if (service.service_code == 'hr_0001') {
                    this.setState({
                     leavereqval: true,
                     leaverequrl: service.service_end_point_url
                 })
              }

             if (service.service_code == 'hr_0002') {
                 this.setState({
                     timesheetsval: true,
                     timesheetsurl: service.service_end_point_url
                 })
              }

              if (service.service_code == 'hr_0003') {
                 this.setState({
                     lrapproval: true,
                     lrapprovalurl: service.service_end_point_url
              })
           }

          if (service.service_code == 'hr_0004') {
              this.setState({
                 lrrejection: true,
                 lrrejectionurl: service.service_end_point_url
              })
           }
           if (service.service_code == 'hr_0005') {
             this.setState({
                 leavebalance: true,
                 leavebalanceurl: service.service_end_point_url
          })
       }

      if (service.service_code == 'hr_0006') {
          this.setState({
             resetpwdval: true,
             resetpwdurl: service.service_end_point_url
          })
       }
       if (service.service_code == 'hr_0007') {
         this.setState({
             pendingleavesval: true,
             pendingleavesurl: service.service_end_point_url
         })
      }
            })
        }
            

        }


      }
      

  handleInputChange(event) {
    const target = event.target;
    console.log("target is"+target);
    const value = target.type === 'checkbox' ? target.checked : target.value;



    // const item = event.target.name;
    // const isChecked = event.target.checked;
    // this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
 





    console.log(value);
    const name = target.name;
    console.log(name+" and value is"+value);
    this.setState({
        [name]: value
      });
    
  }
  chaneName(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

    onBotSelect(leavereqval) {
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
        console.log(appname+"appname...and appdomain is"+appdomain + authusername + authpassword + aiplatform + client);


        console.log(JSON.stringify(this.state)+"state......"+JSON.stringify(this.state.timesheetsval));
        this.state.enabled_bot_services =[];
        
        console.log(this.state.leavereqval);
        if(this.state.leavereqval == true){
           // alert("leavereqval");
            const leavereq_obj =
                {
                    "service_name": "Leave Request",
                    "service_code": "hr_0001",
                    "service_end_point_url": "/odata/v2/EmployeeTime?workflowConfirmed=true"
                }
            
            

         //   const leavereq_obj1 = this.state.enabled_bot_services.concat(leavereq_obj);
            this.state.enabled_bot_services.push(leavereq_obj);
            console.log("leavereq obj....."+JSON.stringify(leavereq_obj));
           
            console.log("rst"+JSON.stringify(this.state.enabled_bot_services));
        }
        console.log(this.state.timesheetsval+"unl");
        if(this.state.timesheetsval == true){
            console.log("timesheets");
            const timesheets_obj =
        {
            "service_name": "Timesheet Submission",
            "service_code": "hr_0002",
            "service_end_point_url": "/odata/v2/upsert?$format=json"
        }

       // const timesheets_obj1 = this.state.enabled_bot_services.concat(timesheets_obj);
        this.state.enabled_bot_services.push(timesheets_obj);
        // this.setState({
        //     enabled_bot_services : timesheets_obj1
        // },
        // console.log("unl"+JSON.stringify(this.state.enabled_bot_services)))
        }

        
        if(this.state.lrapproval == true){
            const lrapproval_obj =
                {
                    "service_name": "Leave Request Approval",
                    "service_code": "hr_0003",
                    "service_end_point_url": "/odata/v2/approveWfRequest"
                }
            this.state.enabled_bot_services.push(lrapproval_obj);

        }

        if(this.state.lrrejection == true){
            const lrrejection_obj =
                {
                    "service_name": "Leave Request Rejection",
                    "service_code": "hr_0004",
                    "service_end_point_url": "/odata/v2/rejectWfRequest"
                }
            this.state.enabled_bot_services.push(lrrejection_obj);
            //console.log("lrrejection obj....."+JSON.stringify(lrrejection_obj));
           // console.log("rst"+JSON.stringify(this.state.enabled_bot_services));
        }

        if(this.state.leavebalance == true){
            console.log("in lb")
            const leavebalance_obj =
                {
                    "service_name": "Leave Balance",
                    "service_code": "hr_0005",
                    "service_end_point_url": "/odata/v2/EmpTimeAccountBalance"
                }
            this.state.enabled_bot_services.push(leavebalance_obj);

        }
        if(this.state.resetpwdval == true){
            const resetpwdval_obj =
                {
                    "service_name": "Reset Password",
                    "service_code": "hr_0006",
                    "service_end_point_url": "/odata/v2/User('103226')"
                }
            this.state.enabled_bot_services.push(resetpwdval_obj);

        }
        if(this.state.pendingleavesval == true){
            const pendingleavesval_obj =
                {
                    "service_name": "Pending Leave Requests",
                    "service_code": "hr_0007",
                    "service_end_point_url": "/odata/v2/User('103226')"
                }
            this.state.enabled_bot_services.push(pendingleavesval_obj);

        }

        console.log("final "+JSON.stringify(this.state.enabled_bot_services));
        const { enabled_bot_services } = this.state;
        localStorage.setItem('enabled_bot_services', JSON.stringify(enabled_bot_services));
        this.props.history.push("/bots/hrchannels" );
    }
    onPreviousButtonClick() {
        //this.props.history.push("/bots/config/hrbotservices");
        this.props.history.push("/bots/config/hrbot");
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
                            <CardHeader> HR BOT </CardHeader>
                            <CardBody>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="sertext">Leave Request</td>

                                            {/* <td>
                                            <p class="custom-control custom-switch newpillclass">
                                              <input type="checkbox" value="leavereqval"   onChange={this.handleInputChange} class="custom-control-input" id="switch2" name="example2" checked={this.state.leavereqval}/>
                                              <label class="custom-control-label" for="switch2"></label>
                                               </p>
                                            </td> */}

                                            <td>
                                            <div className="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.leavereqval} value={this.state.leavereqval}  className="custom-control-input" id="switch2" name="leavereqval" />
                                            <label className="pilladj custom-control-label" for="switch2"></label>
                                            </div>
                                            </td>

                                             {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.leavereqval} /></td> */}
                                            <td><input type= "text"    name="leaverequrl" value={this.state.leaverequrl} placeholder="Please enter your endpoint url" name="leaverequrl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>
                                        <tr>
                                            <td className="sertext">Submit Timesheets</td>

                                            <td>
                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.timesheetsval} value={this.state.timesheetsval} class="custom-control-input" id="switch1" name="timesheetsval" />
                                            <label className="pilladj custom-control-label" for="switch1"></label>
                                            </div>
                                            </td>

                                            {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.timesheetsval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"    name="timesheetsurl" value={this.state.timesheetsurl} placeholder="Please enter your endpoint url" name="timesheetsurl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>

                                        
                                        <tr>
                                            <td className="sertext">Pending Leave Requests</td>
                                            <td>
                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.pendingleavesval} value={this.state.pendingleavesval} class="custom-control-input" id="switch7" name="pendingleavesval" />
                                            <label className="pilladj custom-control-label" for="switch7"></label>
                                            </div>
                                            </td>

                                            {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.timesheetsval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"  value={this.state.pendingleavesurl} placeholder="Please enter your endpoint url" name="pendingleavesurl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>

                                            <tr>
                                            <td className="sertext">Leave Request Approval</td>
                                            <td>
                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.lrapproval} value={this.state.lrapproval} class="custom-control-input" id="switch3" name="lrapproval" />
                                            <label className="pilladj custom-control-label" for="switch3"></label>
                                            </div>
                                            </td>

                                            {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.timesheetsval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"  value={this.state.lrapprovalurl} placeholder="Please enter your endpoint url" name="lrapprovalurl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>

                                        <tr>
                                            <td className="sertext">Leave Request Rejection</td>
                                            <td>
                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.lrrejection} value={this.state.lrrejection} class="custom-control-input" id="switch4" name="lrrejection" />
                                            <label className="pilladj custom-control-label" for="switch4"></label>
                                            </div>
                                            </td>

                                            {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.timesheetsval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"  value={this.state.lrrejectionurl} placeholder="Please enter your endpoint url" name="lrrejectionurl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>
                                        <tr>
                                            <td className="sertext">Leave Balance</td>
                                            <td>
                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.leavebalance} value={this.state.leavebalance} class="custom-control-input" id="switch5" name="leavebalance" />
                                            <label className="pilladj custom-control-label" for="switch5"></label>
                                            </div>
                                            </td>

                                            {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.timesheetsval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"  value={this.state.leavebalanceurl} placeholder="Please enter your endpoint url" name="leavebalanceurl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>
                                        <tr>
                                            <td className="sertext">Reset Password</td>
                                            <td>
                                            <div class="custom-control custom-switch newpillclass">
                                            <input type="checkbox"  onChange={this.handleInputChange} checked={this.state.resetpwdval} value={this.state.resetpwdval} class="custom-control-input" id="switch6" name="resetpwdval" />
                                            <label className="pilladj custom-control-label" for="switch6"></label>
                                            </div>
                                            </td>

                                            {/* <td><AppSwitch value="leavereqval"   onChange={this.handleInputChange} className={'mx-1'} variant={'pill'} color={'primary'} checked={this.state.timesheetsval} /></td> */}
                                            {/* <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={true} /></td> */}
                                            <td><input type= "text"  value={this.state.resetpwdurl} placeholder="Please enter your endpoint url" name="resetpwdurl" onChange={this.chaneName} className="form-control"/></td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="buttonsalign1 float-right"> 
                    <Button color="primary" onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>&nbsp;&nbsp;&nbsp;
                    <Button color="primary"  onClick={(e) => this.onSubmitButtonClick()}>Next</Button>
                </Row>

            </div>
        )
    }
}

export default HRBotServices;