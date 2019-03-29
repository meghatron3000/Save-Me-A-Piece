import React, { Component } from "react";
import PropTypes from "prop-types";
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

    handleButt = e => {    
    ajax({
        url: "http://127.0.0.1:8000/",
        method: 'POST', // or another (GET), whatever you need
        data: {
                name: name, 
                email: email,
                password: password,
                address: address,
                phoneNumber: phoneNumber};

            click: true
        }) 
      }
        
    });

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
            <button id = "get_butt" onclick={this.handleButt} className="button is-info">
              get
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Form;