import React, { Component, alert } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Alert } from 'react-alert';
import { BrowserRouter, Switch, Router, Link ,withRouter } from 'react-router-dom';
import { browserHistory, Route } from 'react-router';
import Home from './Dashboard';



class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      email: "",

    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }



onClick(e){

  this.props.history.push("./src/Dashboard");
  //  <Route path="./src/Dashboard" component={Home} />
 

}



  render() {
    const onClick = this.onClick;

    return (

      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Mouritech Community
        </p>

            <div className="App-body">
            </div>
          </header>

          <div className="App-body">
            <div className="row" id="Body">
              <div className="medium-5 columns left">
                <h4>Login</h4>

                <div className="App-body">

                  <label className="left">Email </label>


                  <input type="text" name="email" onChange={this.onChange}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.username}
                  />

                  {/* <Route path="/Dashboard" exact component={Button} /> */}
                  {/* <Router>
                    <div>
                      <Route path="/Dashboard" component={Home} />
                    </div>
                  </browserHistory> */}


<Button onClick={onClick}> Click  </Button>
                  {/* <BrowserRouter>
                    <Switch>
                    <Route path="./src/Dashboard" component={Home} />
                    </Switch>
                  </BrowserRouter> */}

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
