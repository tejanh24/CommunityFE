// import React, { Component } from 'react';



import React, { Component, lazy, Suspense } from 'react';
import {
     Card, CardBody, Col,
    Row
} from 'reactstrap';

import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import axios from 'axios';
//Images
import logo from './Images/successfactors.png';
import servicenowimg from './Images/servicenow.png';
import sapimg from './Images/sap.png';
 import rpaBot from './Images/rpabot.png';

import '../components.css';



const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class Bots extends Component {
    constructor(props) {
        super(props);
        //this.onBotSelect = this.onBotSelect.bind(this);

        this.state = {
            nextButtonEnabled: false,
            botname:""
            
        }
    }

    onBotSelect(botname) {
        //this.props.history.push("/bots/channels");
      
        console.log(botname);
        // this.setState({
        //     botname:botname
            
        // })
  //      console.log("after dat"+this.state.botname);

       // const { botname1 } = this.state;
        localStorage.setItem('botname',botname);
        console.log("after"+botname);
        this.props.history.push("/bots/config/" + botname);
        // var returnedValue = window.confirm("Do you want to enable " + botname);

        // if (returnedValue == true) {
        //     this.props.history.push("/bots/channels");
        //     this.setState({ nextButtonEnabled: true });
        // }
        // else {
        //     this.setState({ nextButtonEnabled: false });
        // }
    }

    onNextButtonClick() {
        this.props.history.push("/channels");
    }



    onOptionsButtonClick(botname) {
        // alert("options button is clicked on " + botname);
        this.props.history.push("/bots/config/" + botname);
    }

   componentDidMount(){
    console.log("HERE BEFORE REQUEST ")
        var organisation_data = JSON.parse(localStorage.getItem('user_data'));
        var myOldId = organisation_data["userId"];
        
        axios.get(window.MyserviceHostUrl+'api/tenant/organizationdata?id='+myOldId)
        .then(res => {
            console.log("data is" + res.data);
            organisation_data = res.data;
            localStorage.setItem('organisation_data', JSON.stringify(res.data["data"]));
            }
            );
        var organisation_data = localStorage.getItem('organisation_data');
        console.log("org data"+organisation_data);
   }

    render() {
        return (
            <div className="animated fadeIn">
                
               
{/* <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>  */}
                <Row>
                    {/* <h6>Select a bot to configure</h6> */}
                </Row>
                <Row>

                    <Col xs="12" sm="6" lg="3" >
                        <Card className="cardstyle text-black bg-white " >
                            <CardBody className="pb-0">
                                {/* <div className="float-right" onClick={() => this.onOptionsButtonClick("snowbot")}>
                                    <i className="fa fa-cog"></i>
                                </div> */}
                                <div className="botname text-value" onClick={() => this.onBotSelect("snowbot")}>SNOW BOT</div>
                                {/* <div onClick={() => this.onBotSelect("SNOW BOT")}>(ServiceNow)</div> */}
                                <img className="botimg" title='Please click here' src={servicenowimg} alt="Service Now" onClick={() => this.onBotSelect("snowbot")} />
                            </CardBody>
                            <div className="chart-wrapper mx-3"  onClick={() => this.onBotSelect("snowbot")}>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="cardstyle text-black bg-white" >
                            <CardBody className="pb-0">
                                {/* <div className="float-right" onClick={() => this.onOptionsButtonClick("hrbot")}>
                                    <i className="fa fa-ellipsis-h"></i>
                                    <i className="fa fa-cog"></i>
                                </div> */}
                                <div className="botname text-value" onClick={() => this.onBotSelect("hrbot")}>HR BOT</div>
                                <img className="botimg" title='Please click here' src={logo}  alt="HR" onClick={() => this.onBotSelect("hrbot")} />
                                {/* <div onClick={() => this.onBotSelect("HR BOT")}>(Successfactors)</div> */}
                            </CardBody>
                            <div className="chart-wrapper mx-3"  onClick={() => this.onBotSelect("hrbot")}>
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="cardstyle text-black bg-white" >
                            <CardBody className="pb-0">
                                {/* <div className="float-right" onClick={() => this.onOptionsButtonClick("sapbot")}>
                                <i className="fa fa-cog"></i>
                                </div> */}
                                <div className="botname text-value" onClick={() => this.onBotSelect("sapbot")}>SAP BOT</div>
                                <img className="botimg" title='Please click here' src={sapimg} alt="SAP" title='Please click here' onClick={() => this.onBotSelect("sapbot")} />
                                {/* <div onClick={() => this.onBotSelect("SAP BOT")}>(SAP)</div> */}
                            </CardBody>
                            <div className="chart-wrapper mx-3"  onClick={() => this.onBotSelect("sapbot")}>
                            </div>
                        </Card>
                    </Col>



                </Row>

                {/* <Row className="buttonsalign float-right">
                    <Button color="primary" className="nextbtnbots" disabled={!this.state.nextButtonEnabled} onClick={(e) => this.onNextButtonClick()}>Next</Button>
                </Row> */}

                {/* <div class="tabbable">
                <ul class="nav nav-tabs wizard">
<li class="completed"><a href="#" data-toggle="tab" aria-expanded="false"><span class="nmbr">1</span>Bot</a></li>
<li class="completed"><a href="#" data-toggle="tab" aria-expanded="false"><span class="nmbr">2</span>Configuration</a></li>
<li class="active"><a href="#" data-toggle="tab" aria-expanded="true"><span class="nmbr">3</span>Services</a></li>
<li><a href="#finish" data-toggle="tab" aria-expanded="true"><span class="nmbr">4</span>Channels</a></li>
</ul>
</div> */}

            </div>
        )
    }
}

export default Bots;
