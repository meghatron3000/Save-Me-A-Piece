import React, { Component } from 'react';
import '../style/NonProfitReq.css';
import {Route} from 'react-router-dom'
class SettingsPage extends Component {
    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-req-page">
                    <div className="navigation">
                        <div onClick={() => history.push("/rhome")}className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div className = "r-nav-title">NON PROFIT REQUESTS</div>
                        <div onClick={() => history.push("/menu")} className = "r-nav-title">MY MENU</div>
                        <div className = "r-nav-title">SETTINGS</div>
                    </div>
                    <div className="np-req-body">
                        <div className = "results">
                            <div className="np-req-header">Settings</div>
                            <br/>
                            <div className="">Delete Account</div>
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default SettingsPage;