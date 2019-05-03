import React, { Component } from 'react';
import '../style/NonProfitReq.scss';
import {Route} from 'react-router-dom'
import axios from 'axios'

class SettingsPage extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            url : this.props.location.state.passedurl,
            email: this.props.location.state.detail.email
        }
        console.log(this.state);
    }
    
    onDelete(history){
        this.state.url === "rhome"?
            axios.delete('http://127.0.0.1:4000/api/restaurants/'+this.state.email, 
              )
            .then(function (response) {
                if(response.data.message === "OK"){
                    console.log(response.data);
                    history.push({pathname: '/home'})
                }
            })
        :
            axios.delete('http://127.0.0.1:4000/api/nonprofits/'+this.state.email, 
            )
            .then(function (response) {
                if(response.data.message === "OK"){
                    console.log(response.data);
                    history.push({pathname: '/home'})
                }
            })
        
    }

    render() {
        return (
            <Route render={({ history}) => (
                <div className="np-req-page">
                    <div className="navigation">
                        <div onClick={() => history.push({pathname: this.state.url, state: { detail: this.props.location.state.detail}})}className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        {(this.state.url === '/rhome') && <div onClick={() => history.push({pathname: '/menu', state: { detail: this.props.location.state.detail}}) } className = "r-nav-title">MY MENU</div>}
                        {(this.state.url === '/rhome') && <div onClick={() => history.push({pathname: '/np-req', state: { detail: this.props.location.state.detail}}) } className = "r-nav-title">NONPROFIT REQUESTS</div>}
                        {(this.state.url === '/nphome') &&<div onClick={() => history.push({pathname: '/rest-search', state: { detail: this.props.location.state.detail}}) } className = "r-nav-title">RESTAURANTS NEAR ME</div>}
                    </div>
                    <div className="np-req-body">
                        <div className = "results">
                            <div className="np-req-header">Settings</div>
                            <br/>
                            <div onClick={() => this.onDelete(history)} className="">Delete Account</div>
                            <br/>
                            <br/>
                            <div onClick={() => history.push({pathname: '/editpage', state: { detail:this.props.location.state.detail, passedurl:this.state.url } })} className = "">Go to Edit Page</div>
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default SettingsPage;