import React, { Component } from 'react';
import LoginInput from './LoginInput'
import '../style/Login.css';
import { Route } from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            url :"/nphome"
        }
    }


    render() {
        return (
            <Route render={({ history}) => (
            <div className="login-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="login-title">WELCOME BACK!</div>
                <div className="login-title">PLEASE LOGIN:</div>
                <br/>
                <LoginInput icon="user" name="EMAIL"/>
                <LoginInput icon="password" name="PASSWORD" />
                <button className="login-button" onClick={() => history.push(this.state.url)} > 
                    <span className="button-login-name">LOGIN</span>
                </button>
            </div>
            )}
            />
        );
    }
}

export default Login;
