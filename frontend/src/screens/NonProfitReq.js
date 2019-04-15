import React, { Component } from 'react';
import '../style/NonProfitReq.css';
import NPResult from '../components/NPResult'
import {Route} from 'react-router-dom'
class NonProfitReq extends Component {
    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-req-page">
                    <div className="navigation">
                        <div onClick={() => history.push("/rhome")}className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div className = "r-nav-title">NON PROFIT REQUESTS</div>
                        <div className = "r-nav-title">MY MENU</div>
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
                            <NPResult npName="Daily Bread" meal="Pad Thai" servings="15"/>
                            <NPResult npName="Feeding Our Kids" meal="Pad Thai"servings="15"/>
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default NonProfitReq;