import React, { Component } from "react";

import * as Api from "api/Api";

import Preloader from "components/Common/Preloader/Preloader";
import Button from "components/Common/Button/Button";
import "./AccountDetails.scss";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      userData: null
    };

    this.displayUserDetails = this.displayUserDetails.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    this.displayUserDetails();
  }

  onLogout(e) {
    e.stopPropagation();
    Api.signOutUser().then(() => {
      window.location.href = "/login";
    });
  }

  displayUserDetails() {
    Api.fetchUserDetails().then(
      response => {
        this.setState({ userData: response.data, pending: false });
      },
      error => {
        this.setState({ pending: false });
      }
    );
  }

  render() {
    if (this.state.pending) {
      return <Preloader />;
    }
    return (
      <div className="account-details">
        <i className="icon fa fa-user-circle fa-4x" />
        <h3 className="title">Hi there, {this.state.userData.username}</h3>
        <p className="email-address">
          Your email is: {this.state.userData.email}
        </p>
        <Button type="primary" label="Log out" onClick={this.onLogout} />
      </div>
    );
  }
}
