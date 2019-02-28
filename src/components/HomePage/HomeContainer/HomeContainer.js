import React, { Component } from "react";
import Title from "components/Common/Title/Title";
import Button from "components/Common/Button/Button";
import NotebookModal from "components/Common/NotebookModal/NotebookModal";
import NoteModal from "components/Common/NoteModal/NoteModal.js";
import NotebookList from "components/Common/NotebookList/NotebookList";
import NoteList from "components/Common/NoteList/NoteList";
import * as ApiConnector from "Api/Api";
import "components/HomePage/HomeContainer/HomeContainer.scss";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNotebookModalOpen: false,
      isNoteModalOpen: false,
      notebooks: [],
      notes: []
    };

    this.toggleNotebookModal = this.toggleNotebookModal.bind(this);
    this.toggleNoteModal = this.toggleNoteModal.bind(this);
    this.onNotebookModalSubmit = this.onNotebookModalSubmit.bind(this);
    this.onNoteModalSubmit = this.onNoteModalSubmit.bind(this);
  }

  componentDidMount() {
    ApiConnector.fetchNotebooks().then(response => {
      this.setState({ notebooks: response.data });
    });

    ApiConnector.fetchNotes().then(response => {
      this.setState({ notes: response.data });
    });
  }

  toggleNotebookModal() {
    this.setState({ isNotebookModalOpen: !this.state.isNotebookModalOpen });
  }

  toggleNoteModal() {
    this.setState({ isNoteModalOpen: !this.state.isNoteModalOpen });
  }

  onNotebookModalSubmit(notebookData) {
    ApiConnector.addNotebook(notebookData).then(response => {
      this.setState({
        notebooks: [...this.state.notebooks, response.data]
      });
    });
    this.toggleNotebookModal();
  }

  onNoteModalSubmit(noteData) {
    ApiConnector.addNote(noteData).then(response => {
      this.setState({
        notes: [...this.state.notes, response.data]
      });
    });

    this.toggleNoteModal();
  }

  renderNotebookModal() {
    let notebookModal = null;
    if (this.state.isNotebookModalOpen) {
      notebookModal = (
        <NotebookModal
          onClose={this.toggleNotebookModal}
          onSubmit={this.onNotebookModalSubmit}
        />
      );
    }
    return notebookModal;
  }

  renderNoteModal() {
    let noteModal = null;
    if (this.state.isNoteModalOpen) {
      noteModal = (
        <NoteModal
          onClose={this.toggleNoteModal}
          onSubmit={this.onNoteModalSubmit}
        />
      );
    }
    return noteModal;
  }

  render() {
    return (
      <>
        <div className="add-item-container">
          <Title content="Notebooks" />
          <Button
            type="primary"
            onClick={this.toggleNotebookModal}
            label="New Notebook"
          />
          {this.renderNotebookModal()}
        </div>
        <NotebookList notebooks={this.state.notebooks} />
        <div className="add-item-container">
          <Title content="Notes" />
          <Button
            type="primary"
            onClick={this.toggleNoteModal}
            label="New Note"
          />
          {this.renderNoteModal()}
        </div>
        <NoteList notes={this.state.notes} />
      </>
    );
  }
}
