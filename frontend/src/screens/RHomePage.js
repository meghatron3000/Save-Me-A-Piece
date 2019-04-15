import React, { Component } from 'react';
import HomeButton from '../components/HomeButton'
import '../style/RHomePage.css';
import {Route} from 'react-router-dom'
class RHomePage extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    render() {
        return (
            <Route render={({ history}) => (
                <div className="r-home-page">
                    <div className="r-navigation">
                        <div className = "r-nav-title">WELCOME {this.props.name}!</div>
                        <div onClick={() => history.push("/np-req")} className = "r-nav-title">NON PROFIT REQUESTS</div>
                        <div className = "r-nav-title">MY MENU</div>
                        <div className = "r-nav-title">SETTINGS</div>
                    </div>
                    <div>
                        <img alt="Save Me A Piece" src={require('../logo.png')}/>
                        <div className="r-home-title">SAVE ME A PIECE</div>
                        <HomeButton url="/rest-search" name="NON PROFITS NEAR ME"/>
                    </div>
                </div>
            )}/>
        );
    }
}

export default RHomePage;
