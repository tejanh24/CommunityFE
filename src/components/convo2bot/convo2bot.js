import React, { Component } from 'react';

import walterbotImg from './walterbot.PNG'

import '../components.css';
class Convo2Bot extends Component {

    render() {
        return (
            <div>
                 <div>
                    <h4 className="header-color">Test Your Bot</h4>
                </div>
                {/* <div className="text-center">
                    
                    <Button className="justify-content-center" color="primary" onClick={() => this.onBackButtonClick()}>Upload Conversation</Button>
                    AND
                    <Button className="justify-content-center" color="success" >Upload API's as JSON</Button> <br /> 
                    <br /> 

                </div> */}
              <img className="screen" src={walterbotImg} alt="" />

            </div >
        )
    }

}

export default Convo2Bot;
