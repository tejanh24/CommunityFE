import React, { Component } from 'react';
//import Products from './products'; 
import uuid from "uuid";
import {
  
    Button,
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import '../components.css'
import '../channels/channels.css'
import { Container, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import axios from 'axios';
//import ProductTable from './productstable';
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
 



var data;
//var SapInstances=[];

const cellEditProp = {
    mode: 'click',
    blurToSave: true
};
// import Sapbotservice from '../botservices/sapbotservices';
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!

class SAPBotConfig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            envname: "DEVELOPMENT",
            appname: "SAP",
            appdomain: "sapserver2.us.mouritech.net:8001",
            authusername: "sridivyab",
            authpassword: "D123456",
            aiplatform: "Dialogflow",
            dailogflowfile: "",
            aiprojectid: "",
            system: "crd",
            client: "100",
            auth_type: "service_account",
            ai_platform_config: {},
            //  isShow: true,
            bot_id:"",
            myData1: {},
            SapInstances:[],
            isAddProduct: false,
            error: null,
            response: {},
            product: {},
            isEditProduct: false,
            selectedFile: null,
            showFileUpload:true,
            application_config_id:"",
            errors:""
            
        }

        

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.chaneName = this.chaneName.bind(this);
        this.onNextButtonClick = this.onNextButtonClick.bind(this);
    }


    onCreate() {
        this.setState({ isAddProduct: true });
      }
    
      onFormSubmit(data) {
          console.log(data);
        // TODO : get data from database
        let productList = localStorage.getItem('products');
        let message = 'Instance has been added successfully';
        if(productList) {
          productList = JSON.parse(productList);
        } else {
          productList = [];
        }
        if(this.state.isEditProduct){
          const editProductList = productList.filter(product => product.rid !== data.rid);
          productList = editProductList;
          message = 'Instance has been updated successfully';
        } else {
          productList.sort(function(a, b) {
              return a.rid - b.rid;
          });
          let rid = 0;
          if(productList && productList.length>0) {
            rid = productList[productList.length - 1].rid
          }

          data.rid = rid + 1;
          //alert('on form submit '+data.auth_password);
        }
        //encrypt password
        data.auth_password = Buffer.from(data.auth_password).toString('base64');
        productList.push(data);
        // TODO : insert/update data to database
        localStorage.setItem('products', JSON.stringify(productList));
        this.setState({
          response: {status: 'success', message},
          isAddProduct: false,
          isEditProduct: false
        })
      }
    
      editProduct = productId => {
        const editProductList = JSON.parse(localStorage.getItem('products'));
        const editProduct = editProductList.filter(product => product.rid === productId);
        this.setState({
          product: editProduct[0],
          isEditProduct: true,
          isAddProduct: false
        });
      }

      
    chaneName(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validateForm() {
        
                let errors = {};
                let formIsValid = true;
          
                if (!this.state.aiprojectid) {
                  formIsValid = false;
                  errors["aiprojectid"] = "*Please enter your Dialogflow Project Id.";
                }
          
                // if (typeof this.state.aiprojectid !== "undefined") {
                //   if (!this.state.aiprojectid.match(/^[a-zA-Z0-9&.-]*$/)) {
                //     formIsValid = false;
                //     errors["aiprojectid"] = "*Please enter alphabet characters only.";
                //   }
                // }
        
                if (!this.state.dailogflowfile) {
                    formIsValid = false;
                    errors["dailogflowfile"] = "*Please Upload Your Dailogflowfile API Key JSON File..";
                  }
                
            
                  
                  this.setState({
                    errors: errors
                  });
                  return formIsValid;
          
        
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

    componentWillMount() {
    
    var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));

    var myOldId = organisation_data["_id"];
     axios.get(window.MyserviceHostUrl+'/api/tenant/organizationdata?id='+myOldId)
     .then(res => {
         console.log("data is" + res.data);
         organisation_data = res.data;
         localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
        
         var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
    

    console.log('inmount sapbot'+organisation_data);
     // generate bot Id     
    // var tempbotId = uuid.v4(); 
    this.setState({
        bot_id: uuid.v4()
    })
     //console.log('sap bot id  '+tempbotId);
     localStorage.setItem("bot_id",this.state.bot_id);
     
        if (organisation_data.hasOwnProperty('application_config')) {

            const appconfigdata = organisation_data.application_config;
         //   this.setState({
            
          //  })
            //alert("recordId"+organisation_data._id);
            //  const appconfigdata = recordobj.application_config;
            //data = appconfigdata.map((data) =>
            console.log(appconfigdata);
            appconfigdata.forEach(myData => {
            console.log(myData);
            
                if (myData.application_name == 'SAP') {
                     console.log("in if sapconfig ");
                    this.setState({
                        myData1: myData,
                        application_config_id:organisation_data._id
                    })

                   // alert("appconfigdata"+myData._id);    
                    const x = myData.ai_platform_config.authentication;
                    console.log("x is" + JSON.stringify(x[0].dialogflow_agent_projectid));
                    this.setState({
                        bot_id:myData.bot_id,
                        dailogflowfile: myData.ai_platform_config.authentication[0].dialogflow_apikey_file,
                        aiprojectid: myData.ai_platform_config.authentication[0].dialogflow_agent_projectid
                    })
                    console.log('inside componentDidMount '+JSON.stringify(localStorage.getItem('products')));
                    //localStorage.setItem("database_old_application_config_id",myData.id);    
                    localStorage.setItem("bot_id",this.state.bot_id);
                    localStorage.setItem('products',JSON.stringify(myData.instances));
                    localStorage.setItem('botservices', JSON.stringify(myData.enabled_bot_services));
                    localStorage.setItem('botchannels', JSON.stringify(myData.enabled_channels));
                }
                
            });
        }
    }
    );

         //this.state.ai_platform_config = this.state.myData1.ai_platform_config.authentication[0].dialogflow_agent_projectid
    }

     onBackButtonClick() {
        this.props.history.push("/bots");
    }
    //table related code



    onNextButtonClick(e) {
        if (this.validateForm()) {
            
 
        
        //this.state.products = localStorage.getItem("MyProducts");
        //alert("myPRoducts are"+this.state.products);
        //console.log("e......"+data);
        // console.log(JSON.stringify(recordobj.application_config)+"rec of app");

        //  if(appconfigdata)


        // console.log(Buffer.from("Hello World").toString('base64'));

        //this.props.history.push("/botassetservices");

        //e.preventDefault()

        //   var k = this.state;
        //    localStorage.setItem("sapbotconfigdata",JSON.stringify(this.state));this.state.myData1.instances
        //console.log(JSON.stringify(this.state.instances) + "products data is.......");
       // localStorage.setItem('instances', this.state.instances);
        //    localStorage.setItem("sapbotconfigdata",JSON.stringify(this.state));
        //console.log(JSON.stringify(this.state.instances) + "products data is.......");
       
        let instanceList = localStorage.getItem('products');
        localStorage.setItem('instances',instanceList);

        this.state.authusername = Buffer.from(this.state.authusername).toString('base64');
        this.state.authpassword = Buffer.from(this.state.authpassword).toString('base64');
        const { appname, appdomain, authusername, authpassword, aiplatform, dailogflowfile, aiprojectid, system, client } = this.state;
        localStorage.setItem('appname', appname);
        localStorage.setItem('appdomain', appdomain);
        localStorage.setItem('authusername', authusername);
        // const pwd = this.state.authpassword;


        console.log("auth pwd is...." + authpassword);
        localStorage.setItem('authpassword', authpassword);
        localStorage.setItem('aiplatform', aiplatform);
        localStorage.setItem('dailogflowfile', dailogflowfile);
        localStorage.setItem('aiprojectid', aiprojectid);
        localStorage.setItem('system', system);
        localStorage.setItem('client', client);
        localStorage.setItem("bot_id",this.state.bot_id);
        
        //localStorage.setItem('authpassword', );

        localStorage.setItem('application_config_id', this.state.application_config_id);
        console.log("in local app config id:"+this.state.application_config_id);


        this.state.ai_platform_config = {
            "ai_platform": "Dialogflow",
            "bot_id":this.state.bot_id,
            "bot_name" : "sap_bot",
            "fallback_intents" : [ 
                        "input.unknown", 
                        "forgotpassword-misseddata.forgotpassword-misseddata-fallback", 
                        "resetpassword-misseddata.resetpassword-misseddata-fallback", 
                        "unlockaccount-misseddata.unlockaccount-misseddata-fallback"
            ],
            "authentication":
            {
                "auth_type": "service_account",
                //"dialogflow_apikey_file": "./apiv1/config/dialogflowapiclient/samplebot-28fc7-0376c6310b80.json",
                "dialogflow_apikey_file": this.state.dailogflowfile,
                "dialogflow_agent_projectid": this.state.aiprojectid
            }
        };
 
        localStorage.setItem('ai_platform_config', JSON.stringify(this.state.ai_platform_config));
        console.log(this.state.ai_platform_config + "ai_platform_config.........");

        this.props.history.push("/bots/config/sapbotservices");

    }
}


    

    onPreviousButtonClick() {
        this.props.history.push("/bots");
    }
   
    render() {

        let productForm;
       
        if(this.state.isAddProduct) {
            productForm = <AddProduct onFormSubmit={this.onFormSubmit} />
          }
           
          if(this.state.isEditProduct) {
            productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
          }  
            
        
        return (

            <div>

                
                 {/* <div className="float-right">
                    <Button color="primary" onClick={() => this.onBackButtonClick()}>Back</Button>
                </div> 
                <br /><br /> */}
                <Card>
                    <CardBody>

                        <Card>
                            <CardBody>

                                <form onSubmit={this.formSubmission}>
                
                
                                    <h4 className="header-color">Application Configuration</h4>
                                    <Container>
                                    {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
                                    <div class="float-right"> {!this.state.isAddProduct  && !this.state.isEditProduct   && <Button variant="primary"   style={{color:'#fff',backgroundColor:'#5068c2'}} onClick={() => this.onCreate()}>New Instance</Button>} </div>
                                    {!this.state.isAddProduct  && !this.state.isEditProduct  && <ProductList editProduct={this.editProduct}/>}
                                    { productForm }
                                    {this.state.error && <div>Error: {this.state.error.message}</div>}
                                    </Container>

                                    
                                    <input type="hidden" value={this.state.appname} name="appname" onChange={this.chaneName} className="form-control" />
                                    <input type="hidden" value={this.state.bot_id} name="bot_id" onChange={this.chaneName} className="form-control" />
                                     
                                   
                                     

                                    {/*
                                    <BootstrapTable data={instances}   cellEdit={cellEditProp} insertRow={true} striped hover>
                                        <TableHeaderColumn isKey dataField='sapmodule'>System</TableHeaderColumn>
                                        <TableHeaderColumn dataField='landscape'>Landscape</TableHeaderColumn>
                                        <TableHeaderColumn dataField='system'>SID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='client'>Client</TableHeaderColumn>
                                        <TableHeaderColumn dataField='instance_domain'>Domain</TableHeaderColumn>
                                        <TableHeaderColumn dataField='auth_username' hidden="true">Basic Auth Username</TableHeaderColumn>
                                        <TableHeaderColumn dataField='auth_password' hidden="true">Basic Auth Password</TableHeaderColumn>
                                    </BootstrapTable>


                                     
                <Row>
                <Col xs="6">  
                <div>     
                <lable>Basic Auth Username</lable>
                <input type= "text"  value={this.state.authusername}  name="authusername" onChange={this.chaneName} className="form-control"/>
                </div>
                </Col>
                <Col xs="6">
                <div>
                <lable>Basic Auth Password</lable>
             <input type= "password"  value={this.state.authpassword} name="authpassword" onChange={this.chaneName} className="form-control"/>
                </div>
                <br/>
                </Col>
                </Row>

                <h4 className="header-color">Google Dialogflow Configuration</h4>
                <input type= "hidden" value={this.state.aiplatform} name="aiplatform" placeholder="Dialogflow" onChange={this.chaneName} className="form-control"/>
                <input type= "hidden" value={this.state.auth_type} name="aiprojectid" onChange={this.chaneName} className="form-control"/>
                */}
                                    {/* <h4 className="header-color">Google Dialogflow Configuration</h4>
                <Row> 
                <Col xs="6">  

                <Card>
                    <CardBody>

                        <form onSubmit={this.formSubmission}>
                            <h4 className="header-color">Application Configuration</h4>

                            <Row>
                                <Col xs="6">

                                    <div>

                                        <lable>Application Name</lable>
                                        <input type="text" value={this.state.appname} name="appname" onChange={this.chaneName} className="form-control" />

                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div>

                                        <lable>SAP Module</lable>
                                        <select className="form-control" name="sapmodule">
                                            <option value="crm">CRM</option>
                                            <option value="mm">MM</option>
                                            <option value="quality">QUALITY</option>
                                        </select>


                                    </div>
                                </Col>
                            </Row>
                            <br /> */}
                                    {/* <Row>
                                <Col xs="6">
                                    <div>
                                        <lable>Landscape</lable>
                                        <select className="form-control" name="landscape">
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
                                        <input type="text" value={this.state.appdomain} name="appdomain" onChange={this.chaneName} className="form-control" />
                                    </div>
                                </Col>
                            </Row>
                            <br /> */}


                                    {/* <Row>
                                <Col xs="6">
                                    <div>
                                        <lable>Basic Auth Username</lable>
                                        <input type="password" value={this.state.authusername} name="authusername" onChange={this.chaneName} className="form-control" />
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div>
                                        <lable>Basic Auth Password</lable>
                                        <input type="password" value={this.state.authpassword} name="authpassword" onChange={this.chaneName} className="form-control" />
                                    </div>
                                    <br />
                                </Col>
                            </Row> */}
                                        
                                    <h4 className="header-color">Google AI Platform Configuration</h4>
                                    {/* <Row>
                                <Col xs="6">
                                    <div>
                                        <lable>AI Platform</lable>
                                        <input type="text" value={this.state.aiplatform} name="aiplatform" placeholder="Dialogflow" onChange={this.chaneName} className="form-control" />
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div>
                                        <lable>Authentication Type</lable>
                                        <input type="text" value={this.state.auth_type} name="aiprojectid" onChange={this.chaneName} className="form-control" />
                                    </div>
                                </Col>
                            </Row> */}
                                   
                                    <Row>
                                        <Col xs="6">
                                            <div>
                                                <lable>Dialogflow Project Id</lable>
                                              
                                                <input type="text" value={this.state.aiprojectid} name="aiprojectid"  required minLength={0} maxLength={100}onChange={this.chaneName} className="form-control" autoComplete="off" />
                                                <div className="errorMsg" style={{color: "red"}}>{this.state.errors.aiprojectid}</div>

</div>
                                        </Col>


                                        <Col xs="6">
                                            <div>
                                                <lable>Dialogflow API Key File</lable>
                       
                                               <input type="file"  name="file"  onChange={this.onChangeFilehandler}   className="form-control" /> 
    
                                                  <input type="hidden"  value={this.state.dailogflowfile} className="form-control" />  
                                                  <div className="errorMsg" style={{color: "red"}}>{this.state.errors.dailogflowfile}</div>


                                            </div>
                                        </Col>

                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                        <div>
                            
                        <input type="hidden" value={this.state.application_config_id} name="application_config_id" onChange={this.chaneName} className="form-control" />

                            <Row className="buttonsalign float-right">
                                <Button className="btn-color" onClick={(e) => this.onPreviousButtonClick()}>Previous</Button>&nbsp;&nbsp;&nbsp;
                    <Button className="btn-color" onClick={(e) => this.onNextButtonClick()}>Next</Button>
                            </Row>
                        </div>
                        <br />
                    </CardBody>
                </Card>
            </div>
        )
    }

}

export default SAPBotConfig;
