import React, { Component } from 'react';
import uuid from "uuid";
import {
    Button,
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import '../components.css'
import '../channels/channels.css'
import axios from 'axios';
// import Sapbotservice from '../botservices/sapbotservices';
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!

class HRBotConfig extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            envname: "",
            appname: "Successfactors",
            appdomain: "",
            authusername: "",
            authpassword: "",
            aiplatform: "kore.ai",
            auth_type: "service_account",//basic_auth
            //added for hr bot kore ai connectivity reqd details
            kore_ai_bot_id: "",
            kore_ai_client_id: "",
            kore_ai_client_secret: "",
            kore_ai_webhook_channel: "",
            // kore_ai_bot_id:"st-d2268eb0-37ef-5645-96e7-66fe6a3764a5",
            // kore_ai_client_id:"cs-51751fd6-7709-5b51-8ab6-62fb4709c8a6",
            // kore_ai_client_secret:"FikIixpFrRyM+nSmTx7E+j2BGU2aKLl7OMGJOiGy7JA=",
            //ends here hr bot kore ai connectivity reqd details
            dailogflowfile: "",
            ai_platform_config: [],
            instances: [],
            //  isShow: true,
            editstatus:"",
            bot_id:"",
            application_config_id:"",
            errors:""
            
          
         
        }
        
       
    //    this.function1();
        this.chaneName = this.chaneName.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
       

        
        


    }

//     function1()
//     {
//         const myOldId = organisation_data["_id"];
//                     axios.get('http://localhost:8000/api/tenant/organizationdata?id='+myOldId)
//                     .then(res => {
//                         console.log("data is" + res.data);
//                         organisation_data = res.data;
//                         localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
//                         }
//                         );
//                         var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));   
//   }


