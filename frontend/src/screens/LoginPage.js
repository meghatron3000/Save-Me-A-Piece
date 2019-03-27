import React, { Component } from 'react';
import Login from '../components/Login'
import '../style/LoginPage.css';

class LoginPage extends Component {
    render() {
        return (
            <div className="login-page">
            <Login/>
            </div>
        );
    }
}

export default LoginPage;
