import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
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
    noteData.notebookId = this.state.notebook._id;
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
    this.toggleModal();
  }

  displayNotes() {
    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }
    let notes = this.state.notebook.notes.map(note => {
      return (
        <li key={note._id}>
          <Link to={`/notes/${note._id}`}>{note.title} </Link>
        </li>
      );
    });
    return <ul>{notes}</ul>;
  }

  renderModal() {
    let modal = null;
    if (this.state.isOpen) {
      modal = (
        <NoteModal onClose={this.toggleModal} onSubmit={this.onModalSubmit} />
      );
    }
    return modal;
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
        <Button onClick={this.toggleModal} label="New Note" />
        {this.renderModal()}
        {this.displayNotes()}
      </div>
    );
  }
}

export default withRouter(Notebook);
