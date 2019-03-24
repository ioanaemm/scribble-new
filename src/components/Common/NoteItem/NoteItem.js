import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class NoteItem extends Component {
  render() {
    const { note } = this.props;
    let timestamp = moment(
      new Date(parseInt(note._id.substring(0, 8), 16) * 1000)
    ).format("Do MMMM YYYY");

    return (
      <div className={`note-item note-item-${note._id}`}>
        <p className="note-timestamp">Created on: {timestamp}</p>
        <span className="note-title">
          <Link to={`/notes/${note._id}`}>{note.title}</Link>
        </span>
        <div
          className="note-content"
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </div>
    );
  }
}
