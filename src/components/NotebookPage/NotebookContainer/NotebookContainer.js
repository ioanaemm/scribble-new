import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "Api/Api";
import * as ApiConnector from "Api/Api";

import Button from "components/Common/Button/Button";
import NoteModal from "components/Common/NoteModal/NoteModal";

export class Notebook extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      notebook: null,
      pending: true,
      error: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.displayNotes = this.displayNotes.bind(this);
  }
  componentDidMount() {
    Api.fetchNotebook(this.props.match.params.id).then(
      response => {
        this.setState({
          pending: false,
          notebook: response.data
        });
      },
      () => {
        this.setState({ pending: false, error: true });
      }
    );
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onModalSubmit(noteData) {
    ApiConnector.addNote(noteData).then(response => {
      console.log("response.data", response.data);
      console.log("this.state.notebook.notes", this.state.notebook.notes);
      this.setState({
        notebook: {
          ...this.state.notebook,
          notes: [...this.state.notebook.notes, response.data]
        }
      });
    });
  }

  displayNotes() {
    let notes = this.state.notebook.notes.map((note, index) => {
      return <li key={index}>{note.title}</li>;
    });
    return notes;
  }

  render() {
    if (this.state.pending) {
      return <p>Loading...</p>;
    }
    if (this.state.error) {
      return <p>Notebook not found</p>;
    }

    return (
      <div>
        <h3>{this.state.notebook.title}</h3>
        <p>{this.state.notebook.tags}</p>
        <NoteModal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          onSubmit={this.onModalSubmit}
        />
        <Button onClick={this.toggleModal} label="New Note" />
        <ul>{this.displayNotes()}</ul>
      </div>
    );
  }
}

export default withRouter(Notebook);
