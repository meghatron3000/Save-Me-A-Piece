import React, { Component } from 'react';
import '../style/NonProfitReq.css';
import NPResult from '../components/NPResult'
import axios from 'axios';
import {Route} from 'react-router-dom'
class NonProfitReq extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant: this.props.location.state.detail,
            npReqs: [],
        }
    }

    componentDidMount(){
        var self = this;
        axios.get('http://127.0.0.1:8000/api/requests/', 
              { 
                params:{
                    restaurant_email: self.state.restaurant.email
                }
              })
            .then(function (response){
                if(response.data.message === "SUCCESS"){
                    self.setState({npReqs: response.data.result});
                }
            })
    }
    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-req-page">
                    <div className="navigation">
                        <div onClick={() => history.push({pathname: '/rhome', state: { detail: this.state.restaurant}})}className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div className = "r-nav-title">NON PROFIT REQUESTS</div>
                        <div onClick={() => history.push({pathname: '/menu', state: { detail: this.state.restaurant}})} className = "r-nav-title">MY MENU</div>
                        <div className = "r-nav-title">SETTINGS</div>
                    </div>
                    <div className="np-req-body">
                        <div className = "results">
                            <div className="np-req-header">Non Profit Requests</div>
                            <br/>
                            <div className="all-np-req-subheaders">
                                <span className="np-req-subheader">Non Profit Name</span>
                                <span className="np-req-subheader">Meal</span>
                                <span className="np-req-subheader">Accept/Decline</span>
                                <span className="np-req-subheader">Servings</span>
                            </div>
                            <br/>
                            {this.state.npReqs && this.state.npReqs.map((req) =>
                                <li key={req[3]}>
                                    <NPResult npName={req[3]} meal={req[4]} servings={req[5]}/>
                                </li>
                            )}
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default NonProfitReq;