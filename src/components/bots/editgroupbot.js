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


class editgroupbot extends Component {
    
    constructor(props){
        super(props);
  //      alert(this.props.match.params.group_id);
        window.selectBotsList = [];
        window.group_display_botlist=[];
        this.state = {
                        groupbotid:"",
                        groupbotdisplayname:"",
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
                        dailogflowfile:"",
                        aiprojectid:"",       
                        botDisplayData:[],
                        group_id:"",
                        errors:"",                      
                        apikeyfile:"",

                        falsechkval: false,
                        truechkval: true

                      //  isShow: true,
                        
                     }
        
        this.chaneName = this.chaneName.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
    }

    chaneName(e){
        this.setState({
            [e.target.name] : e.target.value
           //appname: this.state.appname
        })
    }
    
    validateForm() {

        let errors = {};
        let formIsValid = true;
  
        if (!this.state.groupbotdisplayname) {
          formIsValid = false;
          errors["groupbotdisplayname"] = "*Please enter your Group Bot Display Name.";
        }

        // if (typeof this.state.groupbotdisplayname !== "undefined") {
        //     if (!this.state.groupbotdisplayname.match(/^[a-zA-Z0-9&.-]*$/)) {
        //       formIsValid = false;
        //       errors["groupbotdisplayname"] = "*Please enter alphabets numerals and special characters";
        //     }
        // }
        if (!this.state.aiprojectid) {
            formIsValid = false;
            errors["aiprojectid"] = "*Please enter your Dialogflow Project ID.";
        }
        if (!this.state.dailogflowfile) {
            formIsValid = false;
            errors["dailogflowfile"] = "*Please Upload Your Dailogflowfile.";
        }

          this.setState({
            errors: errors
          });
          return formIsValid;

    }
    function1()
    {
        console.log("function1 calling");
    }
  

