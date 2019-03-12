import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import * as Api from "Api/Api";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // componentDidMount() {
  //   Api.fetchUserDetails().then(
  //     response => {
  //       this.setState({ userData: response.data, pending: false });
  //     },
  //     error => {
  //       this.setState({ pending: false });
  //     }
  //   );
  // }

  onKeyDown(e) {
    console.log("onFormSubmit()");
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
        <form onKeyDown={this.onKeyDown}>
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
