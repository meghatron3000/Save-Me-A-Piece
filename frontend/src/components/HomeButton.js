import React, { Component } from 'react';
import '../style/HomeButton.css';
import { Route } from 'react-router-dom'

class HomeButton extends Component {
    render() {
        return (
            <Route render={({ history}) => (
            <button onClick={() =>   history.push(this.props.url)} className={this.props.type === "h" ?"home-button":"np-button"}>
                <span className="button-name">{this.props.name}</span>
            </button>
            )}
            />
        );
    }
}

export default HomeButton;
