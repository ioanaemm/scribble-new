import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import * as Api from "Api/Api";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userData: null,
      pending: true
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    Api.fetchUserDetails().then(
      response => {
        this.setState({ userData: response.data, pending: false });
      },
      error => {
        this.setState({ pending: false });
      }
    );
  }

  onFormSubmit(e) {
    console.log("onFormSubmit()");

    if (e.keyCode === "Enter") {
      e.preventDefault();
      Api.signInUser(this.state).then(
        response => {
          this.setState({
            userData: response.data
          });
        },
        error => {
          console.log("status: ", error.response.status);
        }
      );
    }
  }

  render() {
    if (this.state.pending) {
      return <p>Loading...</p>;
    }
    if (!this.state.userData) {
      return (
        <form onKeyDown={this.onFormSubmit}>
          <input
            password="username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            password="password"
            value={this.state.password}
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </form>
      );
    }
  }
}
