import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as Api from "api/Api";
import "components/Sidebar/Sidebar.scss";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.displayPlusButton = this.displayPlusButton.bind(this);
  }

  onLogout() {
    Api.signOutUser().then(() => {
      window.location.href = "/login";
    });
  }

  displayPlusButton() {
    // if (window.location.href.includes("/notes/")) {
    return <i />;
    // }
  }

  render() {
    return (
      <>
        <div className="sidebar">
          <h1 className="title">
            <Link to={`/`}>S</Link>
          </h1>
          <div className="icon-container">
            <Link className="notebook-icon" to="/notebooks">
              <i className="icon fa fa-book fa-lg" />
            </Link>
            <Link className="note-icon" to="/notes">
              <i className="icon fa fa-sticky-note fa-lg" />
            </Link>
            <i className="icon fa fa-clipboard fa-lg" />
            {this.displayPlusButton()}
          </div>
        </div>
        <div className="mobile-sidebar top">
          <i className="icon fa fa-user-circle fa-lg" onClick={this.onLogout} />
          <h3 className="title">
            <Link to={`/`}>Scribble</Link>
          </h3>
          {this.displayPlusButton()}
        </div>
      </>
    );
  }
}
