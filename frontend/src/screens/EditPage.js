import React, { Component } from 'react';
import '../style/NonProfitReq.scss';
import TimeInterval from '../components/TimeInterval'
import {Route} from 'react-router-dom'
import axios from 'axios'

class EditPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            url : this.props.location.state.passedurl,
            email: this.props.location.state.detail.email,
            mondaystart: "00:00",
            mondayend: "00:00",
            tuesdaystart: "00:00",
            tuesdayend: "00:00",
            wednesdaystart: "00:00",
            wednesdayend: "00:00",
            thursdaystart: "00:00",
            thursdayend: "00:00",
            fridaystart: "00:00",
            fridayend: "00:00",
            saturdaystart: "00:00",
            saturdayend: "00:00",
            sundaystart: "00:00",
            sundayend: "00:00"
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getTimeStr = (ms) => {
        var mins = ms.getMinutes();
        var hrs = ms.getHours();
        var minstr = ""+mins;
        if (mins < 10){
            minstr = "0"+minstr;
        }
        var hrsstr = ""+hrs;
        if (hrs < 10){
            hrsstr = "0"+hrsstr;
        }
        return hrsstr+":"+minstr;
    }

    componentDidMount(){
        if (this.props.location.state.detail){
            this.setState({email: this.props.location.state.detail});
        }
        axios.get('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
      )
      .then( (response)=> {
          var res = response.data.data;
        if (res.mondaystart){
            let ms = new Date(res.mondaystart);
            this.setState({mondaystart: this.getTimeStr(ms)});
        }
        if (res.mondayend){
            let ms = new Date(res.mondayend);
            this.setState({mondayend: this.getTimeStr(ms)});
        }
        if (res.tuesdaystart){
            let ms = new Date(res.tuesdaystart);
            this.setState({tuesdaystart: this.getTimeStr(ms)});
        }
        if (res.tuesdayend){
            let ms = new Date(res.tuesdayend);
            console.log("changed tues");
            this.setState({tuesdayend: this.getTimeStr(ms)});
        }
        if (res.wednesdaystart){
            let ms = new Date(res.wednesdaystart);
            this.setState({wednesdaystart: this.getTimeStr(ms)});
        }
        if (res.wednesdayend){
            let ms = new Date(res.wednesdayend);
            this.setState({wednesdayend: this.getTimeStr(ms)});
        }
        if (res.thursdaystart){
            let ms = new Date(res.thursdaystart);
            this.setState({thursdaystart: this.getTimeStr(ms)});
        }
        if (res.thursdayend){
            let ms = new Date(res.thursdayend);
            this.setState({thursdayend: this.getTimeStr(ms)});
        }
        if (res.fridaystart){
            let ms = new Date(res.fridaystart);
            this.setState({fridaystart: this.getTimeStr(ms)});
        }
        if (res.fridayend){
            let ms = new Date(res.fridayend);
            this.setState({fridayend: this.getTimeStr(ms)});
        }
        if (res.saturdaystart){
            let ms = new Date(res.saturdaystart);
            this.setState({saturdaystart: this.getTimeStr(ms)});
        }
        if (res.saturdayend){
            let ms = new Date(res.saturdayend);
            this.setState({saturdayend: this.getTimeStr(ms)});
        }
        if (res.sundaystart){
            let ms = new Date(res.sundaystart);
            this.setState({sundaystart: this.getTimeStr(ms)});
        }
        if (res.sundayend){
            let ms = new Date(res.sundayend);
            this.setState({sundayend: this.getTimeStr(ms)});
        }
        console.log(this.state);
      })
    }

    handleMondayStartChange = (val) =>{
        this.setState({mondaystart: val})
    }

    handleMondayEndChange = (val) =>{
        this.setState({mondayend:val})
    }

    getHours(input){
        var tens = input[0];
        var ones = input[1];
        return parseInt(tens+""+ones);
    }

    getMins(input){
        var tens = input[3];
        var ones = input[4];
        return parseInt(tens+""+ones);
    }
    
    onChangeMonday(){
        var newMondayStart = new Date();
        var newMondayEnd = new Date();
        newMondayStart.setHours( this.getHours(this.state.mondaystart), this.getMins(this.state.mondaystart));
        newMondayEnd.setHours( this.getHours(this.state.mondayend), this.getMins(this.state.mondayend));
        let body = { 
            mondaystart: newMondayStart,
            mondayend: newMondayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
      })
    }

    handleTuesdayStartChange = (val) =>{
        this.setState({tuesdaystart: val})
    }

    handleTuesdayEndChange = (val) =>{
        this.setState({tuesdayend:val})
    }
    
    onChangeTuesday(){
        var newtuesdayStart = new Date();
        var newtuesdayEnd = new Date();
        newtuesdayStart.setHours( this.getHours(this.state.tuesdaystart), this.getMins(this.state.tuesdaystart));
        newtuesdayEnd.setHours( this.getHours(this.state.tuesdayend), this.getMins(this.state.tuesdayend));
        let body = { 
            tuesdaystart: newtuesdayStart,
            tuesdayend: newtuesdayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
      })
    }

    handleWednesdayStartChange = (val) =>{
        this.setState({wednesdaystart: val})
    }

    handleWednesdayEndChange = (val) =>{
        this.setState({wednesdayend:val})
    }
    
    onChangeWednesday(){
        var newwednesdayStart = new Date();
        var newwednesdayEnd = new Date();
        newwednesdayStart.setHours( this.getHours(this.state.wednesdaystart), this.getMins(this.state.wednesdaystart));
        newwednesdayEnd.setHours( this.getHours(this.state.wednesdayend), this.getMins(this.state.wednesdayend));
        let body = { 
            wednesdaystart: newwednesdayStart,
            wednesdayend: newwednesdayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
      })
    }

    handleThursdayStartChange = (val) =>{
        this.setState({thursdaystart: val})
    }

    handleThursdayEndChange = (val) =>{
        this.setState({thursdayend:val})
    }
    
    onChangeThursday(){
        var newthursdayStart = new Date();
        var newthursdayEnd = new Date();
        newthursdayStart.setHours( this.getHours(this.state.thursdaystart), this.getMins(this.state.thursdaystart));
        newthursdayEnd.setHours( this.getHours(this.state.thursdayend), this.getMins(this.state.thursdayend));
        let body = { 
            thursdaystart: newthursdayStart,
            thursdayend: newthursdayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
      })
    }

    handleFridayStartChange = (val) =>{
        this.setState({fridaystart: val})
    }

    handleFridayEndChange = (val) =>{
        this.setState({fridayend:val})
    }
    
    onChangeFriday(){
        var newfridayStart = new Date();
        var newfridayEnd = new Date();
        newfridayStart.setHours( this.getHours(this.state.fridaystart), this.getMins(this.state.fridaystart));
        newfridayEnd.setHours( this.getHours(this.state.fridayend), this.getMins(this.state.fridayend));
        let body = { 
            fridaystart: newfridayStart,
            fridayend: newfridayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
      })
    }

    handleSaturdayStartChange = (val) =>{
        this.setState({saturdaystart: val})
    }

    handleSaturdayEndChange = (val) =>{
        this.setState({saturdayend:val})
    }
    
    onChangeSaturday(){
        var newsaturdayStart = new Date();
        var newsaturdayEnd = new Date();
        newsaturdayStart.setHours( this.getHours(this.state.saturdaystart), this.getMins(this.state.saturdaystart));
        newsaturdayEnd.setHours( this.getHours(this.state.saturdayend), this.getMins(this.state.saturdayend));
        let body = { 
            saturdaystart: newsaturdayStart,
            saturdayend: newsaturdayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
      })
    }

    handleSundayStartChange = (val) =>{
        this.setState({sundaystart: val})
    }

    handleSundayEndChange = (val) =>{
        this.setState({sundayend:val})
    }
    
    onChangeSunday(){
        var newsundayStart = new Date();
        var newsundayEnd = new Date();
        newsundayStart.setHours( this.getHours(this.state.sundaystart), this.getMins(this.state.sundaystart));
        newsundayEnd.setHours( this.getHours(this.state.sundayend), this.getMins(this.state.sundayend));
        let body = { 
            sundaystart: newsundayStart,
            sundayend: newsundayEnd
        };
        axios.put('http://127.0.0.1:4000/api/schedules/'+this.state.email, 
        body
      )
      .then(function (response) {
        //   console.log(response);
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
                        <div className="np-req-header">Edit Page</div>
                        <div> Enter Your Schedule </div>
                            <br/>
                            <div><span>Monday: <TimeInterval handlestart={this.handleMondayStartChange} handleend={this.handleMondayEndChange} start={this.state.mondaystart} end={this.state.mondayend}/> 
                                <button className="login-button" onClick={() => this.onChangeMonday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                            <div><span>Tuesday: <TimeInterval handlestart={this.handleTuesdayStartChange} handleend={this.handleTuesdayEndChange} start={this.state.tuesdaystart} end={this.state.tuesdayend}/> 
                                <button className="login-button" onClick={() => this.onChangeTuesday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                            <div><span>Wednesday: <TimeInterval handlestart={this.handleWednesdayStartChange} handleend={this.handleWednesdayEndChange} start={this.state.wednesdaystart} end={this.state.wednesdayend}/> 
                                <button className="login-button" onClick={() => this.onChangeWednesday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                            <div><span>Thursday: <TimeInterval handlestart={this.handleThursdayStartChange} handleend={this.handleThursdayEndChange} start={this.state.thursdaystart} end={this.state.thursdayend}/> 
                                <button className="login-button" onClick={() => this.onChangeThursday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                            <div><span>Friday: <TimeInterval handlestart={this.handleFridayStartChange} handleend={this.handleFridayEndChange} start={this.state.fridaystart} end={this.state.fridayend}/> 
                                <button className="login-button" onClick={() => this.onChangeFriday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                            <div><span>Saturday: <TimeInterval handlestart={this.handleSaturdayStartChange} handleend={this.handleSaturdayEndChange} start={this.state.saturdaystart} end={this.state.saturdayend}/> 
                                <button className="login-button" onClick={() => this.onChangeSaturday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                            <div><span>Sunday: <TimeInterval handlestart={this.handleSundayStartChange} handleend={this.handleSundayEndChange} start={this.state.sundaystart} end={this.state.sundayend}/> 
                                <button className="login-button" onClick={() => this.onChangeSunday()} > 
                                    <span className="button-login-name">Submit</span>
                            </button></span></div>
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default EditPage;