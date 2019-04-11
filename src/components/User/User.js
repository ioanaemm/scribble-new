import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Api from "api/Api";
import "components/User/User.scss";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "ioanam",
      password: "qwerty"
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("onSubmit()");

    Api.signInUser({
      username: this.state.username,
      password: this.state.password
    }).then(
      response => {
        this.props.onLogin(response.data);
      },
      error => {
        console.log("status: ", error);
      }
    );
  }

  render() {
    if (this.state.pending) {
      return <p>Loading...</p>;
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
              Login
            </button>
          </form>
          <p className="new-user">
            New user? &nbsp;
            <Link className="register-link" to="/register">
              Signup
            </Link>
          </p>
        </div>
      );
    }
  }
}
