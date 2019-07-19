import React, { Component } from 'react';
import '../style/NonProfitReq.scss';
import '../style/RestaurantSearchPage.scss';
import {Route} from 'react-router-dom'
import axios from 'axios'

class SettingsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            url : this.props.location.state.passedurl,
            email: this.props.location.state.detail.email
        }
    }
    
    onDelete(history){
        this.state.url === "/rhome"?
            axios.delete('http://127.0.0.1:4000/api/restaurants/'+this.state.email, 
              )
            .then(function (response) {
                if(response.data.message === "OK"){
                    history.push({pathname: '/home'})
                }
            })
        :
            axios.delete('http://127.0.0.1:4000/api/nonprofits/'+this.state.email, 
            )
            .then(function (response) {
                if(response.data.message === "OK"){
                    history.push({pathname: '/home'})
                }
            })
        
    }

    showModal(){
        let modal = document.getElementById('modal');
        modal.style.display = "block";
    }

    hideModal(){
        let modal = document.getElementById('modal');
        modal.style.display = "none";
    } 

    back(){
        if (this.state.url === '/rhome'){
            return "np-req-page";
        }
        else{
            return "find-rest-page";
        }
    }

    render() {
        return (
            <Route render={({ history}) => (
                <div className={ this.back() }>
                    <div className="navigation">
                        <div onClick={() => history.push({pathname: this.state.url, state: { detail: this.props.location.state.detail}})}className = "r-nav-title"><img className="np-req-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        {(this.state.url === '/rhome') && <div onClick={() => history.push({pathname: '/np-req', state: { detail: this.props.location.state.detail}}) } className = "r-nav-title">NONPROFIT REQUESTS</div>}
                        {(this.state.url === '/rhome') && <div onClick={() => history.push({pathname: '/menu', state: { detail: this.props.location.state.detail}}) } className = "r-nav-title">MY MENU</div>}
                        {(this.state.url === '/nphome') &&<div onClick={() => history.push({pathname: '/rest-search', state: { detail: this.props.location.state.detail}}) } className = "r-nav-title">RESTAURANTS NEAR ME</div>}
                        <div className = "r-nav-title">SETTINGS</div>
                    </div>
                    <div className="np-req-body">
                        <div className = "results">
                            <div className="np-req-header">Settings</div>
                            <br/>
                            <div onClick={() => this.showModal()} className="">Delete Account</div>
                            <div id="modal" className="popup">
                                <div className="innerpop">
                                    <span onClick={() => this.hideModal()} className="x">&times;</span>
                                    <p>Are you sure you want to delete your account?</p>
                                    <div onClick={() => this.onDelete(history)} className="deleteAccount">Yes, Delete My Account</div>
                                </div>
                            </div>
                            <br/><br/>
                            <div onClick={() => history.push({pathname: '/editpage', state: { detail:this.props.location.state.detail, passedurl:this.state.url } })} className = "">Edit Account</div>
                            <br/><br/>
                            <div onClick={() => history.push({pathname: '/home'})} className = "">Log Out </div>
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default SettingsPage;