import React, { Component,alert } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Alert } from 'react-alert';
import { Link } from 'react-router-dom';
import { browserHistory, Router, Route } from 'react-router';
import Home from './Dashboard';



class Dashboard extends Component {

    render() {
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
                  
    
                    </div>
    
                  </div>
                </div>
    
              </div>
    
            </div>
          </div>
        );
      }
    }
    

export default Dashboard;