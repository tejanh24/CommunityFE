import React, { Component } from 'react';
import uuid from "uuid";
import axios from 'axios';


import {
   
    Button,
   
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import '../components.css'
import '../channels/channels.css'
// import Sapbotservice from '../botservices/sapbotservices';
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!


class SNOWBotConfig extends Component {
    constructor(props){
        super(props);
        this.state = {
                        appid:"B12345678",
                        appname:"SERVICENOW",
                        envname:"DEVELOPMENT",
                        appdomain:"",
                        appport:"8081",
                        botid:"B12345678",
                        botname:"snowbot",
                        aiplatform:"Dialogflow",
                        aiprojectid:"",
                        authtype:"basic_auth",
                        authusername:"",
                        authpassword:"",
                        //dailogflowfile:"",
                       // aiprojectid:"samplebot-28fc7",
                       // system:"crd",
                       // client:"100",
                       // auth_type: "service_account",
                        ai_platform_config:[],
                        bot_id:"",
                        selectedFile: null,
                        showFileUpload:true,
                        instances: [],
                        application_config_id:"" ,
                        errors:""
                        


                      //  isShow: true,
                        
                     }
        this.function1=this.function1.bind(this);
        this.chaneName = this.chaneName.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
    }

    chaneName(e){
        this.setState({
            [e.target.name] : e.target.value
           //appname: this.state.appname
        })
    }


    
   
    function1()
    {
        console.log("function1 calling");
    }
  

    onChangeFilehandler=event=>{
        //alert('hi');
        if(event.target.files[0].type == "application/json"){
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
    else{
       // alert("Please upload only valid JSON file.");
        let errors = {};
        errors["dailogflowfile"] = "*Please upload only valid JSON file.";
        this.setState({
            errors: errors
          });
    }

    }



    validateForm() {
        let errors = {};
        let formIsValid = true;
  
        if (!this.state.appdomain) {
          formIsValid = false;
          errors["appdomain"] = "*Please enter your Domain.";
        }
  
       // if (typeof this.state.appdomain !== "undefined") {
          //if (!this.state.appdomain.match(/^[a-zA-Z0-9&.-]*$/)) {
          //  formIsValid = false;
          //  errors["appdomain"] = "*Please enter alphabets numerals and special characters";
         // }
       // }

        if (!this.state.authusername) {
            formIsValid = false;
            errors["authusername"] = "*Please enter your Basic Auth Username.";
          }
    
          //if (typeof this.state.authusername !== "undefined") {
           // if (!this.state.appdomain.match(/^[a-zA-Z0-9&.-]*$/)) {
             // formIsValid = false;
            //  errors["authusername"] = "*Please enter alphabets numerals and special characters";
           // }
         // }

          if (!this.state.authpassword) {
            formIsValid = false;
            errors["authpassword"] = "*Please enter your Basic Auth Password:";
                
          }
    
          //if (typeof this.state.authpassword !== "undefined") {
           // if (!this.state.authpassword.match(/^[a-zA-Z0-9&.-:_]*$/)) {
            //  formIsValid = false;
             // errors["authpassword"] = "*Please enter secure and strong password..";
           // }
         // }

          if (!this.state.aiprojectid) {
            formIsValid = false;
            errors["aiprojectid"] = "*Please enter your Dialogflow Project Id.";
                
          }
    
          //if (typeof this.state.aiprojectid !== "undefined") {
          //  if (!this.state.aiprojectid.match(/^[a-zA-Z0-9&.-]*$/)) {
//formIsValid = false;
            //  errors["aiprojectid"] = "*Please enter alphabets numerals and special characters";
           // }
         // }

          if (!this.state.dailogflowfile) {
            formIsValid = false;
            errors["dailogflowfile"] = "*Please upload your Dialogflow API Key JSON File.";
          }

        this.setState({
            errors: errors
          });
          return formIsValid;
    


    }

    

    // onBackButtonClick() {
    //     this.props.history.push("/bots");
    // }

    componentWillMount () {
        var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
        console.log("org data"+organisation_data);

        var myOldId = organisation_data["_id"];
        axios.get(window.MyserviceHostUrl+'/api/tenant/organizationdata?id='+myOldId)
        .then(res => {
            console.log("data is" + res.data);
            organisation_data = res.data;
            localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
           
            var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
       
        
        this.setState({
            bot_id: uuid.v4()
        })
        localStorage.setItem("bot_id",this.state.bot_id);

         
        if (organisation_data.hasOwnProperty('application_config')) {

           const appconfigdata = organisation_data.application_config;
               
          console.log("application config");
      
        //const appconfigdata = recordobj.application_config;
        //data = appconfigdata.map((data) =>
       
       appconfigdata.forEach(myData=>{
        console.log(JSON.stringify(myData)+"myData....");
        if(myData.application_name == 'SERVICENOW' ){
            console.log("in if ")
            this.setState({
                myData1:myData,
                bot_id:myData.bot_id,    
                application_config_id:organisation_data._id
            })
        
        //const x = myData.ai_platform_config.authentication;
        //console.log("x is"+JSON.stringify(x[0].dialogflow_agent_projectid));
       // console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
        this.setState({
            bot_id:myData.bot_id,
            appdomain:myData.instances[0].instance_domain,
            dailogflowfile: myData.ai_platform_config.authentication[0].dialogflow_apikey_file,
            authusername:myData.instances[0].auth_username,
          //  authusername: Buffer.from(myData.instances[0].auth_username, 'base64').toString('ascii'),
            authpassword: Buffer.from(myData.instances[0].auth_password, 'base64').toString('ascii'), 
            aiprojectid:myData.ai_platform_config.authentication[0].dialogflow_agent_projectid
           // aiprojectid:myData.ai_platform_config.authentication[0].dialogflow_agent_projectid

        })
        localStorage.setItem("bot_id",this.state.bot_id);
        localStorage.setItem('botservices', JSON.stringify(myData.enabled_bot_services)); 
        localStorage.setItem('botchannels',JSON.stringify(myData.enabled_channels)); 
        
      }
        //this.state.ai_platform_config = this.state.myData.ai_platform_config.authentication[0].dialogflow_agent_projectid
        
        });
    }
}
);
         
}

 

    onNextButtonClick(e) {

        if (this.validateForm()) {
            
                     // console.log("Form submitted");
                      
                        //alert("Form submitted");
        



//console.log("data"+instances)
       // console.log(Buffer.from("Hello World").toString('base64'));
        
        //this.props.history.push("/botassetservices");

        //e.preventDefault()
        
     //   var k = this.state;
    //    localStorage.setItem("sapbotconfigdata",JSON.stringify(this.state));
    //this.state.authusername = Buffer.from(this.state.authusername).toString('base64');
    this.state.authpassword = Buffer.from(this.state.authpassword).toString('base64');
    const { appid,appname,envname, appdomain,botid,botname,aiplatform, aiprojectid, authtype, authusername, authpassword} = this.state;
    localStorage.setItem('appid', appid);
    localStorage.setItem('appname', appname);
    localStorage.setItem('envname', envname);
    localStorage.setItem('appdomain', appdomain);  
    localStorage.setItem('botid', botid);
    localStorage.setItem('botname', botname); 
    localStorage.setItem('aiplatform', aiplatform);
    localStorage.setItem('aiprojectid', aiprojectid);
    localStorage.setItem('authtype', authtype);
    localStorage.setItem('authusername', authusername);
    console.log("snowbotconfig username...."+authusername);
   // const pwd = this.state.authpassword;
   localStorage.setItem('bot_id', this.state.bot_id);
    
   console.log("auth pwd is...."+authpassword);
    localStorage.setItem('authpassword', authpassword);
  //  localStorage.setItem('aiplatform', aiplatform);
  //  localStorage.setItem('dailogflowfile', dailogflowfile);
   // localStorage.setItem('aiprojectid', aiprojectid);
  //  localStorage.setItem('system', system);
  //  localStorage.setItem('client', client);
  localStorage.setItem('application_config_id', this.state.application_config_id);
  console.log("in local app config id:"+this.state.application_config_id);


    this.state.ai_platform_config ={
        "ai_platform" : "Dialogflow",
        "bot_id" : this.state.bot_id,
        "bot_name" : "servicenow_bot",
        "fallback_intents" : [ 
               "input.unknown"
        ],
        "authentication" : [ 
            {
                "auth_type" : "service_account",
              //  "dialogflow_apikey_file" : "./apiv1/config/dialogflowapiclient/snowhelpdesk-dee62-d5defcad2037.json",
               "dialogflow_apikey_file":this.state.dailogflowfile,
              "dialogflow_agent_projectid" : this.state.aiprojectid
            }
    ]};

            localStorage.setItem('ai_platform_config', JSON.stringify(this.state.ai_platform_config));
            console.log(this.state.ai_platform_config+"ai_platform_config.........");
    
            //this.props.history.push("/bots/config/sapbotservices" );
            
        this.props.history.push("/bots/config/snowbotservices" );

      
    }
}

    onPreviousButtonClick() {
        this.props.history.push("/bots");
    }



    

    render() {
        return (
            <div>
               
                <Card>
                <CardBody> 
    
                <form onSubmit={this.formSubmission}>
                <h4 className="header-color">Application Configuration</h4>

                <input type="hidden" value={this.state.bot_id} name="bot_id" onChange={this.chaneName} className="form-control" />
                <input type= "hidden" value={this.state.appname} name="application_name" onChange={this.chaneName} className="form-control"/>
               <Row>
               <Col xs="6">  
                <div>
                <lable>Domain</lable>
                <input type= "text" value={this.state.appdomain} name="appdomain"  required minLength={0} maxLength={100}onChange={this.chaneName} className="form-control" autoComplete="off"/>
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.appdomain}</div>

                </div>
                </Col>

               {/* <Col xs="6">  
                <div> 
                <lable>Port</lable>
                <input type= "text" value={this.state.appport} name="appport" onChange={this.chaneName} className="form-control"/>
                </div>
                </Col> */}
              
                               </Row>

<Row>
              
<Col xs="6">  
                <div >
                <lable>Basic Auth Username</lable>
                <input type= "text" value={this.state.authusername} name="authusername" required minLength={0} maxLength={100} onChange={this.chaneName} className="form-control" autoComplete="off"/>
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.authusername}</div>

                </div>
                </Col>
                <Col xs="6">
                <div>
                <lable>Basic Auth Password:</lable>
                <input type= "password"  value={this.state.authpassword} name="authpassword"  required minLength={0} maxLength={100} onChange={this.chaneName} className="form-control" autoComplete="off"/>
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.authpassword}</div>

                </div>
                </Col>
                </Row>
                <br/>
               <h4 className="header-color">Google Platform Configuration</h4>

                
               
                <input type= "hidden"  value={this.state.aiplatform} name="ai_platform" onChange={this.chaneName} required minLength={0} maxLength={100} className="form-control" />
                <input type= "hidden" value={this.state.authtype} name="auth_type" onChange={this.chaneName} className="form-control"/>
                <Row>
                <Col xs="6">  
                <div>
                <lable>Dialogflow Project Id</lable>
                <input type= "text" value={this.state.aiprojectid} name="aiprojectid"  required minLength={0} maxLength={100}onChange={this.chaneName} className="form-control" autoComplete="off"/>
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.aiprojectid}</div>

   
                </div>
                </Col>

          
                <Col xs="6">
                <div>
                <lable>Dialogflow API Key File</lable>
                <input type="file"  name="file"  onChange={this.onChangeFilehandler}   accept="application/json" className="form-control" /> 
                <input type="hidden"  value={this.state.dailogflowfile} className="form-control" />  
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.dailogflowfile}</div>

                </div>
                </Col>

                </Row>









                </form>
                </CardBody>
                </Card> 
                <div>
                <input type="hidden" value={this.state.bot_id} name="bot_id" onChange={this.chaneName} className="form-control" />
                <input type="hidden" value={this.state.application_config_id} name="application_config_id" onChange={this.chaneName} className="form-control" />
                 
                <Row  className="buttonsalign float-right">
                  <Button className="btn-color"  onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>&nbsp;&nbsp;&nbsp;
                    <Button className="btn-color"  onClick={(e) => this.onNextButtonClick()}>Next</Button>
                </Row>
                </div>
               <br/>
              
               
            </div>
        )
    }

}

export default SNOWBotConfig;
