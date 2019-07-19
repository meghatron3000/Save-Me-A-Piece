import React, { Component } from 'react';
import '../style/EditableMenuItem.scss';
import {FaCheckCircle} from 'react-icons/fa';
import axios from 'axios';

class EditableMenuItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item,
            price: this.props.price,
            // recPrice: "$0.00",
            servings: this.props.servings
        }
    }
    addItem(){
        var self = this;
        let body = { name: self.state.item, restaurant_email: self.props.restaurantEmail, restaurant_name: self.props.restaurantName, price:self.state.price, servings:self.state.servings }
        axios.post('http://127.0.0.1:4000/api/dishes/', body)
        .then(function (response){
            if(response.data.message === "SUCCESS"){
                self.props.onAdded([self.props.restaurantEmail, self.props.restaurantName, self.state.item, self.state.price, self.state.servings])
            }
        })
    }
    async editItem(val){
        await this.setState(val)
        if(!this.props.newItem){
            var self = this;
            let body = { name: self.state.item, restaurant_email: self.props.restaurantEmail, restaurant_name: self.props.restaurantName, price:self.state.price, servings:self.state.servings }
            axios.put('http://127.0.0.1:4000/api/dishes/', body)
            .then(function (response){
                if(response.data.message === "SUCCESS"){
            }
        })
        }
        
    }


    render() {
        return (
        <div className="menu-result-wrap">
        <span className="menu-result">
        <span className="menu-text">{this.props.newItem && <input className="menu-item" size="15" type="text" value={this.state.item} onChange={(e) => this.editItem({item: e.target.value})} />} {!this.props.newItem && this.state.item}</span> 
            <span className="menu-text">$<input className="menu-item five"  type="number" value={this.state.price} onChange={(e) => this.editItem({price: e.target.value})} /></span> 
            <span className="menu-text-last"><input className="menu-item three"  type="number" value={this.state.servings} onChange={(e) => this.editItem({servings: e.target.value})} /></span> 
        </span>
        {
            this.props.newItem &&
            <FaCheckCircle className="delete-item"  size="1.5em" color="#F9E8EC" onClick={() => this.addItem()}/>
        }
        </div>
        );
    }
}

export default EditableMenuItem;