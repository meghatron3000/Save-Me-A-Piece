import React, { Component } from 'react';
import '../style/NonProfitReq.scss';
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
        let email = sessionStorage.getItem("login-token");
        console.log(email);
        axios.get(`http://127.0.0.1:4000/api/requests/${email}`)
            .then(function (response){
                console.log(response);
                if(response.data.message === "SUCCESS"){
                    self.setState({npReqs: response.data.data});
                }
            })
    }

    sendAcceptEmail=(req)=>{
        let npReqs = this.state.npReqs;
        npReqs.filter(req1 => req1.name !== req.name)
        this.setState({npReqs})
        axios.delete(`http://127.0.0.1:4000/api/requests/${req.nonprofit_email}/${req.restaurant_email}/${req.dish}`
          )
        .then(function (response){
            console.log(response);
        })
    }

    sendRejectEmail=(req)=>{
        let npReqs = this.state.npReqs;
        npReqs.filter(req1 => req1.name !== req.name)
        this.setState({npReqs})
        axios.delete(`http://127.0.0.1:4000/api/requests/${req.nonprofit_email}/${req.restaurant_email}/${req.dish}`
          )
        .then(function (response){
            console.log(response);
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
                        <div onClick={() => history.push({pathname: '/settings', state: { detail:  this.state.restaurant, passedurl:"/rhome" } })} className = "r-nav-title">SETTINGS</div>
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
                                <li key={req.nonprofit_email}>
                                    <NPResult onClickAccept={() => this.sendAcceptEmail(req)} onClickReject={() => this.sendRejectEmail(req)} npName={req.nonprofit_name} meal={req.dish} servings={req.servings}/>
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