import React, { Component } from 'react';
import '../style/TimeInterval.css';

class TimeInterval extends Component {
    render() {
        return (
        <span>
            <input type="time" required></input>
            <span className="ti-text">TO</span>
            <input type="time" required></input>
        </span>
        );
    }
}

export default TimeInterval;
