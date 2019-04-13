import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SignUpButton from './SignUpButton'
import '../style/SignUp.css';

class SignUp extends Component {
    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

    render() {
        return (
            <div className="signup-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="signup-title">WELCOME!  </div>
                <div className="signup-title">SELECT YOUR BUSINESS</div>
                <br/>
                <Link to="/rregister">
                <SignUpButton icon="restaurant" color="#8CB369" name="RESTAURANT"/>
                </Link>
                <Link to="/npregister">
                <SignUpButton icon="soup" color="#D36582" name="SOUP KITCHEN"/>
                </Link>
            </div>
        );
    }
}

export default SignUp;
