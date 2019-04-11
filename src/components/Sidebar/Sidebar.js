import React, { Component } from "react";
import { Link } from "react-router-dom";
import "components/Sidebar/Sidebar.scss";

export default class Sidebar extends Component {
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
            <Link to="/notes/new">
              <i className="icon fa fa-plus-circle fa-lg" />
            </Link>
          </div>
        </div>
        <div className="mobile-sidebar top">
          <i className="icon fa fa-user-circle fa-lg" />
          <h3 className="title">
            <Link to={`/`}>Scribble</Link>
          </h3>
          <Link to="/notes/new">
            <i className="icon fa fa-plus-circle fa-lg" />
          </Link>
        </div>
      </>
    );
  }
}
