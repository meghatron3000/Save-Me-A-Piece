import React, { Component } from 'react';
import '../style/EditableMenuItem.css';

class EditableMenuItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: this.props.item,
            price: this.props.price,
            recPrice: "$5.00",
            servings: this.props.servings
        }
    }



    render() {
        return (
        <div className="menu-result">
            <span className="menu-text"><input className="menu-item" size="15" type="text" value={this.state.item} onChange={(e) => this.setState({item: e})} /></span> 
            <span className="menu-text">$<input className="menu-item" size="5" maxlength="5" type="text" value={this.state.price} onChange={(e) => this.setState({price: e})} /></span> 
            <span className="menu-text">{this.state.recPrice}</span> 
            <span className="menu-text-last"><input className="menu-item" size="3" maxlength="3" type="text" value={this.state.servings} onChange={(e) => this.setState({servings: e})} /></span> 
        </div>
        );
    }
}

export default EditableMenuItem;