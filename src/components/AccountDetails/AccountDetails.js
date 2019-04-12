import React, { Component } from "react";

import * as Api from "api/Api";

import Preloader from "components/Common/Preloader/Preloader";
import "./AccountDetails.scss";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      userData: null
    };

    this.displayUserDetails = this.displayUserDetails.bind(this);
  }

  componentDidMount() {
    this.displayUserDetails();
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
        <p className="email-address">Your email: {this.state.userData.email}</p>
      </div>
    );
  }
}
