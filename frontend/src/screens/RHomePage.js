import React, { Component } from 'react';
import HomeButton from '../components/HomeButton'
import '../style/NPHomePage.css';

class RHomePage extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    render() {
        return (
            <div className="np-home-page">
                <div className="navigation">
                    <div className = "nav-title">WELCOME {this.props.name}!</div>
                    <div className = "nav-title">SETTINGS</div>
                </div>
                <div>
                    <img alt="Save Me A Piece" src={require('../logo.png')}/>
                    <div className="np-home-title">SAVE ME A PIECE</div>
                </div>
            </div>
        );
    }
}

export default RHomePage;
