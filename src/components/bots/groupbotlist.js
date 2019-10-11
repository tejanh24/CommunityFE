import React, { Component, lazy, Suspense } from 'react';

import {Link} from 'react-router-dom';
import {
  
    Button,
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import axios from 'axios';
import '../channels/channels.css'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class GroupBotList extends Component {
    constructor() {
        super();

        this.state = {
            previousButtonEnabled: true,
            submitButtonEnabled: false,
            myData:{},
            groupbotdisplayname:"",
            botDisplayData:[],
         //   myOldId:""
        }
         console.log(' I am from constructor');
    }

  
    onSubmitButtonClick() {
    //    alert("Submitted successfully");
        this.props.history.push("/bots/configuregroupbot");
    }

    onPreviousButtonClick() {
        this.props.history.push("/channels");
    }

    componentWillMount() {
        
        console.log("I am fromcomponentWillMount");
     
          //clear usersession
        var obj1={};
        axios.post(window.MyserviceHostUrl + '/api/tenant/deleteusersession', obj1)
        .then(res => console.log("data is" + res.data));
     

        var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
      

           var myOldId=organisation_data["_id"];
    
        
        axios.get(window.MyserviceHostUrl+'/api/tenant/organizationdata?id='+myOldId)
        .then(res => {
            console.log("data is" + res.data);
            organisation_data = res.data;
            localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));

            // updating state data back to list screen
            var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
            console.log("org data"+organisation_data);
    
            console.log('inmount groupbotlist'+organisation_data);
            if (organisation_data.hasOwnProperty('bot_groups')) {
                
                  // console.log("IF LOOP");
    
                   var botgroups=organisation_data.bot_groups;
                   var displaydata=[];
                
    
                   botgroups.forEach(myData => {
                    if(myData.isActive){
                        var tempBotDispalyData = {
                            "group_id":myData.group_id,
                            "group_display_name":myData.group_display_name,
                            "group_display_botlist":myData.group_display_botlist,
                            "testUrl":window.MychatUrl+"/groups/mouriwebchannel/"+myData.group_id
                        } 
                       displaydata.push(tempBotDispalyData);
                    }
                    
                   });
                      this.setState({
                        botDisplayData:displaydata
                      });    
                 console.log("displaynames:"+JSON.stringify(this.state.botDisplayData));
             
            }
        
        });
      
    }
    


    deleteGroupbot(group_id) {
        var organisation_data = JSON.parse(localStorage.getItem('organisation_data'));
        var x = window.confirm("Are you sure you want to delete?");
       
        const obj={
            _id:organisation_data["_id"],
            group_id: group_id
        }
        console.log("myid:"+ group_id );
        
        var turl=window.MyserviceHostUrl+"/api/tenant/deletegroupbot";
        console.log(turl);
        if(x)
        {
        axios.post(turl, obj)
        .then(function(){
            //res => console.log("data is" + res.data);
            window.location.reload();
            //this.props.history.push("/groupbotlist");
            console.log("deleted successfully");
         });
        
        }
        
      }


    render() {






        return (
            <div className="animated fadeIn">
                <Row>
                    <h4 className="header-color">Group Bot List</h4>
                </Row>
                <Row>
                    <Col xs="12" sm="6" md="12">
                           
                           
                           
                           <Card>




                            <CardBody>
            
            <br /> 
            
           

                                <Button color="primary" className="btn-color" onClick={(e) => this.onSubmitButtonClick()}> <i class="fa fa-plus">New Group Bot</i> </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <br/>    <br />        
                                <table class="table table-bordered  table-striped table-hover mt-25">
                                    <thead>
                                        <th style={{color:'#fff',backgroundColor:'#5068c2'}}>GroupBot Name</th>
                                        <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Bot Names</th>
                                        <th style={{color:'#fff',backgroundColor:'#5068c2'}}>Test Your Group Bot</th>
                                        <th style={{color:'#fff',backgroundColor:'#5068c2'}}>&nbsp;</th>
                                        
                                    </thead>
                                    <tbody>
                                        { this.state.botDisplayData.map(botdata=>{
                                          
      
                             return (
        
            
           
                              <tr>
                                  
                                  
                                  <td>{ botdata.group_display_name} </td>
                                          <td>{botdata.group_display_botlist.split(",").map(i=>{return<pre>{i}</pre>})}</td>
                                           
                                              <td align="center" valign="center"><a href={botdata.testUrl} target="_blank" title="Test Your Group Bot"><i class="fa fa-commenting-o fa-3x"></i></a> </td>  

                                            <td><Link to={"/editgroupbot/"+botdata.group_id} className="btn btn-primary" title="Edit"><i class="fa fa-edit"></i></Link>&nbsp;
                                            <Button color="primary" onClick={() => this.deleteGroupbot(botdata.group_id)} title="delete"><i class="fa fa-trash"></i></Button> </td>
                                        </tr>
 

        
          
        )}
       
       )}
					
					</tbody>
					</table>



                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* // <Row className="align-center">
                //     <Button color="primary"  >All Services In Single Bot</Button>
                //     <Button color="success" >Individual Bot for some set of services</Button>
                // </Row> */}

            </div>
        )
    }
}

export default GroupBotList;