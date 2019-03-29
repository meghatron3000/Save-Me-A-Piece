import React, { Component } from 'react';
import '../style/HomeButton.css';

class HomeButton extends Component {
    render() {
        return (
        <button onClick={this.props.onClick} className={this.props.type === "h" ?"home-button":"np-button"}>
            <span className="button-name">{this.props.name}</span>
        </button>
        );
    }
}

export default HomeButton;
