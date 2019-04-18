import React, { Component } from 'react';
import LoginInput from './LoginInput'
import '../style/Login.css';
import { Route } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            url : this.props.type
        }
    }

    onlogin(history){
        this.state.url === "rhome"?
            axios.get('http://127.0.0.1:8000/restaurants/')
            .then(function (response) {
                console.log(response)
                if(response.message === "SUCCESS"){
                    history.push(this.state.url)
                }
            })
        :
            axios.get('http://127.0.0.1:8000/non-profits/')
            .then(function (response) {
                console.log(response)
                if(response.message === "SUCCESS"){
                    history.push(this.state.url)
                }
            })
        
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
                <button className="login-button" onClick={() => this.onLogin(history)} > 
                    <span className="button-login-name">LOGIN</span>
                </button>
            </div>
            )}
            />
        );
    }
}

export default Login;
