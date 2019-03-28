import React, { Component } from 'react';
import '../style/RestaurantSearchPage.css';
import TimeInterval from '../components/TimeInterval'
class RestaurantSearchPage extends Component {
    render() {
        return (
            <div className="find-rest-page">
                <div className="navigation">
                    <div className = "nav-title"><img alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                    <div className = "nav-title">RESTAURANTS NEAR ME</div>
                    <div className = "nav-title">SETTINGS</div>
                </div>
                <div>
                    <TimeInterval/>
                </div>
            </div>
        );
    }
}

export default RestaurantSearchPage;
