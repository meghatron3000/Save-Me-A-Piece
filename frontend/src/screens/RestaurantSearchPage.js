import React, { Component } from 'react';
import '../style/RestaurantSearchPage.css';
import '../style/NonProfitReq.css';
import TimeInterval from '../components/TimeInterval'
import RestaurantResult from '../components/RestaurantResult'
import {Route} from 'react-router-dom'
import axios from 'axios'

class RestaurantSearchPage extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            budget: 0,
            localzip:0,
            localcity:"",
            underrests:[],
            overrests:[]
        }
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit= () =>{
        axios.get('http://127.0.0.1:8000/api/nonprofits/underbudget_rests_near/', 
          { 
            params:{
                price: this.state.budget,
                city: this.state.localcity,
                zip_code: this.state.localzip
            }
          })
        .then(function (response) {
            if(response.data.message === "SUCCESS"){
                console.log(response.data);
                this.setState({underrests: response.data.result});
            }
        }.bind(this));
        axios.get('http://127.0.0.1:8000/api/nonprofits/overbudget_rests_near/', 
          { 
            params:{
                price: this.state.budget,
                city: this.state.localcity,
                zip_code: this.state.localzip
            }
          })
        .then(function (response) {
            if(response.data.message === "SUCCESS"){
                console.log(response.data);
                this.setState({overrests: response.data.result});
            }
        }.bind(this));
}

BList= (listo) => {
    const listItems = listo.listo.map((item) =>
          <Row item={item}></Row>
    );
    return (
        <table style={{textAlign: 'left', width:'100%'}}>
          <tr>
            <th>Restaurant</th>
            <th>Dish</th> 
            <th>Price</th>
            <th>Servings</th>
        </tr>
            {listItems}
        </table>
    );
  }

handleBudgetChange = (e) =>{
    this.setState({budget: e.target.value})
}

handleCityChange = (e) =>{
    this.setState({localcity: e.target.value})
}

handleZipChange = (e) =>{
    this.setState({localzip: e.target.value})
}
    render() {
        return (
            <Route render={({ history}) => (
                <div className="find-rest-page">
                    <div className="navigation">
                        <div onClick={() => history.push("/nphome")}className = "nav-title"><img className="rest-logo"alt="Save Me A Piece" src={require('../logo.png')}/>HOME </div>
                        <div className = "nav-title">RESTAURANTS NEAR ME</div>
                        <div className = "nav-title">SETTINGS</div>
                    </div>
                    <div className="find-rest-body">
                        <div className="header-div">
                            <span className="ti-header">
                                <span className="header">TIME INTERVAL: </span>
                                <TimeInterval/>
                            </span>
                            <span className="header">SORT: </span>
                            <select className="sort-select">
                                <option value="none">No Filter</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="ltoh">Low To High</option>
                                <option value="htol">High To Low</option>
                            </select>
                            
                        </div>
                        {/* <div className = "results">
                            <div className="rest-header">Restaurant Meals Within Budget</div>
                            <br/>
                            <div className="all-rest-subheaders">
                                <span className="rest-subheader">Restaurant Name </span>
                                <span className="rest-subheader">Meal</span>
                                <span className="rest-subheader">Price Per Meal </span>
                                <span className="rest-subheader"># </span>
                            </div>
                            <br/>
                            <RestaurantResult restName="Bangkok Thai" restItem="Pad Thai" restPrice="$5.00" restNumb="15"/>
                            <RestaurantResult restName="Bangkok Thai" restItem="Pad See Ew" restPrice="$4.00" restNumb="13"/>
                            <br/><br/>
                            <div className="rest-header">Other Options</div>
                            <br/>
                            <RestaurantResult restName="Bangkok Thai" restItem="Panang Curry" restPrice="$8.00" restNumb="7"/>
                        </div> */}
                        <div className = "results">
                            <div className="np-req-header">Restaurant Search</div>
                            <br/>
                            <div className="login-input">
                            <input onChange={this.handleBudgetChange} className="login-text"type="text" placeholder="Budget">
                                </input >
                            </div>
                            <div className="login-input">
                            <input onChange={this.handleCityChange} className="login-text"type="text" placeholder="City">
                                </input >
                            </div>
                            <div className="login-input">
                            <input onChange={this.handleZipChange} className="login-text"type="text" placeholder="Zip">
                                </input >
                            </div>
                            <button className="login-button" onClick={() => this.onSubmit()} > 
                                <span className="button-login-name">Submit</span>
                            </button>
                            <br/><br/>
                            <br/><br/>
                            <div className="np-req-header">In Area and Within Budget</div>
                            <br/><br/>
                            <this.BList listo={this.state.underrests} ></this.BList>
                            <br/><br/><br/>
                            <div>__________________________________</div>
                            <br/><br/><br/>
                            <div className="np-req-header">In Area But Over Budget</div>
                            <br/><br/>
                            <this.BList listo={this.state.overrests} ></this.BList>
                        </div>
                    </div>
                </div>
            )}/>

        );
    }
}

class Row extends Component {
    render() {
        return (
            <tr style={{width: '100%'}}>
            <td>{this.props.item[1]}</td>
            <td>{this.props.item[2]}</td>
            <td>{this.props.item[3]}</td>
            <td>{this.props.item[4]}</td>
            </tr>
        );}
    }

export default RestaurantSearchPage;
