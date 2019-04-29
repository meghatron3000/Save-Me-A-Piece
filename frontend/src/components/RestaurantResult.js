import React, { Component } from 'react';
import '../style/RestaurantResult.scss';
import axios from 'axios'
class RestaurantResult extends Component {
    onClickHandler(remail, npemail, npname, dish, servings){
        let body = {
            restaurant_email: remail,
            nonprofit_email: npemail,
            nonprofit_name: npname,
            dish: dish,
            servings: servings
        }
        console.log("thisstat",body);
        axios.post('http://127.0.0.1:8000/api/requests/', 
            body
        )
        .then(function (response) {
            if(response.data.message === "SUCCESS"){
                console.log("success")
            }
        })
    }
    render() {
        return (
        <div className="rest-result" onClick = {() => this.onClickHandler(this.props.restEmail, this.props.npEmail, this.props.npName, this.props.restItem, this.props.restNumb )}>
            <span className="rest-text">{this.props.restName}</span> 
            <span className="rest-text">{this.props.restItem}</span> 
            <span className="rest-text">{this.props.restPrice}</span> 
            <span className="rest-text">{this.props.rating}</span> 
            <span className="rest-text-last">{this.props.restNumb}</span> 
        </div>
        );
    }
}

export default RestaurantResult;