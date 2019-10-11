import React, { Component } from 'react';

import { Button } from 'reactstrap';

class UserGroups extends Component {

    render() {
        return (
            <div>
                <div>
                    <h4>UserGroups Page</h4>
                </div>
                <div className="text-center">
                    <h6>There are no User Groups</h6>
                    <Button className="justify-content-center" color="primary">Create</Button>
                </div>
            </div>
        )
    }

}

export default UserGroups;