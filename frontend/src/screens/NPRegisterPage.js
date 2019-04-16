import React, { Component } from 'react';
import Register from '../components/Register'
import '../style/Login.css';

class NPRegisterPage extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    render() {
        return (
            <div className="login-page">
            <Register nextpage={'/nphome'}/>
            </div>
        );
    }
}

export default NPRegisterPage;
