import React, { Component } from 'react';
import '../style/TimeInterval.scss';
import axios from 'axios';

class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            passedurl: this.props.url,
            requrl: 'http://127.0.0.1:4000/api/restaurants/'+this.props.acc.email,
            password: "",
            address: "",
            city: "",
            state: "",
            name: "",
            phone: 0,
            zip_code: 0
        }
        console.log(this.state);
    }

    componentDidMount =() => {
        if (this.state.passedurl === '/nphome'){
            this.setState({requrl: 'http://127.0.0.1:4000/api/nonprofits/'+this.props.acc.email})
            axios.get('http://127.0.0.1:4000/api/nonprofits/'+this.props.acc.email, )
            .then((response)=> {
                this.setState({password: response.data.data.password})
                this.setState({address: response.data.data.address})
                this.setState({city: response.data.data.city})
                this.setState({state: response.data.data.state})
                this.setState({name: response.data.data.name})
                this.setState({phone: response.data.data.phone})
                this.setState({zip_code: response.data.data.zip_code})
                this.setState({email: response.data.data.email})
                console.log(response.data.data);
        })
        }else {
            axios.get(this.state.requrl, )
            .then((response)=> {
                this.setState({password: response.data.data.password})
                this.setState({address: response.data.data.address})
                this.setState({city: response.data.data.city})
                this.setState({state: response.data.data.state})
                this.setState({name: response.data.data.name})
                this.setState({phone: response.data.data.phone})
                this.setState({zip_code: response.data.data.zip_code})
                this.setState({email: response.data.data.email})
                console.log(response.data.data);
            })
        }
    }

    handleChangPass=()=>{
        let body = { 
            password: this.state.password
        };
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    handlePassInput=(e)=>{
        this.setState({password: e.target.value})
    }

    handleAddInput=(e)=>{
        this.setState({address: e.target.value})
    }

    handleStateInput=(e)=>{
        this.setState({state: e.target.value})
    }

    handleNameInput=(e)=>{
        this.setState({name: e.target.value})
    }

    handleZipInput=(e)=>{
        this.setState({zip_code: e.target.value})
    }

    handleCityInput=(e)=>{
        this.setState({city: e.target.value})
    }

    handlePhoneInput=(e)=>{
        this.setState({phone: e.target.value})
    }

    handleChangAdd=()=>{
        let body = { 
            address: this.state.address
        };
        console.log(this.state.requrl, body);
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    handleChangeCity=()=>{
        let body = { 
            city: this.state.city
        };
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    handleChangeState=()=>{
        let body = { 
            state: this.state.state
        };
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    handleChangeZip=()=>{
        let body = { 
            zip_code: this.state.zip_code
        };
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    handleChangeName=()=>{
        let body = { 
            name: this.state.name
        };
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    handleChangePhone=()=>{
        let body = { 
            phone_number: this.state.phone
        };
        axios.put(this.state.requrl, 
        body
      )
      .then(function (response) {
          console.log(response)
      })
    }

    render() {
        return (
        <div>
            <br></br>
            <div>
                <span className="account-des" >
                    Email: {this.state.email}
                </span>
            </div>
            <br/>
            <div>
                <span className="account-des" >
                    Change Password: <input type="password" onChange={this.handlePassInput} value={this.state.password}></input>
                    <button className="login-button" onClick={() => this.handleChangPass()} >Change</button>
                </span>
            </div>
            <div>
                <span className="account-des" >
                    Change Name: <input type="text" onChange={this.handleNameInput} value={this.state.name}></input>
                    <button className="login-button" onClick={() =>this.handleChangeName()} >Change</button>
                </span>
            </div>
            <div>
                <span className="account-des" >
                    Change Address: <input type="text" onChange={this.handleAddInput} value={this.state.address}></input>
                    <button className="login-button" onClick={this.handleChangAdd} >Change</button>
                </span>
            </div>
            <div>
                <span className="account-des" >
                    Change City: <input type="text" onChange={this.handleCityInput} value={this.state.city}></input>
                    <button className="login-button" onClick={() =>this.handleChangeCity()} >Change</button>
                </span>
            </div>
            <div>
                <span className="account-des" >
                    Change Zip Code: <input type="number" onChange={this.handleZipInput} value={this.state.zip_code}></input>
                    <button className="login-button" onClick={() =>this.handleChangeZip()} >Change</button>
                </span>
            </div>
            <div>
                <span className="account-des" >
                    Change State: <input type="text" onChange={this.handleStateInput} value={this.state.state}></input>
                    <button className="login-button" onClick={() =>this.handleChangeState()} >Change</button>
                </span>
            </div>
            <div>
                <span className="account-des" >
                    Change Phone Number: <input type="number" onChange={this.handlePhoneInput} value={this.state.phone}></input>
                    <button className="login-button" onClick={() =>this.handleChangePhone()} >Change</button>
                </span>
            </div>
        </div>
        );
    }
}

export default Account;
