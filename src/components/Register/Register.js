import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import * as Api from "api/Api";
import Button from "components/Common/Button/Button";
import "components/Register/Register.scss";
import Preloader from "components/Common/Preloader/Preloader";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      username: "",
      email: "",
      password: "",
      isMessageShowing: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.displaySuccessMessage = this.displaySuccessMessage.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    Api.registerUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(
      response => {
        this.setState({ isMessageShowing: true });
        console.log("response,data", response.data);
      },
      error => {
        console.log("status: ", error);
      }
    );
  }

  displaySuccessMessage() {
    if (!this.state.isMessageShowing) {
      return null;
    }
    return <p>Account created successfully</p>;
  }

  render() {
    return (
      <div className="register-container">
        <form onSubmit={this.onSubmit} className="register">
          <h3 className="title">Create account</h3>
          <div className="input-group">
            <input
              className="username"
              value={this.state.username}
              placeholder=" "
              onChange={e => this.setState({ username: e.target.value })}
            />
            <span className="label"> Username</span>
            <span className="border" />
          </div>
          <div className="input-group">
            <input
              className="email"
              value={this.state.email}
              placeholder=" "
              type="email"
              onChange={e => this.setState({ email: e.target.value })}
            />
            <span className="label"> Email</span>
            <span className="border" />
          </div>
          <div className="input-group">
            <input
              className="password"
              value={this.state.password}
              placeholder=" "
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <span className="label"> Password</span>
            <span className="border" />
          </div>

          <button className="create-account" type="submit">
            Register
          </button>
          {this.displaySuccessMessage()}
        </form>
      </div>
    );
  }
}
