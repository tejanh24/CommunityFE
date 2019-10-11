import React, { Component } from 'react';

import { Button } from 'reactstrap';


class PrivateBotServices extends Component {

    render() {
        return (
            <div>
                <div>
                    <h4 className="header-color">PrivateBotServices Page</h4>
                </div>
                <div className="text-center">
                    <h6>There are no Private Bot services</h6>
                    <Button className="justify-content-center" color="primary" >Create</Button>
                </div>
            </div>
        )
    }

}

export default PrivateBotServices;
