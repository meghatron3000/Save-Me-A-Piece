import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from './screens/LoginPage'
import SignUpPage from './screens/SignUpPage'
import NPHomePage from './screens/NPHomePage'
import RHomePage from './screens/RHomePage'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import RestaurantSearchPage from './screens/RestaurantSearchPage'
import NonProfitReq from './screens/NonProfitReq';
import MenuPage from './screens/MenuPage';
const routes = (
    <div>
      <Route path="/home" component={App}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <Route path="/nphome" component={NPHomePage}/>
      <Route path="/rhome" component={RHomePage}/>
      <Route path="/np-req" component={NonProfitReq}/>
      <Route path="/menu" component={MenuPage}/>
      <Route path="/rest-search" component={RestaurantSearchPage}/>
    </div>
      
);
ReactDOM.render(<BrowserRouter>{routes}</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
