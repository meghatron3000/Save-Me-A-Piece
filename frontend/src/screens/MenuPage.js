import React, { Component } from 'react';
import '../style/NonProfitReq.css';
import {Route} from 'react-router-dom'
import EditableMenuItem from '../components/EditableMenuItem';
class MenuPage extends Component {
    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-req-page">
                    <div className="navigation">
                        <div onClick={() => history.push("/rhome")}className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div onClick={() => history.push("/np-req")} className = "r-nav-title">NON PROFIT REQUESTS</div>
                        <div className = "r-nav-title">MY MENU</div>
                        <div className = "r-nav-title">SETTINGS</div>
                    </div>
                    <div className="np-req-body">
                        <div className = "results">
                            <div className="np-req-header">My Menu</div>
                            <br/>
                            <div className="all-np-req-subheaders">
                                <span className="np-req-subheader">Menu Item</span>
                                <span className="np-req-subheader">Price Per Meal</span>
                                <span className="np-req-subheader">Recommended Price</span>
                                <span className="np-req-subheader">Servings</span>
                            </div>
                            <br/>
                            <EditableMenuItem item="Daily Bread" price="5.00" servings="15"/>
                            <EditableMenuItem item="Feeding Our Kids" price="5.00" servings="15"/>
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default MenuPage;