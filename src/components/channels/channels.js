// import React, { Component } from 'react';
import React, { Component, lazy, Suspense } from 'react';

import uuid from "uuid";
import {
    Button,
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import './channels.css'
import Swal from 'sweetalert2';
//import {CopyToClipboard} from 'react-copy-to-clipboard';

import axios from 'axios';

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class Channels extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slack: false,
            skype: false,
            whatsapp: false,
            mouriwebchannel: false,
            msteams: false,
            ciscoapark: false,
            enabled_channels: [],
            previousButtonEnabled: true,
            nextButtonEnabled: false,

            server_endpoint: window.MyserviceHostUrl,
            bot_id: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.myFunction=this.myFunction.bind(this);

    }


    handleInputChange(event) {
        const target = event.target;
        console.log("target is" + target);
        const value = target.type === 'checkbox' ? target.checked : target.value;

        console.log(value);
        const name = target.name;
        var mem_name;
        if (name == "mouriwebchannel")
            mem_name = "MOURIWebChannel";
        if (name == "msteams")
            mem_name = "Microsoft Teams";
        if (name == "ciscospark")
            mem_name = "Cisco Spark";
        if (name == "slack")
            mem_name = "Slack";
        if (name == "skype")
            mem_name = "Skype";
        if (name == "whatsapp")
            mem_name = "WhatsApp";

        console.log(mem_name + "mem_name is.....");
        console.log(name + " and value is" + value);

        this.setState({
            [name]: value
        });



         if(value == true){


     //   alert("this.state.bot_id" + this.state.bot_id);

        
        Swal.fire({
            title: mem_name,//"Webchat",
            text: 'Something went wrong!',
            position: 'center',  //top-end
            showCloseButton: true,
            showConfirmButton: false,
            animation: true,
            customClass: 'bounceInDown',
            showCancelButton: false,
            // oncir:function();
            // confirmButtonText: "Save",
            html: 
            "<form id = 'formValidate' class = 'formValidate' >Copy the below information and use it to define your app properties" +
                "<p text-align: left;>Webhook url:</p>" +

                "<input id = 'resolution' readonly  value="+window.MychatUrl+"/"+ name + "/" + this.state.bot_id +
                 "' name = 'resolution' type = 'text' class = 'form_input' text-align: right; required minlenght = '2' placeholder = 'webhook url for mouri platform' required style = 'width: 80%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> " + 
                 " </ br> "
                  +
                 "<i class='fa fa-clipboard' title='Copy to clipboard' aria-hidden='true' onclick='myFunction(resolution)'></i>" +
                "<i class='fa fa-info-circle' title='Help document' style='font-size:24px'></i>"+

                // "<p>Capture the following information from your Skype for Business app and enter below:</p>"+
                // "<p>App Id:</p>"+"<input id = 'date' name = 'date' type = 'text' class = 'form_input' required placeholder = 'App id' required style = 'width: 38%; height = 40%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+
                // "<p>App Password:</p>"+
                // "<input id = 'end_time' name = 'end_time' type = 'text' class = 'form_input' required placeholder = 'App Password' required style = 'width: 38%; height = 40%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+
                "</ form>",

            // preconfirm: () => {
            //     var resolution = document.getElementById('resolution').value;
            //     var date = document.getElementById('date').value;
            //     var end_time = document.getElementById('end_time').value;
            //     return [resolution, date, end_time]
            // }
        }).then((result) => {
            console.log(result.value);
        });


         }
    }

 myFunction() {
     alert("hiii")
  /* Get the text field */
  var copyText = document.getElementById("resolution");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}




    onSubmitButtonClick() {
      //  alert("on finish cli")
     //clear usersession
     var obj1={};
     axios.post(window.MyserviceHostUrl + '/api/tenant/deleteusersession', obj1)
     .then(res => console.log("data is" + res.data));
      


        console.log(JSON.stringify(this.state.mouriwebchannel) + "state......" + JSON.stringify(this.state.msteams));
        this.state.enabled_channels = [];
        console.log(this.state.mouriwebchannel);
        if (this.state.mouriwebchannel == true) {
            const mouriwebchannel_obj =
            {
                "channel_name": "mouriwebchannel",
                "channel_display_name": "SAP BOT",
                "webhook_url": this.state.server_endpoint + "/api/hooks/mouriwebchannel/" + this.state.bot_id
            }
 
            //   const reset_obj1 = this.state.enabled_bot_services.concat(reset_obj);
            this.state.enabled_channels.push(mouriwebchannel_obj);
            console.log("mouriwebchannel obj....." + JSON.stringify(mouriwebchannel_obj));

            console.log("mo" + JSON.stringify(this.state.enabled_channels));
        }
        console.log(this.state.unlockval + "unl");
        if (this.state.msteams == true) {
            console.log("unl");
            const msteams_obj =
            {
                "channel_name": "Microsoft Teams",
                "webhook_url": "http://walterbot.com/whatsapp"
            }
            this.state.enabled_channels.push(msteams_obj);
        }

        console.log("final " + JSON.stringify(this.state.enabled_channels));
        const enabled_bot_services = JSON.parse(localStorage.getItem('enabled_bot_services'));
        console.log("enabled_bot_services is" + enabled_bot_services);

        //sap table data
        const instances = JSON.parse(localStorage.getItem('instances'));
        console.log("instances data..." + instances);
        //botsdata
        const botname = localStorage.getItem('botname');

        //botconfig data
        const appname = localStorage.getItem('appname');
        const appdomain = localStorage.getItem('appdomain');

        const authusername = localStorage.getItem('authusername');
        const authpassword = localStorage.getItem('authpassword');
        const aiplatform = localStorage.getItem('aiplatform');
        const dailogflowfile = localStorage.getItem('dailogflowfile');
        const aiprojectid = localStorage.getItem('aiprojectid');
        const system = localStorage.getItem('system');
        const client = localStorage.getItem('client');
        const ai_platform_config = JSON.parse(localStorage.getItem('ai_platform_config'));

        ai_platform_config["bot_id"] = this.state.bot_id;
        console.log("in channles page...." + ai_platform_config + "......." + appname + "appname...and appdomain is" + appdomain + authusername + authpassword + aiplatform + client);

        var tempappid = Math.random() * (1000000 - 10000);
        tempappid = Math.floor(tempappid);
        console.log(tempappid + "temp app id");
       // alert("::::::::   organisation_data  1 :::::::");
        const organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
        var organisation_id = organisation_data["organisation_id"]

        //alert(":::::::::::::     INSTANCES      :::::::::::" + JSON.stringify(instances));
        //alert(":::::::::::::     TYPE INSTANCES      :::::::::::" + typeof instances);

        const obj = {
            "organisation_name": "Brambles",
            "organisation_id": organisation_id,

            "application_config": [{

                "applicatin_id": tempappid,
                "application_name": appname,
                "application_domain": appdomain,
                "bot_id": this.state.bot_id,
                "bot_name": "sap_bot",
                "bot_display_name": "IT Helpdesk Assistant",
                "bot_connector_id": "C12345678",
                "ai_platform": aiplatform,
                "auth_type": "service_account",
                "auth_username": authusername,
                "auth_password": authpassword,
                "instances": instances,
                "enabled_bot_services": enabled_bot_services,
                "enabled_channels": this.state.enabled_channels,
                "ai_platform_config": ai_platform_config
            }]
            //"ai_platform_config": ai_platform_config
        };
        console.log(JSON.stringify(obj) + "json obj is");
      

            Swal.fire({
                title: '',
                text: "Do you want to save the configuration?",
               // type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
              }).then((result) => {
                if (result.value) {
            if(localStorage.getItem("application_config_id") == null||localStorage.getItem("application_config_id") == "")
            {
                console.log("in condition checking"+localStorage.getItem("application_config_id"));
                   
               axios.post(this.state.server_endpoint + '/api/tenant/botconfig', obj)
                .then(res => console.log("data is" + res.data));
                console.log("saved successfully");
            }
            else
            {
                console.log("in condition checking"+localStorage.getItem("application_config_id"));
                obj["_id"] = localStorage.getItem("application_config_id");
                axios.post(this.state.server_endpoint + '/api/tenant/editbotconfig', obj)
                 .then(res => console.log("data is" + res.data));
                  console.log("updated successfully");
             }
     
            

        Swal.fire({
            title: "",
            text: 'Something went wrong!',
            position: 'center',
            showCloseButton: true,
            showConfirmButton: false,
            animation: true,
            customClass: 'bounceInDown',
            showCancelButton: false,
            // oncir:function();
            // confirmButtonText: "Save",
            html: "<html> <body>Your configuration successfully saved to database.<br/><a href='"+window.MychatUrl+"/mouriwebchannel/" + this.state.bot_id + "' target='_blank'>Click here to test your bot</a></body></html>",

        })
        }
        })
    }

    // onChannelSelect() {

    //     this.setState({ nextButtonEnabled: true });

    //     Swal.fire({
    //         title: "Webchat",
    //         text: 'Something went wrong!',
    //         position: 'top-end',  
    //         showCloseButton: true,     
    //         showConfirmButton: false,           
    //         animation: true,
    //         customClass: 'bounceInDown',
    //         showCancelButton: false,
    //         // oncir:function();
    //        // confirmButtonText: "Save",
    //         html: "<form id = 'formValidate' class = 'formValidate' >Copy the below information and use it to define your app properties" +
    //         "<p text-align: left;>Webhook url:</p>"+        
    //         "<input id = 'resolution' readonly  value='http://localhost:8000/api/hooks/webchat/C12345678' name = 'resolution' type = 'text' class = 'form_input' text-align: right; required minlenght = '2' placeholder = 'webhook url for mouri platform' required style = 'width: 80%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+" </ br> "+"<i class='fa fa-clipboard' title='Copy to clipboard' aria-hidden='true'></i>"+
    //         // "<p>Capture the following information from your Skype for Business app and enter below:</p>"+
    //         // "<p>App Id:</p>"+"<input id = 'date' name = 'date' type = 'text' class = 'form_input' required placeholder = 'App id' required style = 'width: 38%; height = 40%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+
    //         // "<p>App Password:</p>"+
    //         // "<input id = 'end_time' name = 'end_time' type = 'text' class = 'form_input' required placeholder = 'App Password' required style = 'width: 38%; height = 40%; padding: 12px 20px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; '/> "+
    //         "</ form>",
    //         preconfirm: () => {
    //         var   resolution = document.getElementById ('resolution'). value;
    //         var  date = document.getElementById ('date'). value;
    //         var  end_time = document.getElementById ('end_time'). value;
    //         return [resolution, date, end_time]
    //         }
    //     })

    // }

    onNextButtonClick() {
        this.props.history.push("/bots/channels/botservices");
    }

    onPreviousButtonClick() {
         this.props.history.push("/bots/config/sapbotservices");
    }


    componentDidMount() {

       // this.state.bot_id = localStorage.getItem("bot_id");
        this.setState({
            bot_id: localStorage.getItem("bot_id")
        })

        const botchannels = JSON.parse(localStorage.getItem('botchannels'));
        console.log("botchannels......." + botchannels);
        if (botchannels !== null) {
            botchannels.forEach(botservice => {
                console.log(botservice);


                if (botservice.channel_name == 'slack') {
                     this.setState({
                        slack: true
                    })
                }

                if (botservice.channel_name == 'skype') {
                     this.setState({
                        skype: true
                    })
                }

                if (botservice.channel_name == 'whatsapp') {
                     this.setState({
                        whatsapp: true
                    })
                }

                if (botservice.channel_name == 'mouriwebchannel') {
                     this.setState({
                        mouriwebchannel: true
                    })
                }

                if (botservice.channel_name == 'msteams') {
                     this.setState({
                        msteams: true
                    })
                }


                if (botservice.channel_name == 'ciscoapark') {
                     this.setState({
                        ciscoapark: true
                    })
                }
            });
        }


    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <h4 >CHANNELS</h4>
                </Row>
                <Row>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white cardstyle" >
                            <CardBody className="pb-0">
                                {/* <div className="pillclass"><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} onClick={() => this.onChannelSelect()} /></div> */}
                                <div className="custom-control custom-switch newpillclass">
                                    <input type="checkbox" onChange={this.handleInputChange} checked={this.state.slack} value={this.state.slack} className="custom-control-input" id="switch2" name="slack" />
                                    <label className="custom-control-label" for="switch2"></label>
                                </div>
                                <img className="imgaline" src={'assets/img/channels/Slack.png'} alt="" width="45" height="50" />
                                <div className="imgtext">   Slack</div>

                            </CardBody>

                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white cardstyle" >

                            <CardBody className="pb-0">
                                <div class="custom-control custom-switch newpillclass">
                                    <input type="checkbox" onChange={this.handleInputChange} checked={this.state.skype} value={this.state.skype} class="custom-control-input" id="switch1" name="skype" />
                                    <label class="custom-control-label" for="switch1"></label>
                                </div>
                                <img className="imgaline" src={'assets/img/channels/SkypeLogo.png'} alt="" width="50" height="50" />
                                <div className="imgtext">   Skype</div>

                            </CardBody>

                        </Card>
                    </Col>


                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white cardstyle" >
                            <CardBody className="pb-0">
                                <div class="custom-control custom-switch newpillclass">
                                    <input type="checkbox" onChange={this.handleInputChange} value={this.state.whatsapp} checked={this.state.whatsapp} class="custom-control-input" id="switch3" name="whatsapp" />
                                    <label class="custom-control-label" for="switch3"></label>
                                </div>
                                <img className="imgaline" src={'assets/img/channels/WhatsAppLogo.png'} alt="" width="50" height="50" />
                                <div className="imgtext">   WhatsApp</div>

                            </CardBody>

                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white cardstyle" >
                            <CardBody className="pb-0">
                                <div class="custom-control custom-switch newpillclass">
                                    <input type="checkbox" onChange={this.handleInputChange} checked={this.state.mouriwebchannel} value={this.state.mouriwebchannel} class="custom-control-input" id="switch4" mem_name='ABC' name="mouriwebchannel" />
                                    <label class="custom-control-label" for="switch4"></label>
                                </div>
                                <img className="imgaline" src={'assets/img/channels/MouriWebChat.png'} alt="" width="50" height="50" />
                                <div className="imgtext">   MOURIWebChannel</div>

                            </CardBody>

                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white cardstyle" >
                            <CardBody className="pb-0">
                                <div class="custom-control custom-switch newpillclass">
                                    <input type="checkbox" onChange={this.handleInputChange} value={this.state.msteams} checked={this.state.msteams} class="custom-control-input" id="switch5" name="msteams" />
                                    <label class="custom-control-label" for="switch5"></label>
                                </div>
                                <img className="imgaline" src={'assets/img/channels/MsTeams.png'} alt="" width="50" height="50" />
                                <div className="imgtext"> Microsoft Teams</div>

                            </CardBody>

                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white cardstyle" >
                            <CardBody className="pb-0">
                                <div class="custom-control custom-switch newpillclass">
                                    <input type="checkbox" onChange={this.handleInputChange} value={this.state.ciscoapark} checked={this.state.ciscoapark} class="custom-control-input" id="switch6" name="ciscospark" />
                                    <label class="custom-control-label" for="switch6"></label>
                                </div>
                                <img className="imgaline" src={'assets/img/channels/CiscoSpark.png'} alt="" width="50" height="50" />
                                <div className="imgtext">  Cisco Spark</div>

                            </CardBody>

                        </Card>
                    </Col>

                    {/* <Col xs="12" sm="6" lg="3">
                        <Card className="text-black bg-white" >
                            <CardBody className="pb-0">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>
                                                    <img src={'assets/img/channels/SkypeForBusinessLogo.png'} alt="" width="50" height="50" />
                                                </span>
                                                <span>
                                                    MouriWebChat
                                                </span>
                                            </td>
                                            <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} onClick={() => this.onChannelSelect()} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>

                        </Card>
                    </Col> */}


                </Row>





                <Row className="buttonsalign float-right">
                    
                    <Button color="primary" onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>&nbsp;&nbsp;&nbsp;
                    <Button color="primary" onClick={(e) => this.onSubmitButtonClick()}>Finish</Button>
                    
                    {/* <Button color="primary" disabled={!this.state.nextButtonEnabled} onClick={(e) => this.onNextButtonClick()}>Next</Button> */}
                </Row>





            </div >
        )
    }
}

export default Channels;
