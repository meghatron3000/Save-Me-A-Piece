import React, { Component } from 'react';
import '../style/RestaurantSearchPage.css';
import TimeInterval from '../components/TimeInterval'
import RestaurantResult from '../components/RestaurantResult'
class RestaurantSearchPage extends Component {
    render() {
        return (
            <div className="find-rest-page">
                <div className="navigation">
                    <div className = "nav-title"><img alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                    <div className = "nav-title">RESTAURANTS NEAR ME</div>
                    <div className = "nav-title">SETTINGS</div>
                </div>
                {/* <div className="header-div">
                    <span className="ti-header">
                        <span className="header">TIME INTERVAL: </span>
                        <TimeInterval/>
                    </span>
                    <span className="header">SORT: </span>
                    <select>
                        <option value="none">No Filter</option>
                        <option value="alpha">Alphabetical</option>
                        <option value="ltoh">Low To High</option>
                        <option value="htol">High To Low</option>
                    </select>
                    
                </div> */}
                <div className = "results">
                    <div className="rest-header">Restaurant Meals Within Budget</div>
                    <div>
                        <span className="rest-subheader">Restaurant Name </span>
                        <span className="rest-subheader">Meal</span>
                        <span className="rest-subheader">Price Per Meal </span>
                        <span className="rest-subheader"># of Meals </span>
                    </div>
                    <div className="rest-header">Other Options</div>
                </div>
            </div>
        );
    }
}

export default RestaurantSearchPage;
