import React, { Component } from 'react';
import '../style/TimeInterval.scss';

class TimeInterval extends Component {
    constructor(props){
        super(props);
        this.state = {
            start: 0,
            end: 0
        }
    }

    render() {
        return (
        <span>
            <input onChange={(e) =>this.props.handlestart(e.target.value)} type="time" value={this.props.start} required></input>
            <span className="ti-text">TO</span>
            <input onChange={(e) =>this.props.handleend(e.target.value)} type="time" value={this.props.end} required></input>
        </span>
        );
    }
}

export default TimeInterval;
