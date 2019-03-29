import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomePage from './screens/HomePage'
import LoginPage from './screens/LoginPage'
import SignUpPage from './screens/SignUpPage'
import NPHomePage from './screens/NPHomePage'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

const routes = (
    <div>
      <Route path="/home" component={App}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <Route path="/nphome" component={NPHomePage}/>
    </div>
      
);
ReactDOM.render(<BrowserRouter>{routes}</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
