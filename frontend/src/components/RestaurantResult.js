import React, { Component } from 'react';
import '../style/RestaurantResult.scss';
import axios from 'axios'
class RestaurantResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant: {},
            schedule: {}
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    onClickHandler(remail, npemail, npname, dish, servings){
        let body = {
            restaurant_email: remail,
            nonprofit_email: npemail,
            nonprofit_name: npname,
            dish: dish,
            servings: servings
        }
        axios.post('http://127.0.0.1:4000/api/requests/', 
            body
        )
        .then(function (response) {
                // console.log("success")
        })
    }

    componentDidMount(){
        let url = `http://127.0.0.1:4000/api/restaurants/${this.props.restEmail}`
        axios.get(url,)
        .then((response) => {
            this.setState({restaurant:response.data.data})
        })
        let surl = `http://127.0.0.1:4000/api/schedules/${this.props.restEmail}`
        axios.get(surl,)
        .then((response) => {
            this.setState({schedule:response.data.data})
            console.log(response.data.data)
        })
    }


    showModal = () =>{
        let modal = document.getElementById('modal');
        modal.style.display = "block";

    }

    hideModal(){
        let modal = document.getElementById('modal');
        modal.style.display = "none";
    } 
    
    render() {
        return (
        <div className="rest-result" onClick = {() => this.onClickHandler(this.props.restEmail, this.props.npEmail, this.props.npName, this.props.restItem, this.props.restNumb )}>
            <span onClick={() => this.showModal()} className="rest-text-under">{this.props.restName}</span> 
                <div id="modal" className="rpopup">
                    <div className="rinnerpop">
                        <span onClick={() => this.hideModal()} className="rx">&times;</span>
                        { (this.state.restaurant) && 
                        <div>
                            <p> {this.state.restaurant.name} </p>
                            <p> {this.state.restaurant.address} </p>
                            <p> {this.state.restaurant.city},{this.state.restaurant.state}  </p>
                            <p> {this.state.restaurant.zip_code} </p>
                            <p> Phone: {this.state.restaurant.phone_number}, Email: {this.state.restaurant.email} </p>
                            <p> Schedule: {this.state.restaurant.phone_number}, Email: {this.state.restaurant.email} </p>
                        </div>
                        }
                    </div>
                </div>
            <span className="rest-text">{this.props.restItem}</span> 
            <span className="rest-text">{this.props.restPrice}</span> 
            <span className="rest-text-last">{this.props.restNumb}</span> 
        </div>
        );
    }
}

export default RestaurantResult;