validateForm() {
    
                        //alert("Form submitted");
                        
                            console.log("validate");
                              let errors = {};
                              let formIsValid = true;
    
    
    
    
                  
                  if (!this.state.appdomain) {
                    formIsValid = false;
                    errors["appdomain"] = "*Please Enter Your Domain.";
                  }
            
                 // if (typeof this.state.appdomain !== "undefined") {
                  //  if (!this.state.appdomain.match(/^[a-zA-Z0-9&.-]*$/)) {
                     // formIsValid = false;
                     // errors["appdomain"] = "*Please enter alphabets numerals and special characters.";
                   // }
                 // }
    
    
                  if (!this.state.authusername) {
                    formIsValid = false;
                    errors["authusername"] = "*Please Enter Your Basic Auth Username.";
                  }
            
                  //if (typeof this.state.authusername !== "undefined") {
                   // if (!this.state.authusername.match(/^[a-zA-Z0-9&.-@]*$/)) {
                     // formIsValid = false;
                     // errors["authusername"] = "*Please enter alphabets numerals and special characters";
                   // }
                 // }
    
                  if (!this.state.authpassword) {
                    formIsValid = false;
                    errors["authpassword"] = "*Please Enter Your Basic AUth Password.";
                  }
            
                 // if (typeof this.state.authpassword !== "undefined") {
                 //   if (!this.state.authpassword.match(/^[a-zA-Z0-9&.-@]*$/)) {
//formIsValid = false;
                  //    errors["authpassword"] = "*Please enter alphabets numerals and special characters";
                  //  }
                 // }
    
    
                  if (!this.state.kore_ai_bot_id) {
                    formIsValid = false;
                    errors["kore_ai_bot_id"] = "*Please Enter Your Bot Id.";
                  }
            
                  if (typeof this.state.kore_ai_bot_id !== "undefined") {
                    if (!this.state.kore_ai_bot_id.match(/^[a-zA-Z0-9&.-]*$/)) {
                      formIsValid = false;
                      errors["kore_ai_bot_id"] = "*Please enter alphabets numerals and special characters";
                    }
                  }
    
    
    
                  if (!this.state.kore_ai_client_secret) {
                    formIsValid = false;
                    errors["kore_ai_client_secret"] = "*Please Enter Your Client Secret.";
                  }
            
                 // if (typeof this.state.kore_ai_client_secret !== "undefined") {
    //if (!this.state.kore_ai_client_secret.match(/^[a-zA-Z0-9&.-]*$/)) {
                     // formIsValid = false;
                     // errors["kore_ai_client_secret"] = "*Please enter Alphabet characters only.";
                   // }
                 // }
    
     
                  if (!this.state.kore_ai_client_id) {
                    formIsValid = false;
                    errors["kore_ai_client_id"] = "*Please Enter Your Client Id.";
                  }
            
                //   if (typeof this.state.kore_ai_client_id !== "undefined") {
                //     if (!this.state.kore_ai_client_id.match(/^[a-zA-Z0-9&.-]*$/)) {
                //       formIsValid = false;
                //       errors["kore_ai_client_id"] = "*Please enter alphabets numerals and special characters";
                //     }
                //   } 
//if (!this.state.dailogflowfile) {
                  //  formIsValid = false;
                    //errors["dailogflowfile"] = "*Please Upload Your Dailogflowfile.";
                //  }
                
                  
    
    
                  console.log("formIsValid");    
                 this.setState({
                                errors: errors
                              });
                              return formIsValid;
                        
                       
                     }
                   
                    

                chaneName(e)
                {
                    this.setState({
                        [e.target.name]: e.target.value
                    })
                }




                

                onChangeFilehandler=event=>{
                    //alert('hi');
                        console.log(event.target.files[0]);
                        this.setState({
                            selectedFile: event.target.files[0],
                            loaded: 0
                        })
            
                        //file Uploading
                    const data = new FormData();
                   // data.append('file', this.state.selectedFile);
                    data.append('file',  event.target.files[0]);
                  
                    //data.append('filename', "narasimhasfile");
                    axios.post(window.MyserviceHostUrl+"/api/tenant/uploadmyfile", data, { 
                       // receive two    parameter endpoint url ,form data
                    }).then(res => { // then print response status
                     //   alert(JSON.stringify(res));
                        this.setState({
                            dailogflowfile:res.data.destination +"/"+ res.data.filename
                        });
                    });
            
                }




                componentWillMount()
                {
                    var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
                    //alert("organisation_data:"+organisation_data.application_config);
                   
                    var myOldId = organisation_data["_id"];
                    axios.get(window.MyserviceHostUrl+'/api/tenant/organizationdata?id='+myOldId)
                    .then(res => {
                        console.log("data is" + res.data);
                        organisation_data = res.data;
                        localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
                      
                        var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
                   

                    this.setState({
                        bot_id:uuid.v4()
                    })
                    console.log("botid in hr config:"+uuid.v4())
                    console.log("botid in hr config:"+this.state.bot_id)
                    localStorage.setItem('bot_id',this.state.bot_id); 
                    console.log("botid in hr config====:"+localStorage.getItem("bot_id"));
                    
                    if (organisation_data.hasOwnProperty('application_config')) {
                        //if (organisation_data.application_config) {
                        const appconfigdata = organisation_data.application_config;
                        //alert("appconfigdata"+appconfigdata);
                          
                        
                        appconfigdata.forEach(myData => {
                            console.log(myData);
                            
                            console.log("after condition:"+this.state.editstatus);
                            if (myData.application_name == 'Successfactors') {
                                this.setState({
                                    myData1: myData,
                                    bot_id:myData.bot_id,
                                    application_config_id:organisation_data._id
                                })
                                const x = myData.ai_platform_config.authentication;
                                console.log("x is" + JSON.stringify(x[0].dialogflow_agent_projectid));
                                this.setState({
                                   // bot_id:myData.bot_id,
                                   
                                    dailogflowfile: myData.ai_platform_config.authentication[0].dialogflow_apikey_file
                                })


                                
                                this.setState({                                    
                                    appdomain: myData.instances[0].instance_domain,
                                    authusername: myData.instances[0].auth_username,
                                    authpassword: Buffer.from(myData.instances[0].auth_password, 'base64').toString('ascii'),
                                   // authpassword: myData.instances[0].auth_password,
                                    kore_ai_bot_id: myData.ai_platform_config.authentication[0].kore_ai_bot_id,
                                    kore_ai_client_id: myData.ai_platform_config.authentication[0].kore_ai_client_id,
                                    kore_ai_client_secret: myData.ai_platform_config.authentication[0].kore_ai_client_secret
                                   

                                })
                               

                                // alert("appdomain"+this.state.appdomain);
                                localStorage.setItem('bot_id',this.state.bot_id);
                                console.log("bot id:"+localStorage.getItem('bot_id'));
                                localStorage.setItem('botservices', JSON.stringify(myData.enabled_bot_services));
                                localStorage.setItem('botchannels', JSON.stringify(myData.enabled_channels));
                                localStorage.setItem("editstatus",this.state.editstatus);
                            }
                            //this.state.ai_platform_config = this.state.myData.ai_platform_config.authentication[0].dialogflow_agent_projectid

                        });
                     }


                    }
                    );
                     // else {
                    //     this.setState({
                    //         appdomain: localStorage.getItem('appdomain'),
                    //         authusername: localStorage.getItem('authusername'),
                    //         authpassword: localStorage.getItem('authpassword'),
                    //         kore_ai_bot_id: localStorage.getItem('kore_ai_bot_id'),
                    //         kore_ai_client_id: localStorage.getItem('kore_ai_client_id'),
                    //         kore_ai_client_secret: localStorage.getItem('kore_ai_client_secret')
                    //         //  aiprojectid:localStorage.getItem('aiprojectid')
                    //     })

                    // }

                }

                onNextButtonClick(e){
                if (this.validateForm()) {
                    
                             // console.log("Form submitted");
                              
                                //alert("Form submitted");
               
                

                    // console.log(Buffer.from("Hello World").toString('base64'));

                    //this.props.history.push("/botassetservices");

                    //e.preventDefault()

                    //   var k = this.state;
                    //    localStorage.setItem("sapbotconfigdata",JSON.stringify(this.state));
                    //    const kore_ai_bot_id="st-03c5d757-bccd-5faf-87e4-ae36a05ee645";
                    //    const kore_ai_client_id="cs-51751fd6-7709-5b51-8ab6-62fb4709c8a6";
                    //    const kore_ai_client_secret="FikIixpFrRyM+nSmTx7E+j2BGU2aKLl7OMGJOiGy7JA=";
                  //  this.state.authusername = Buffer.from(this.state.authusername).toString('base64');
                    this.state.authpassword = Buffer.from(this.state.authpassword).toString('base64');
                    const { appname, appdomain, authusername, authpassword, aiplatform, dailogflowfile, aiprojectid, system, client, bot_id, kore_ai_bot_id, kore_ai_client_id, kore_ai_client_secret, instances } = this.state;
                    localStorage.setItem('appname', appname);
                    localStorage.setItem('appdomain', appdomain);
                    localStorage.setItem('authusername', authusername);

                    
                    console.log("auth pwd is...." + authpassword);
                    localStorage.setItem('authpassword', authpassword);
                    localStorage.setItem('aiplatform', aiplatform);
                    //modification for test
                    localStorage.setItem('dailogflowfile', dailogflowfile);
                    
                   localStorage.setItem('bot_id', bot_id);
                    
                    localStorage.setItem('application_config_id', this.state.application_config_id);
                    console.log("in local app config id:"+this.state.application_config_id);
                    localStorage.setItem('bot_name', "hrbot");
                    localStorage.setItem('bot_display_name', 'SUCCESSFACOTRS BOT');
                    localStorage.setItem('bot_connector_id', 'B12345678');
                    localStorage.setItem('kore_ai_bot_id', kore_ai_bot_id);
                    localStorage.setItem('kore_ai_client_id', kore_ai_client_id);
                    localStorage.setItem('kore_ai_client_secret', kore_ai_client_secret);
                    const organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
                    //alert("organisation_data"+organisation_data.organisation_id);
                    localStorage.setItem('organisation_id', organisation_data.organisation_id);

                    this.state.ai_platform_config = {
                        "ai_platform": "KORE.AI",
                        "bot_id": bot_id,
                        "bot_name" : "hr_bot",
                        "fallback_intents" : [ 
                              "input.unknown"
                         ],
                        //"bot_name": "hrbot",
                        "authentication":
                        [{
                            "kore_ai_bot_id": this.state.kore_ai_bot_id,
                            "kore_ai_client_id": this.state.kore_ai_client_id,
                            "kore_ai_client_secret": this.state.kore_ai_client_secret,
                            "kore_ai_webhook_channel": "https://bots.kore.ai/chatbot/hooks/"
                        }]
                    };

                    localStorage.setItem('ai_platform_config', JSON.stringify(this.state.ai_platform_config));
                    console.log(this.state.ai_platform_config + "ai_platform_config.........");

                    this.state.instances = [{
                        "landscape": "DEVELOPMENT",
                        //"instance_domain":"apisalesdemo2.successfactors.eu",
                        "instance_domain": this.state.appdomain,
                        "auth_type": "basic_auth",
                        "auth_username": this.state.authusername,
                        "auth_password": this.state.authpassword
                    }];
                    // alert("before stringify"+this.state.instances);
                    localStorage.setItem('instances', JSON.stringify(this.state.instances));
                    //  alert("before stringify"+JSON.stringify(this.state.instances));
                    console.log(this.state.instances + "instances.........");




                    // localStorage.setItem('aiprojectid', aiprojectid);


                    // this.state.ai_platform_config =[{
                    //     "ai_platform" : "Dialogflow",
                    //     "bot_id" : "C12345678",
                    //     "bot_name" : "sapbot",
                    //     "authentication" : [ 
                    //         {
                    //             "auth_type" : "service_account",
                    //             "dialogflow_apikey_file" : "./apiv1/config/dialogflowapiclient/samplebot-28fc7-0376c6310b80.json",
                    //             "dialogflow_agent_projectid" : "samplebot-28fc7"
                    //         }
                    // ]}];

                    //         localStorage.setItem('ai_platform_config', JSON.stringify(this.state.ai_platform_config));
                    //         console.log(this.state.ai_platform_config+"ai_platform_config.........");

                    this.props.history.push("/bots/config/hrbotservices");

                }
            }

                onPreviousButtonClick()
                {
                    this.props.history.push("/bots");
                }

                render()
                {
                    return (
                        <div>

                            <Card>
                                <CardBody>

                                    <form onSubmit={this.formSubmission}>
                                        <h4 className="header-color">Application Configuration</h4>

                                        <Row>

                                            <input type="text" value={this.state.appname} hidden name="appname" onChange={this.chaneName} className="form-control" />
                                            <Col xs="6">
                                                <div>
                                                    <lable>Landscape</lable>
                                                    <select className="form-control" name="environment">
                                                        <option value="dev">Development</option>
                                                        <option value="staging">Staging</option>
                                                        <option value="production">Production</option>
                                                        <option value="quality">Quality</option>
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col xs="6">
                                                <div>

                                                    <lable>Domain</lable>
                                                    <input type="text" value={this.state.appdomain} name="appdomain" onChange={this.chaneName} className="form-control"  autoComplete="off"/>
                                                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.appdomain}</div>

                                                </div>
                                            </Col>
                                        </Row>
                                       
                                        <Row>

                                            <Col xs="6">
                                                <div>
                                                    <lable>Basic Auth Username</lable>
                                                  
                                                    <input type="text" value={this.state.authusername} name="authusername" onChange={this.chaneName} className="form-control" autoComplete="off" />
                                                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.authusername}</div>

                                                </div>
                                            </Col>

                                            <Col xs="6">
                                                <div>
                                                    <lable>Basic Auth Password</lable>
                                                  
                                                    <input type="password" value={this.state.authpassword} name="authpassword" onChange={this.chaneName} className="form-control" autoComplete="off" />
                                                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.authpassword}</div>

                                                </div>
                                            </Col>

                                        </Row>
                                       <br/>
                                        <h4 className="header-color">Kore.AI Platform Configuration</h4>
                                        <Row>

                                            <input type="text" value={this.state.aiplatform} hidden name="aiplatform" onChange={this.chaneName} className="form-control" />
                                            <input type="text" value={this.state.auth_type} hidden name="aiprojectid" onChange={this.chaneName} className="form-control" />

                                            <Col xs="6">
                                                <div>
                                                    <lable>Bot ID</lable>
                                                    <input type="text" value={this.state.kore_ai_bot_id} name="kore_ai_bot_id" onChange={this.chaneName} className="form-control"  autoComplete="off"/>
                                                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.kore_ai_bot_id}</div>

                                                </div>
                                            </Col>
                                            <Col xs="6">
                                            <div>
                                                 
                                               <input type="file"  name="file" hidden onChange={this.onChangeFilehandler}   className="form-control" /> 
    
                                                  <input type="hidden"  value={this.state.dailogflowfile} className="form-control" />  
                                                   

                                            </div>
                                        </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="6">
                                                <div>
                                                    <lable>Client ID</lable>
                                                    <input type="text" value={this.state.kore_ai_client_id} name="kore_ai_client_id" onChange={this.chaneName} className="form-control"  autoComplete="off"/>
                                                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.kore_ai_client_id}</div>

                                                </div>
                                            </Col>
                                            <Col xs="6">
                                                <div>
                                                    <lable>Client Secret</lable>
                                                    <input type="text" value={this.state.kore_ai_client_secret} name="kore_ai_client_secret" onChange={this.chaneName} className="form-control" autoComplete="off" />
                                                    <div className="errorMsg" style={{color: "red"}}>{this.state.errors.kore_ai_client_secret}</div>

                                                </div>
                                            </Col>

                                        </Row>

                                        
                                    </form>
                                </CardBody>
                            </Card>
                            <div>
                            <input type="hidden" value={this.state.bot_id} name="bot_id" onChange={this.chaneName} className="form-control" />
                                <input type="hidden" value={this.state.application_config_id} name="application_config_id" onChange={this.chaneName} className="form-control" />
                                
                                <Row className="buttonsalign float-right">
                               
                                    <Button className="btn-color" onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>&nbsp;&nbsp;&nbsp;
                    <Button className="btn-color" onClick={(e) => this.onNextButtonClick()}>Next</Button>
                                </Row>
                            </div>
                            <br />


                        </div>
                    )
                };
         
   }   
            
export default HRBotConfig;
