import React, { Component } from "react";

import * as Api from "api/Api";
import Button from "components/Common/Button/Button";
import { Link } from "react-router-dom";

import "./UserPopup.scss";

export default class UserPopup extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    Api.signOutUser().then(() => {
      window.location.href = "/login";
    });
  }

  render() {
    return (
      <aside className="user-popup-container">
        <ul className="user-popup">
          <li>
            <Link to="/account">
              <Button>
                <i className="fa fa-user" />
                My Account
              </Button>
            </Link>
          </li>
          <li>
            <Button onClick={this.onLogout}>
              <i className="fa fa-sign-out-alt" />
              Log out
            </Button>
          </li>
        </ul>
      </aside>
    );
  }
}
