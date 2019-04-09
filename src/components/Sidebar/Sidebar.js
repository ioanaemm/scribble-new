import React, { Component } from "react";
import { Link } from "react-router-dom";
import "components/Sidebar/Sidebar.scss";

import notebook from "icons/notebook.png";
import note from "icons/note.png";
import clipboard from "icons/clipboard.png";
import plus from "icons/plus.png";
import user from "icons/user.png";

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
              <img className="icon" src={notebook} alt="notebook" />
            </Link>
            <Link className="note-icon" to="/notes">
              <img className="icon" src={note} alt="note" />
            </Link>
            <img className="icon" src={clipboard} alt="clipboard" />
            <img className="icon" src={plus} alt="plus sign" />
          </div>
        </div>
        <div className="mobile-sidebar top">
          <i className="icon fa fa-user-circle fa-lg" />
          <h3 className="title">
            <Link to={`/`}>Scribble</Link>
          </h3>
          <i className="icon fa fa-plus-circle fa-lg" />
        </div>
      </>
    );
  }
}
