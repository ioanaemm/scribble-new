import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./NoteItem.scss";

export default class NoteItem extends Component {
  render() {
    const { note } = this.props;

    let timestamp = parseInt(note._id.substring(0, 8), 16) * 1000;
    let date = moment(timestamp).format("Do MMMM YYYY");
    let hours = moment(timestamp).format("hh:mm A");

    return (
      <Link
        className="note-item-container"
        to={`/notes/${note._id}`}
        key={note._id}
      >
        <li className={`note-item note-item-${note._id}`}>
          <i className="arrow-icon fa fa-angle-right fa-lg" />
          <p className="note-title">{note.title}</p>

          <p className="created-on">
            Created on:
            <span className="date">
              {date}, {hours}
            </span>
          </p>
        </li>
      </Link>
    );
  }
}
