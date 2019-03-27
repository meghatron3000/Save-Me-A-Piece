import React, { Component } from 'react';
import LoginButton from './LoginButton'
import '../style/Login.css';

class Login extends Component {
    render() {
        return (
            <div className="login-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="login-title">WELCOME!  </div>
                <div className="login-title">SELECT YOUR BUSINESS</div>
                <br/>
                <LoginButton icon="restaurant" color="#8CB369" name="RESTAURANT"/>
                <LoginButton icon="soup" color="#D36582" name="SOUP KITCHEN"/>
            </div>
        );
    }
}

export default Login;
