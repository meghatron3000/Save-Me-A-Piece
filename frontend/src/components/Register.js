import React, { Component } from 'react';
import RegisterInput from './RegisterInput'
import '../style/Login.css';
import { Route } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            url :"/nphome"
        }
    }

    // handleGet = e => {    
    //     console.log("getting");
    //     let url = "http://localhost:8000/api/get/";
    //     axios.get(url, { crossdomain: true }).then((response) => {
    //           let restaurants = response.data;
    //           console.log(restaurants);
    //       }).catch((error) => {
    //           console.log(error);
    //       });
    //   };

    render() {
        return (
            <Route render={({ history}) => (
            <div className="login-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="login-title">Register:</div>
                <br/>
                <RegisterInput icon="user" name="EMAIL"/>
                <RegisterInput icon="password" name="PASSWORD" />
                <button className="login-button" onClick={() => history.push(this.state.url)} > 
                    <span className="button-login-name">Register</span>
                </button>
                {/* <button onClick={this.handleGet}>
                    get
                </button> */}
            </div>
            )}
            />
        );
    }
}

export default Register;
