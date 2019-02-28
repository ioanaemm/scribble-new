import React, { Component } from "react";
import * as Api from "Api/Api";
import { Link } from "react-router-dom";

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
      console.log("notes: ", response.data);
      this.setState({ pending: false, notes: response.data });
    });
  }
  displayNoteList() {
    if (this.state.pending) {
      return <p>Loading...</p>;
    }
    let noteList = this.state.notes.map(note => {
      return (
        <li key={note._id}>
          <Link to={`notes/${note._id}`}>{note.title}</Link>
        </li>
      );
    });
    return <ul>{noteList}</ul>;
  }

  render() {
    return <div>{this.displayNoteList()}</div>;
  }
}
