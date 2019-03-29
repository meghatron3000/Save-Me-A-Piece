import React, { Component } from 'react';
import '../style/RestaurantResult.css';

class RestaurantResult extends Component {
    render() {
        return (
        <div className="result">
            <span>{this.props.restName}</span> 
            <span>{this.props.restItem}</span> 
            <span>{this.props.restPrice}</span> 
            <span>{this.props.restNumb}</span> 
        </div>
        );
    }
}

export default RestaurantResult;
