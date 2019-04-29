import React, { Component } from 'react';
import SignUp from '../components/SignUp'
import '../style/SignUpPage.scss';

class SignUpPage extends Component {
    render() {
        return (
            <div className="signup-page">
            <SignUp/>
            </div>
        );
    }
}

export default SignUpPage;
