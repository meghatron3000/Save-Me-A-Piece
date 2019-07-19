import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from './screens/LoginPage'
import SignUpPage from './screens/SignUpPage'
import NPHomePage from './screens/NPHomePage'
import RHomePage from './screens/RHomePage'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import RestaurantSearchPage from './screens/RestaurantSearchPage'
import NonProfitReq from './screens/NonProfitReq';
import MenuPage from './screens/MenuPage';
import NPRegisterPage from './screens/NPRegisterPage';
import LoginChoicePage from './screens/LoginChoicePage';
import RRegisterPage from './screens/RRegisterPage';
import SettingsPage from './screens/SettingsPage';
import EditPage from './screens/EditPage';

const auth = {
    userToken: null
}

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem("login-token")
            ? <Component {...props}/>
            : <Redirect to='/home' component={App}/>
    )}/>
);

const routes = (
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/home" component={App}/>
      {/* <Route path="/" component={App}/> */}
      <Route path="/login" component={LoginPage}/>
      <Route path="/signupchoice" component={SignUpPage}/>
      <Route path="/loginchoice" component={LoginChoicePage}/>
      <AuthRoute path="/nphome" component={NPHomePage}/>
      <AuthRoute path="/rhome" component={RHomePage}/>
      <AuthRoute path="/np-req" component={NonProfitReq}/>
      <AuthRoute path="/menu" component={MenuPage}/>
      <AuthRoute path="/rest-search" component={RestaurantSearchPage}/>
      <Route path="/npreg" component={NPRegisterPage}/>
      <Route path="/restreg" component={RRegisterPage}/>
      <AuthRoute path="/settings" component={SettingsPage}/>
      <AuthRoute path="/editpage" component={EditPage}/>
    </div>
      
);
ReactDOM.render(<BrowserRouter>{routes}</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
