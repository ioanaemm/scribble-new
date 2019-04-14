import React, { Component } from "react";
import { Link } from "react-router-dom";
import "components/Sidebar/Sidebar.scss";

export default class BottomSidebar extends Component {
  render() {
    return (
      <div className="mobile-sidebar bottom">
        <Link className="notebook section" to="/notebooks">
          <i className="icon fa fa-book" />
          <p>Notebooks</p>
        </Link>

        <Link to="/newnote" className="plus-button-container">
          <i className="icon fa fa-plus-circle fa-lg" />
        </Link>

        <Link className="note section" to="/notes">
          <i className="icon fa fa-sticky-note" />
          <p>Notes</p>
        </Link>
      </div>
    );
  }
}
