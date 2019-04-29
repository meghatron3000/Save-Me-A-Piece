import React, { Component } from 'react';
import NPRegister from '../components/NPRegister'
import '../style/SignUpPage.scss';

class NPRegisterPage extends Component {
    render() {
        return (
            <div className="signup-page">
            <NPRegister/>
            </div>
        );
    }
}

export default NPRegisterPage;
