import React, { Component } from 'react';
import SignUpButton from './SignUpButton'
import '../style/SignUp.scss';
import '../style/LoginInput.scss';
import { Route } from 'react-router-dom';
import axios from 'axios'

class RRegister extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            address: "",
            city: "",
            state: "",
            zip_code: 0,
            phone_number: 0,
            errorMessage: "",
        }
    }

    onRegister(history){
        axios.post('http://127.0.0.1:4000/api/schedules/', 
            {email: this.state.email}
        )
        let body = { 
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip_code: this.state.zip_code,
            phone_number: this.state.phone_number
        };
        console.log(body);
        axios.post('http://127.0.0.1:4000/api/restaurants/', 
            body
        )
        .then(response => {
            console.log(response);
            if(response.data.message === "SUCCESS"){
                history.push({pathname: '/rhome', state: { detail: body}})
            }  
        }).catch(error => {
            console.log(error.response.data.message);
            this.setState({ errorMessage: error.response.data.message });
        })
}

    handleEmailChange = (e) =>{
        this.setState({email: e.target.value})
    }
    handlePasswordChange = (e) =>{
        this.setState({password: e.target.value})
    }
    handleNameChange = (e) =>{
        this.setState({name: e.target.value})
    }
    handleAddressChange = (e) =>{
        this.setState({address: e.target.value})
    }
    handleCityChange = (e) =>{
        this.setState({city: e.target.value})
    }
    handleStateChange = (e) =>{
        this.setState({state: e.target.value})
    }
    handleZipCodeChange = (e) =>{
        let num = Number(e.target.value);
        this.setState({zip_code: num})
    }
    handlePhoneNumberChange = (e) =>{
        let num = Number(e.target.value);
        this.setState({phone_number: num})
    }

    render() {
        return (
            <Route render={({history}) => (
            <div className="signup-pg">
                <div className="login-title">Register Restaurant</div>
                <p className="err-msg">
                    {this.state.errorMessage ? this.state.errorMessage : ""}
                </p>
                <br/>
                <div>
                    <span className="reg-input">
                        <input onChange={this.handleEmailChange} className="login-text"type="text" placeholder="Email"></input >
                    </span>
                    <span className="reg-input">
                        <input onChange={this.handlePasswordChange} className="login-text"type="password" placeholder="Password"></input >
                    </span>
                </div>
                <br/>
                <div>
                    <span className="reg-input">
                        <input onChange={this.handleNameChange} className="login-text"type="text" placeholder="Name"></input >
                    </span>
                    <span className="reg-input">
                        <input onChange={this.handlePhoneNumberChange} className="login-text"type="number" placeholder="Phone #"></input >
                    </span>
                </div>
                <br/>
                <br/>
                <div>
                    <span className="reg-input">
                        <input onChange={this.handleAddressChange} className="login-text"type="text" placeholder="Address"></input >
                    </span>
                    <span className="reg-input">
                        <input onChange={this.handleCityChange} className="login-text"type="text" placeholder="City"></input >
                    </span>
                    
                </div>
                <br/>
                <div>
                    <span className="reg-input">
                        <input onChange={this.handleStateChange} className="login-text"type="text" placeholder="State"></input >
                    </span>
                    <span className="reg-input">
                        <input onChange={this.handleZipCodeChange} className="login-text"type="number" placeholder="Zip Code"></input >
                    </span>
                </div>
                <br/>
                <button className="login-button" onClick={() => this.onRegister(history)} > 
                    <span className="button-login-name">REGISTER</span>
                </button>
            </div>
            )}/>
        );
    }
}

export default RRegister;
