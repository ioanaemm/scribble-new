import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "api/Api";
import { Link } from "react-router-dom";

import Preloader from "components/Common/Preloader/Preloader";
import "./VerifyAccount.scss";

export class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      pending: true
    };
  }

  componentDidMount() {
    Api.verifyAccount(this.props.match.params.chunk).then(
      response => {
        this.setState({
          success: true,
          pending: false
        });
      },
      error => {
        console.log("error", error);
      }
    );
  }

  render() {
    if (this.state.pending) {
      return <Preloader />;
    }
    return (
      <div className="verify-account">
        <h3 className="title">Hi {this.props.match.params.username}</h3>
        <p className="content">Your account has been activated!</p>
        <button className="verify">
          <Link to="/login">Log in </Link>
        </button>
      </div>
    );
  }
}

export default withRouter(VerifyAccount);
