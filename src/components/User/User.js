import React, { Component } from "react";
import { Link } from "react-router-dom";

import Preloader from "components/Common/Preloader/Preloader";
import * as Api from "api/Api";
import "components/User/User.scss";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "ioanam",
      password: "qwerty",
      submitting: false,
      errorMessage: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("onSubmit()");
    this.setState({ submitting: true });
    Api.signInUser({
      username: this.state.username,
      password: this.state.password
    }).then(
      response => {
        this.props.onLogin(response.data);
      },
      error => {
        const status = error.response.status;
        if (status === 401) {
          this.setState({
            submitting: false,
            errorMessage: "Username and password don't match"
          });
        } else if (status === 403) {
          this.setState({
            submitting: false,
            errorMessage:
              "You need to activate your account before using it. Please check your email (including the spam folder) for the activation link."
          });
        } else {
          this.setState({
            submitting: false,
            errorMessage: "Sorry, something went wrong. Please try again later."
          });
        }
      }
    );
  }

  displayErrorMessage() {
    if (!this.state.errorMessage) {
      return null;
    }

    return <p className="error-message">{this.state.errorMessage}</p>;
  }

  render() {
    if (this.state.pending) {
      return <Preloader />;
    }
    if (!this.state.userData) {
      return (
        <div className="user-container">
          <h3 className="header">Welcome to Scribble!</h3>
          <form onSubmit={this.onSubmit} className="login">
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
                className="password"
                value={this.state.password}
                placeholder=" "
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <span className="label"> Password</span>
              <span className="border" />
            </div>
            <span className="forgotten-password">Forgotten password?</span>

            <button className="signin" type="submit">
              {this.state.submitting ? <Preloader /> : "Login"}
            </button>
          </form>
          <p className="new-user">
            New user? &nbsp;
            <Link className="register-link" to="/register">
              Signup
            </Link>
          </p>
          {this.displayErrorMessage()}
        </div>
      );
    }
  }
}