    onChangeFilehandler=event=>{
//        alert('hi');
            console.log(event.target.files[0]);
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0
            })

            //file Uploading
        const data = new FormData();
       // data.append('file', this.state.selectedFile);
        data.append('file',  event.target.files[0]);
      //alert(window.MyserviceHostUrl);
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
    


    componentWillMount(){

        //  var pets = ["cat", "dog", "bat"];
        //   console.log("CatTest"+pets.includes("cat"));

       var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
    //   alert(organisation_data["_id"]);
    
      console.log("data:::"+organisation_data);
        var myOldId = organisation_data["_id"];
        console.log("orgadata:"+myOldId);
        axios.get(window.MyserviceHostUrl+'/api/tenant/organizationdata?id='+myOldId)
        .then(res => {
            console.log("data is" + res.data);
          //  localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
            
          var organisation_data = res.data["data"];
          window.selectBotsList = [];
          if (organisation_data.hasOwnProperty('bot_groups')) 
          {
             const groupbotfigdata = organisation_data.bot_groups;
             console.log("application config"+organisation_data.bot_groups);
             console.log(groupbotfigdata);
             var TempbotDisplayData = [];
             groupbotfigdata.forEach(groupbotData => {
             
              console.log("DATA:"+JSON.stringify(groupbotData));
              var groupid=this.props.match.params.group_id;
              if(groupbotData.group_id==groupid)
              {
                this.setState({  
                    
                    "groupbotdisplayname":groupbotData.group_display_name,
                    "aiprojectid":groupbotData.bot_router_info.authentication[0].dialogflow_agent_projectid,
                    "dailogflowfile":groupbotData.bot_router_info.authentication[0].dialogflow_apikey_file

                  });
                  
                  window.selectBotsList = groupbotData.bots;
                  console.log('while Db Filling '+ window.selectBotsList);
                  // window.selectBotsList =  ["d7768f8c-93ac-472e-a0cb-49bc0a47d7c1","9d96c7ba-6ff8-4f71-bfcb-563318168c67"];
                  //console.log('while Db Filling updated manually '+ window.selectBotsList);
                 window.group_display_botlist = groupbotData.group_display_botlist.split(",");
                  
                
                  console.log(" while Db bot list:"+window.group_display_botlist);
             }
            });
          
         } 
         
         ///retrieving avialable bots
         if (organisation_data.hasOwnProperty('application_config')) {
            const appconfigdata = organisation_data.application_config;
            console.log("application config");
            var TempbotDisplayData = [];
           appconfigdata.forEach(myData => {
               console.log("groupname:"+this.state.groupbotdisplayname);
                var tempBotDispalyData = {
                    "bot_id":myData.bot_id,
                    "bot_display_name":myData.bot_display_name
                } 
                TempbotDisplayData.push(tempBotDispalyData);
             //console.log("TempbotDisplayData:"+TempbotDisplayData[0].group_display_botlist);
            });
             this.setState({  
             botDisplayData:TempbotDisplayData
             });

            }
        }); 
}

 

    onUpdateButtonClick(e) {
        var obj1={};
        axios.post(window.MyserviceHostUrl + '/api/tenant/deleteusersession', obj1)
        .then(res => console.log("data is" + res.data));
        
        if (this.validateForm()) {
            
             console.log("Form submitted");
             
               //alert("Form submitted");

        var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
        
      //   var id=organisation_data._id;
      //   console.log("id value:"+id);
    // var x=localStorage.getItem("group_id");
     console.log("group id value:"+this.props.match.params.group_id);
  //alert(window.group_display_botlist);
        const obj = {
            "_id":organisation_data._id,
          
            "group_id":this.props.match.params.group_id,
            "group_display_name":this.state.groupbotdisplayname,
            "group_display_botlist":window.group_display_botlist.join(),
            "bots" :window.selectBotsList,
            
            "bot_router_info" : {
            "router_type" : "dialogflow_agent",
            "authentication" : [ 
                {
                "auth_type" : "service_account",
                "dialogflow_apikey_file" : this.state.dailogflowfile,
                "dialogflow_agent_projectid" : this.state.aiprojectid
                }
                ]
            },
            "enabled_channels" : [ 
                {
                    "channel_name" : "mouriwebchannel",
                    "channel_display_name" :this.state.groupbotdisplayname,
                    "webhook_url" : window.MyserviceHostUrl+"/api/hooks/groups/mouriwebchannel/"+this.props.match.params.group_id,//p6236427-455e-45d7-99e8-af73bbee17di",
                    "live_agent_info" : {}
                }, 
                {
                    "channel_name" : "MS TEAMS",
                    "channel_display_name" : this.state.groupbotdisplayname,
                    "webhook_url" : window.MyserviceHostUrl+"/api/hooks/groups/msteams/"+this.props.match.params.group_id,//p6236427-455e-45d7-99e8-af73bbee17di",
                    "live_agent_info" : {}
                }
            ]
        }
            
        console.log("ide value:")

        console.log(JSON.stringify(obj) + "json obj is");

        axios.post(window.MyserviceHostUrl+"/api/tenant/editgroupbotdata", obj)
        .then(res =>{
            console.log("data is" + res.data);
            //  console.log(res)
            console.log("Updated successfully");
            this.props.history.push("/groupbotlist");
        });
    }
}


    handleInputChange(event) {
     

    
        const target = event.target;
        console.log("target is" + target);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        console.log(value);
        const name = target.name;
        const id=target.id;
        console.log(name + " and value is" + value +" and id is"+id);
        if (value){
            window.selectBotsList.push(id);
            window.group_display_botlist.push(name.trim());
            console.log("dummy::"+window.group_display_botlist);
        }
        else
        {
                var index =   window.selectBotsList.indexOf(id);
                var nameindex =   window.group_display_botlist.indexOf(name.trim())
                if (index > -1) {
                    window.selectBotsList.splice(index, 1);
                    window.group_display_botlist.splice(nameindex, 1);
                }
               

                // var nameindex =   window.group_display_botlist.includes(name.trim());
                // console.log("index of name:"+nameindex);
                // if (nameindex > -1) {
                //        window.group_display_botlist.splice(nameindex, 1);
                // }


        }
        console.log(window.selectBotsList);
        console.log("Handle CHange "+window.group_display_botlist);
      //  localStorage.setItem("selectBotsList",JSON.stringify(selectBotsList));
                

    }

    onPreviousButtonClick() {
        this.props.history.push("/groupbotlist");
    }



    

    render() {
        return (
            <div>
               
                <Card>
                <CardBody> 
    
                <form onSubmit={this.formSubmission}>
                <h4 className="header-color">Edit Group Bot Configuration</h4>

                
               <Row>
               
                <input type= "text" hidden value={this.state.groupbotid} name="groupbotid" onChange={this.chaneName} className="form-control"/>
              

               

              
<Col xs="6">  
                <div >
                <lable>Group Bot Display Name</lable>
                <input type= "text" value={this.state.groupbotdisplayname} name="groupbotdisplayname" required minLength={0} maxLength={100} onChange={this.chaneName} className="form-control" autoComplete="off"/>
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.groupbotdisplayname}</div>    
            </div>
                </Col>
                
                </Row>


               <br/>



               <h4 className="header-color">Group Bot Dialogflow Configuration</h4>

                
               
                <input type= "hidden"  value={this.state.aiplatform} name="ai_platform" onChange={this.chaneName} className="form-control"/>
                <input type= "hidden" value={this.state.authtype} name="auth_type" onChange={this.chaneName} className="form-control"/>
                <Row>
                <Col xs="6">  
                <div>
                <lable>Dialogflow Project Id</lable>
                <input type= "text" value={this.state.aiprojectid} name="aiprojectid" onChange={this.chaneName} className="form-control" autoComplete="off"/>
                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.aiprojectid}</div>    
                </div>
                </Col>

          
                <Col xs="6">
                <div>
                <lable>Dialogflow API Key File</lable>
                <input type="file"  name="file"  onChange={this.onChangeFilehandler}   className="form-control" /> 
                <input type="hidden"  value={this.state.dailogflowfile} className="form-control" />  
                <div className="errorMsg" style={{color: "red"}}> {this.state.errors.dailogflowfile}</div> 
                </div>
                </Col>

                </Row>
                <br/>

                <br/>
               
                <table class="table table-bordered  table-striped table-hover mt-25">

            <thead>
              <tr>
                <th style={{align:'center',color:'#fff',backgroundColor:'#5068c2'}}>List of Bots</th>
                <th style={{align:'center',color:'#fff',backgroundColor:'#5068c2'}}>Enable/Disable</th>
               
              </tr>
            </thead>
            <tbody> 
             

            { this.state.botDisplayData.map(botdata=>{
        
         console.log("list:"+botdata);
         return (
         
            <tr>
            <td>{botdata.bot_display_name}</td>
                    
            <td>
       
            
           {window.selectBotsList.includes(botdata.bot_id.toString()) ? (
                         
                             
                <input type="checkbox" onChange={this.handleInputChange}  id={botdata.bot_id} name={botdata.bot_display_name}  value={botdata.bot_id}   defaultChecked={this.state.truechkval} />
           ):(  
                 <input type="checkbox" onChange={this.handleInputChange}  id={botdata.bot_id} name={botdata.bot_display_name}  value={botdata.bot_id}  defaultChecked={this.state.falsechkval}  />
                 
           )}
            </td>

           </tr>
           
         )}
        
        )}
        
           
            </tbody>
          </table>
            

                </form>
                </CardBody>
                </Card> 
                <div>
                <Row  className="buttonsalign float-right">
                <input type="hidden" value={this.state.bot_id} name="bot_id" onChange={this.chaneName} className="form-control" />
                <input type="hidden" value={this.state.application_config_id} name="application_config_id" onChange={this.chaneName} className="form-control" />
                    <Button className="btn-color"  onClick={(e) => this.onPreviousButtonClick()}>Cancel</Button>&nbsp;&nbsp;&nbsp;
                    <Button className="btn-color"  onClick={(e) => this.onUpdateButtonClick()}>Update</Button>
                </Row>
                </div>
               <br/>

                                                                
                                       
                                       
                                        
    

              
               
            </div>
        )
    }

}

export default editgroupbot;
