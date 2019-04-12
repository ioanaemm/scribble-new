import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserPopup from "components/UserPopup/UserPopup";
import "components/Sidebar/Sidebar.scss";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { showUserPopup: false };

    this.toggleUserPopup = this.toggleUserPopup.bind(this);
    this.displayUserPopup = this.displayUserPopup.bind(this);
    this.hideUserPopup = this.hideUserPopup.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.hideUserPopup);
    window.addEventListener("touchend", this.hideUserPopup);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.hideUserPopup);
    window.removeEventListener("touchend", this.hideUserPopup);
  }

  hideUserPopup() {
    setTimeout(() => {
      this.setState({ showUserPopup: false });
    }, 100);
  }

  toggleUserPopup(e) {
    if (e) {
      e.stopPropagation();
    }
    setTimeout(() => {
      this.setState({ showUserPopup: !this.state.showUserPopup });
    }, 300);
  }

  displayUserPopup() {
    if (!this.state.showUserPopup) {
      return null;
    }

    return <UserPopup />;
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
            <i
              className="icon fa fa-user-circle fa-lg"
              onClick={this.toggleUserPopup}
            />
            {this.displayUserPopup()}
          </div>
        </div>
        <div className="mobile-sidebar top">
          <i
            className="icon fa fa-user-circle fa-lg"
            onClick={this.toggleUserPopup}
          />
          <h3 className="title">
            <Link to={`/`}>Scribble</Link>
          </h3>
          <i />
          {this.displayUserPopup()}
        </div>
      </>
    );
  }
}
