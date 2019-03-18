import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import moment from "moment";

import "components/Common/NotebookList/NotebookList.scss";

export default class NoteList extends Component {
  constructor() {
    super();

    this.displayNotes = this.displayNotes.bind(this);
  }

  displayNotes() {
    if (!this.props.notes) {
      return null;
    }
    let noteList = this.props.notes.map(note => {
      let timestamp = moment(
        new Date(parseInt(note._id.substring(0, 8), 16) * 1000)
      ).format("Do MMMM YYYY");

      return (
        <div className={`note-item note-item-${note._id}`} key={note._id}>
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
    });

    return <>{noteList}</>;
  }

  render() {
    return (
      <Masonry className="my-gallery-class note-list">
        {this.displayNotes()}
      </Masonry>
    );
  }
}
