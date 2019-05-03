import React, { Component } from 'react';
// import LoginInput from './LoginInput'
import { Route } from 'react-router-dom'
import axios from 'axios'
import '../style/LoginInput.scss';
import {FaUserAlt,FaLock} from 'react-icons/fa';

import '../style/Login.scss'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            url : this.props.type,
            email: "",
            password: ""
        }
    }

    onLogin(history){
        this.state.url === "rhome"?
        axios.get(`http://127.0.0.1:4000/api/restaurants/?where={"email":"${this.state.email}", "password":"${this.state.password}"}`, )
            .then(function (response) {
                if(response.data.message === "OK"){
                    let res = response.data.data[0];
                    let restobj = { 
                        email: res.email,
                        password: res.password,
                        name: res.name,
                        address: res.address,
                        city: res.city,
                        state: res.state,
                        zip_code: res.zip_code,
                        phone: res.phone
                  };
                    history.push({pathname: '/rhome', state: { detail: restobj}})
                    sessionStorage.setItem("login-token", restobj.email)
                }
            })
        :
            axios.get(`http://127.0.0.1:4000/api/nonprofits/?where={"email":"${this.state.email}", "password":"${this.state.password}"}`, )
            .then(function (response) {
                if(response.data.message === "OK"){
                    let res = response.data.data[0];
                    let npobj = { 
                        email: res.email,
                        password: res.password,
                        name: res.name,
                        address: res.address,
                        city: res.city,
                        state: res.state,
                        zip_code: res.zip_code,
                        phone: res.phone
                  };
                    history.push({pathname: '/nphome', state: { detail: npobj}})
                    sessionStorage.setItem("login-token", npobj.email)
                }
            })
        
    }
    
    handleEmailChange = (e) =>{
        this.setState({email: e.target.value})
    }
    handlePasswordChange = (e) =>{
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <Route render={({ history}) => (
            <div className="login-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="login-title">WELCOME BACK!</div>
                <div className="login-title">PLEASE LOGIN:</div>
                <br/>
                <div className="login-input">
                    <span className="icon">
                        <FaUserAlt/>
                    </span>
                    <input onChange={this.handleEmailChange} className="login-text"type="text" placeholder="EMAIL">
                    </input >
                </div>
                <div className="login-input">
                    <span className="icon">
                        <FaLock/>
                    </span>
                    <input onChange={this.handlePasswordChange} className="login-text"type="password" placeholder="PASSWORD">
                    </input >
                </div>
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
