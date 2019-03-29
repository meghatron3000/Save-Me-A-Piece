import React, { Component } from 'react';
import HomeButton from '../components/HomeButton'
import '../style/NPHomePage.css';
import {Route} from 'react-router-dom'
class NPHomePage extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-home-page">
                    <div className="navigation">
                        <div className = "nav-title">WELCOME {this.props.name}!</div>
                        <div onClick={() => history.push("/rest-search")} className = "nav-title">RESTAURANTS NEAR ME</div>
                        <div className = "nav-title">SETTINGS</div>
                    </div>
                    <div>
                        <img alt="Save Me A Piece" src={require('../logo.png')}/>
                        <div className="np-home-title">SAVE ME A PIECE</div>
                        <HomeButton url="/rest-search" name="FIND RESTAURANTS NEAR ME"/>
                    </div>
                </div>
            )}/>
        );
    }
}

export default NPHomePage;
