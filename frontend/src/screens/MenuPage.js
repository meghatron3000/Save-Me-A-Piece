import React, { Component } from 'react';
import '../style/NonProfitReq.css';
import {Route} from 'react-router-dom'
import EditableMenuItem from '../components/EditableMenuItem';
import axios from 'axios';
class MenuPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant: this.props.location.state.detail,
            restaurantEmail: this.props.location.state.detail[0],
            menuItems: []
        }
    }
    componentDidMount(){
        var self = this;
        axios.get('http://127.0.0.1:8000/api/dishes/', 
              { 
                params:{
                    restaurant_email: this.state.restaurantEmail
                }
              })
            .then(function (response){
                if(response.data.message === "SUCCESS"){
                    self.setState({menuItems: response.data.result});
                }
            })
    }
    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-req-page">
                    <div className="navigation">
                        <div onClick={() => history.push({pathname: '/rhome', state: { detail: this.state.restaurant}})} className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div onClick={() => history.push("/np-req")} className = "r-nav-title">NON PROFIT REQUESTS</div>
                        <div className = "r-nav-title">MY MENU</div>
                        <div className = "r-nav-title">SETTINGS</div>
                    </div>
                    <div className="np-req-body">
                        <div className = "results">
                            <div className="np-req-header">My Menu</div>
                            <br/>
                            <div className="all-np-req-subheaders">
                                <span className="np-req-subheader">Menu Item</span>
                                <span className="np-req-subheader">Price Per Meal</span>
                                <span className="np-req-subheader">Recommended Price</span>
                                <span className="np-req-subheader">Servings</span>
                            </div>
                            <br/>
                            {this.state.menuItems && this.state.menuItems.map((item) =>
                                <li key={item[2]}>
                                <EditableMenuItem item={item[3]} price={item[3]} servings={item[4]}/>
                                </li>
                            )}
                            {/* <EditableMenuItem item="Daily Bread" price="5.00" servings="15"/>
                            <EditableMenuItem item="Feeding Our Kids" price="5.00" servings="15"/> */}
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default MenuPage;