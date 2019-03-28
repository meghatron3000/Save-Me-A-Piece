import React, { Component } from 'react';
import SignUpButton from './SignUpButton'
import '../style/SignUp.css';

class SignUp extends Component {
    render() {
        return (
            <div className="signup-comp">
                <img alt="Save Me A Piece" src={require('../logo.png')}/>
                <div className="signup-title">WELCOME!  </div>
                <div className="signup-title">SELECT YOUR BUSINESS</div>
                <br/>
                <SignUpButton icon="restaurant" color="#8CB369" name="RESTAURANT"/>
                <SignUpButton icon="soup" color="#D36582" name="SOUP KITCHEN"/>
            </div>
        );
    }
}

export default SignUp;
