import React, { Component } from 'react';
import LoginChoice from '../components/LoginChoice'
import '../style/SignUpPage.scss';

class LoginChoicePage extends Component {
    render() {
        return (
            <div className="signup-page">
            <LoginChoice/>
            </div>
        );
    }
}

export default LoginChoicePage;
