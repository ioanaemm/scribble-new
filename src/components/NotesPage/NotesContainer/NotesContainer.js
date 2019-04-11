import React, { Component } from "react";
import * as Api from "api/Api";
import { Link } from "react-router-dom";

import NoteList from "components/Common/NoteList/NoteList";
import Preloader from "components/Common/Preloader/Preloader";

import "./NotesContainer.scss";

export default class NotesContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      notes: null
    };
  }

  componentDidMount() {
    Api.fetchNotes({}).then(response => {
      this.setState({ pending: false, notes: response.data });
    });
  }
  displayNoteList() {
    if (this.state.pending) {
      return <Preloader />;
    }

    return <NoteList notes={this.state.notes} />;
  }

  render() {
    return (
      <div className="notes-container">
        <h1 className="title">All notes</h1>
        {this.displayNoteList()}
      </div>
    );
  }
}
