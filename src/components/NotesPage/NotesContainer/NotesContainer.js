import React, { Component } from "react";
import * as Api from "api/Api";
import { Link } from "react-router-dom";

import Preloader from "components/Common/Preloader/Preloader";

export default class NotesContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      notes: null
    };
  }

  componentDidMount() {
    Api.fetchNotes().then(response => {
      this.setState({ pending: false, notes: response.data });
    });
  }
  displayNoteList() {
    if (this.state.pending) {
      return <Preloader />;
    }

    let noteList = this.state.notes.map(note => {
      return (
        <li className="note-item" key={note._id}>
          <Link className="note-link" to={`notes/${note._id}`}>
            {note.title}
          </Link>
        </li>
      );
    });
    return <ul className="note-list">{noteList}</ul>;
  }

  render() {
    return <div>{this.displayNoteList()}</div>;
  }
}
