/* eslint-disable */

import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantSearch from './components/RestaurantSearch.js';
import RestaurantView from './components/RestaurantView.js';
import CheckoutView from './components/CheckoutView.js';
import 'semantic-ui-css/semantic.min.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path='/' component={RestaurantSearch} />
        <Route exact path='/r' component={RestaurantView} />
        <Route exact path="/checkout" component={CheckoutView} />
        </Switch>
      </Router>
    );
  }
}
