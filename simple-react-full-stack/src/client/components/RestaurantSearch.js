/* eslint-disable */

import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class RestaurantSearch extends Component {
    constructor() {
        super();
    
        this.state = {
            value: ""
        }
        
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    inputChangeHandler(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
                <Input
                    onChange={this.inputChangeHandler}
                    label='Search for a Restaurant'
                    placeholder='Restaurant'
                    value={this.state.value}
                />
            </div>
        )
    }
}
export default RestaurantSearch;
