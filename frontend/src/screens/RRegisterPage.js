import React, { Component } from 'react';
import Register from '../components/Register'
import '../style/Login.css';

class RRegisterPage extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            children: nextProps.children
        });
    }
    render() {
        return (
            <div className="login-page">
            <Register nextpage={'/rhome'}/>
            </div>
        );
    }
}

export default RRegisterPage;
