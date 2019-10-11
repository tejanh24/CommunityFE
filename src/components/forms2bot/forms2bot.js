import React, { Component } from 'react';

import { Button } from 'reactstrap';


import { Player } from 'video-react';
import video from './2019_07_03_13_10_55.mp4'

class Forms2Bot extends Component {

    render() {
        return (
            <div>
                <div>
                    <h4 className="header-color">Forms2Bot Page</h4>
                </div>

                <link
                rel="stylesheet"
                href="https://video-react.github.io/assets/video-react.css"
                />
                <div className="text-center">
                    <h5>There are no Forms</h5>
                    <h6>Create a Form and Setup input field validations</h6>
                    <Button className="justify-content-center" color="primary" >Create</Button>
                </div>
                <Player fluid={false} width={300} height={150} >
                <source src={video} />
              </Player>
          
            </div>
        )
    }

}

export default Forms2Bot;
