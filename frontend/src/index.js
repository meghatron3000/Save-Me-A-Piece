import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomePage from './screens/HomePage'
import LoginPage from './screens/LoginPage'
import SignUpPage from './screens/SignUpPage'
import NPHomePage from './screens/NPHomePage'
import RHomePage from './screens/RHomePage'
import RRegisterPage from './screens/RRegisterPage'
import NPRegisterPage from './screens/NPRegisterPage'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

const routes = (
    <div>
      <Route path="/home" component={App}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/rregister" component={RRegisterPage}/>
      <Route path="/npregister" component={NPRegisterPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <Route path="/nphome" component={NPHomePage}/>
      <Route path="/rhome" component={RHomePage}/>
    </div>
      
);
ReactDOM.render(<BrowserRouter>{routes}</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
