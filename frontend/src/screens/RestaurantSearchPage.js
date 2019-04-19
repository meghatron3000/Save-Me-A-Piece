import React, { Component } from 'react';
import '../style/RestaurantSearchPage.css';
import TimeInterval from '../components/TimeInterval'
import RestaurantResult from '../components/RestaurantResult'
import {Route} from 'react-router-dom'
class RestaurantSearchPage extends Component {
    render() {
        return (
            <Route render={({ history}) => (
                <div className="find-rest-page">
                    <div className="navigation">
                        <div onClick={() => history.push("/nphome")}className = "nav-title"><img className="rest-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div className = "nav-title">RESTAURANTS NEAR ME</div>
                        <div className = "nav-title">SETTINGS</div>
                    </div>
                    <div className="find-rest-body">
                        <div className="header-div">
                            <span className="ti-header">
                                <span className="header">TIME INTERVAL: </span>
                                <TimeInterval/>
                            </span>
                            <span className="header">SORT: </span>
                            <select className="sort-select">
                                <option value="none">No Filter</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="ltoh">Low To High</option>
                                <option value="htol">High To Low</option>
                            </select>
                            
                        </div>
                        <div className = "results">
                            <div className="rest-header">Restaurant Meals Within Budget</div>
                            <br/>
                            <div className="all-rest-subheaders">
                                <span className="rest-subheader">Restaurant Name </span>
                                <span className="rest-subheader">Meal</span>
                                <span className="rest-subheader">Price Per Meal </span>
                                <span className="rest-subheader"># </span>
                            </div>
                            <br/>
                            <RestaurantResult restName="Bangkok Thai" restItem="Pad Thai" restPrice="$5.00" restNumb="15"/>
                            <RestaurantResult restName="Bangkok Thai" restItem="Pad See Ew" restPrice="$4.00" restNumb="13"/>
                            <br/><br/>
                            <div className="rest-header">Other Options</div>
                            <br/>
                            <RestaurantResult restName="Bangkok Thai" restItem="Panang Curry" restPrice="$8.00" restNumb="7"/>
                        </div>
                    </div>
                </div>
            )}/>

        );
    }
}
export default RestaurantSearchPage;
