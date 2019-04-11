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
      <Link className="note-item-container" to={`/notes/${note._id}`}>
        <div className={`note-item note-item-${note._id}`}>
          <p className="note-timestamp">
            Created on: <span className="timestamp">{timestamp}</span>
          </p>
          <span className="note-title">{note.title}</span>
          <div
            className="note-content"
            dangerouslySetInnerHTML={{ __html: note.body }}
          />
        </div>
      </Link>
    );
  }
}
