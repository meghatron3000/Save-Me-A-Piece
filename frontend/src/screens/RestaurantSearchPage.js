import React, { Component } from 'react';
import '../style/RestaurantSearchPage.scss';
import '../style/NonProfitReq.scss';
import TimeInterval from '../components/TimeInterval'
import RestaurantResult from '../components/RestaurantResult'
import {Route} from 'react-router-dom'
import axios from 'axios'

class RestaurantSearchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            budget: 0,
            underrests:[],
            overrests:[],
            nonProfit: this.props.location.state.detail,
        }
    }

    onSubmit= () =>{
        axios.get('http://127.0.0.1:4000/api/restaurants/nearmeunder/', 
          { 
            params:{
                price: this.state.budget,
                city: this.state.nonProfit.city,
                zip_code: this.state.nonProfit.zip_code
            }
          })
        .then(function (response) {
            if(response.data.message === "OK"){
                this.setState({underrests: response.data.data});
            }
        }.bind(this));
        axios.get('http://127.0.0.1:4000/api/restaurants/nearmeover/', 
          { 
            params:{
                price: this.state.budget,
                city: this.state.nonProfit.city,
                zip_code: this.state.nonProfit.zip_code
            }
          })
        .then(function (response) {
            if(response.data.message === "OK"){
                this.setState({overrests: response.data.data});
                console.log(this.state);
            }
        }.bind(this));
}

handleBudgetChange = (e) =>{
    this.setState({budget: e.target.value})
}

handleCityChange = (e) =>{
    this.setState({localcity: e.target.value})
}

handleZipChange = (e) =>{
    this.setState({localzip: e.target.value})
}
    render() {
        console.log(this.state);
        return (
            <Route render={({ history}) => (
                <div className="find-rest-page">
                    <div className="navigation">
                        <div onClick={() => history.push({pathname: '/nphome', state: { detail: this.state.nonProfit}})}className = "nav-title"><img className="rest-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div className = "nav-title"> RESTAURANTS NEAR ME </div>
                        <div onClick={() => history.push({pathname: '/settings', state: { detail:  this.state.nonProfit, passedurl:"/nphome" } })} className = "nav-title">SETTINGS</div>
                    </div>
                    <div className="find-rest-body">
                        <div className = "results">
                            <div className="np-req-header-top">Search For Meals Near You</div>
                            <br/>
                            <span className="nearme-input">
                            <input onChange={this.handleBudgetChange} className="login-text"type="text" placeholder="Budget">
                                </input >
                            </span>
                            <button className="login-button" onClick={this.onSubmit} > 
                                <span className="button-login-name"><b>SUBMIT</b></span>
                            </button>
                            <br/><br/>
                            <br/><br/>
                            {this.state.underrests && <div className="np-req-header">Restaurant Meals Within Budget</div>}
                            {(this.state.underrests ) &&
                            <div className="all-rest-subheaders">
                                <span className="rest-subheader">Restaurant Name </span>
                                <span className="rest-subheader">Meal</span>
                                <span className="rest-subheader">Price</span>
                                <span className="rest-subheader">Servings</span>
                            </div>}
                            {this.state.underrests && this.state.underrests.map((item) =>
                                <li key={item.name+item.restaurant_email}>
                                    <RestaurantResult npName={this.state.nonProfit.name} npEmail={this.state.nonProfit.email} restEmail={item.restaurant_email} restName={item.restaurant_name} restItem={item.name} restPrice={item.price} restNumb={item.servings} />
                                </li>
                            )}
                            <br/>
                            {this.state.overrests && <div className="np-req-header">Restaurant Meals Over Budget</div>}
                            {(this.state.overrests ) &&
                            <div className="all-rest-subheaders">
                                <span className="rest-subheader">Restaurant Name </span>
                                <span className="rest-subheader">Meal</span>
                                <span className="rest-subheader">Price</span>
                                <span className="rest-subheader">Servings</span>
                            </div>}
                            {this.state.overrests && this.state.overrests.map((item) =>
                                <li key={item.name}>
                                    <RestaurantResult npName={this.state.nonProfit.name} npEmail={this.state.nonProfit.email} restEmail={item.restaurant_email} restName={item.restaurant_name} restItem={item.name} restPrice={item.price} restNumb={item.servings}/>
                                </li>
                            )}
                        </div>
                    </div>
                </div>
            )}/>

        );
    }
}

class Row extends Component {
    render() {
        return (
            <tr style={{width: '100%'}}>
            <td>{this.props.item[1]}</td>
            <td>{this.props.item[2]}</td>
            <td>{this.props.item[3]}</td>
            <td>{this.props.item[4]}</td>
            </tr>
        );}
    }

export default RestaurantSearchPage;
