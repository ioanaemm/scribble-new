import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Api from "api/Api";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }

    Api.signInUser({
      username: this.state.username,
      password: this.state.password
    }).then(
      response => {
        this.props.onLogin(response.data);
      },
      error => {
        console.log("status: ", error.response.status);
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
          <form onKeyDown={this.onKeyDown} className="login">
            <input
              className="username"
              value={this.state.username}
              placeholder="Username"
              onChange={e => this.setState({ username: e.target.value })}
            />
            <input
              className="password"
              value={this.state.password}
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </form>
          <Link to="/users/register">New user?</Link>
        </div>
      );
    }
  }
}
