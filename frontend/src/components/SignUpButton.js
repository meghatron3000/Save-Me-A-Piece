import React, { Component } from 'react';
import '../style/SignUpButton.css';
import {FaUtensils, FaConciergeBell} from 'react-icons/fa';
class SignUpButton extends Component {
    render() {
        return (
            <button  className = "signup-button" style = {{backgroundColor:this.props.color}} onClick={this.props.onClick} className="button">
                {this.props.icon === "restaurant" && <FaUtensils/>}
                {this.props.icon === "soup" && <FaConciergeBell/>} 
                <span className="button-signup-name">{this.props.name}</span>
            </button>
        );
    }
}

export default SignUpButton;
