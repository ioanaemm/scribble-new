import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    let noteList = this.props.notes.map(item => {
      return (
        <div className="note-item" key={item._id}>
          <span className="notebook-title">
            <Link to={`/notes/${item._id}`}>{item.title}</Link>
          </span>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </div>
      );
    });

    return <>{noteList}</>;
  }

  render() {
    return <div className="note-list">{this.displayNotes()}</div>;
  }
}
