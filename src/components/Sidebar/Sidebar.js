import React, { Component } from "react";
import { Link } from "react-router-dom";
import "components/Sidebar/Sidebar.scss";

import notebook from "icons/notebook.png";
import note from "icons/note.png";
import clipboard from "icons/clipboard.png";
import plus from "icons/plus.png";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h1 className="sidebarTitle">
          <Link to={`/`}>S</Link>
        </h1>
        <div className="iconContainer">
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
    );
  }
}
