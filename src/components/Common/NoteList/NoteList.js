import React, { Component } from "react";

import NoteItem from "components/Common/NoteItem/NoteItem";

import "./NoteList.scss";

export default class NoteList extends Component {
  constructor() {
    super();

    this.displayNotes = this.displayNotes.bind(this);
  }

  displayNotes() {
    if (!this.props.notes) {
      return null;
    }
    if (this.props.notes.length === 0) {
      return <p className="message-no-results">No notes found</p>;
    }
    return this.props.notes.map(note => {
      return <NoteItem key={note._id} note={note} />;
    });
  }

  render() {
    return <div className="note-list">{this.displayNotes()}</div>;
  }
}
