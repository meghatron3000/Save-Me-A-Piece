import React, { Component } from 'react';
import SignUpButton from './SignUpButton'
import '../style/SignUp.css';
import '../style/LoginInput.css';
import { Route } from 'react-router-dom';
import axios from 'axios'

class NPRegister extends Component {

    // email = models.CharField(max_length = 100)
    // password = models.CharField(max_length = 100)
    // name = models.CharField(max_length = 100)
    // address = models.CharField(max_length = 100)
    // city = models.CharField(max_length = 100)
    // state = models.CharField(max_length = 100)
    // zip_code = models.IntegerField(default=0)
    // phone_number = models.IntegerField(default=0)

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
            phone_number: 0
        }
    }

    onRegister(history){
            let body = { 
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip_code: this.state.zip_code,
                phone: this.state.phone_number
          };
            axios.post('http://127.0.0.1:8000/api/nonprofits/', 
              body
            )
            .then(function (response) {
                console.log(response);
                if(response.data.message === "SUCCESS"){
                    history.push({pathname: '/nphome', state: { detail: body}})
                }
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
        this.setState({zip_code: e.target.value})
    }
    handlePhoneNumberChange = (e) =>{
        this.setState({phone_number: e.target.value})
    }

    render() {
        return (
            <Route render={({history}) => (
            <div className="signup-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="login-title">Register Nonprofit:</div>
                <div className="login-input">
                    <input onChange={this.handleEmailChange} className="login-text"type="text" placeholder="EMAIL">
                        </input >
                </div>
                <div className="login-input">
                    <input onChange={this.handlePasswordChange} className="login-text"type="text" placeholder="Password">
                        </input >
                </div>
                <div className="login-input">
                    <input onChange={this.handleNameChange} className="login-text"type="text" placeholder="Name">
                        </input >
                </div>
                <div className="login-input">
                    <input onChange={this.handleAddressChange} className="login-text"type="text" placeholder="Address">
                        </input >
                </div>
                <div className="login-input">
                <input onChange={this.handleCityChange} className="login-text"type="text" placeholder="City">
                    </input >
                </div>
                <div className="login-input">
                <input onChange={this.handleStateChange} className="login-text"type="text" placeholder="State">
                    </input >
                </div>
                <div className="login-input">
                <input onChange={this.handleZipCodeChange} className="login-text"type="text" placeholder="Zip">
                    </input >
                </div>
                <div className="login-input">
                    <input onChange={this.handlePhoneNumberChange} className="login-text"type="text" placeholder="Phone #">
                        </input >
                </div>
                <button className="login-button" onClick={() => this.onRegister(history)} > 
                    <span className="button-login-name">Register</span>
                </button>
            </div>
            )}/>
        );
    }
}

export default NPRegister;
