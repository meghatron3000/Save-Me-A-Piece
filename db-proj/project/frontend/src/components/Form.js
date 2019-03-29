import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios'


class Form extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
    name: "",
    email: "",
    password: "",
    phoneNumber: 0,
    address: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password, address, phoneNumber} = this.state;
    const restaurant = {name, email, password, address, phoneNumber};
    const conf = {
      method: "post",
      body: JSON.stringify(restaurant),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(this.props.endpoint, conf).then(response => console.log(response));
  }

  handleButt = e => {    
    console.log("getting");
    let url = "http://localhost:8000/api/restaurant";
    axios.get(url).then((response) => {
          let restaurants = response.data;
          console.log(restaurants);
      }).catch((error) => {
          console.log(error);
      });
  };
  
  render() {
    const { name, email, password, address, phoneNumber} = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="password"
                onChange={this.handleChange}
                value={password}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">address</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="address"
                onChange={this.handleChange}
                value={address}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="phoneNumber"
                onChange={this.handleChange}
                value={phoneNumber}
                required
              />
            </div>
          </div>

          <div className="control">
            <button id = "submit_button" type="submit" className="button is-info">
              Send message
            </button>
          </div>
        </form>
        <button id = "get_butt" onClick={this.handleButt}>
              get
        </button>
      </div>
    );
  }
}
export default Form;