import React, { Component } from 'react';
import '../style/TimeInterval.css';

class TimeInterval extends Component {
    render() {
        return (
        <div>
            <input type="time" required></input>
            <span className="ti-text">TO</span>
            <input type="time" required></input>
        </div>
        );
    }
}

export default TimeInterval;
