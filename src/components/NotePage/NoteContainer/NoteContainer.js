import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import * as Api from "api/Api";
import Select from "react-select";

import Preloader from "components/Common/Preloader/Preloader";
import Button from "components/Common/Button/Button";
import "components/NotePage/NoteContainer/NoteContainer.scss";

export class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      error: null,
      title: "New note",
      isInput: false,
      body: "",
      notebook: null,
      isSaving: false,
      isNew: false,
      notebookList: null,
      notebookOptions: null,
      selectedNotebook: null
    };

    this.titleInputRef = React.createRef();

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.saveNoteDetails = this.saveNoteDetails.bind(this);
    this.retrieveNotebook = this.retrieveNotebook.bind(this);
    this.displayNotebookTitle = this.displayNotebookTitle.bind(this);
    this.displayNotesInNotebook = this.displayNotesInNotebook.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
    this.loadNoteData = this.loadNoteData.bind(this);
    this.displaySaveButton = this.displaySaveButton.bind(this);
    this.loadNotebookList = this.loadNotebookList.bind(this);
    this.handleNotebookChange = this.handleNotebookChange.bind(this);
    this.removeIsInput = this.removeIsInput.bind(this);
    this.makeIsInput = this.makeIsInput.bind(this);
    this.displayNoteList = this.displayNoteList.bind(this);
    this.displayNoteDetails = this.displayNoteDetails.bind(this);
    this.displaySidebarNotebookTitle = this.displaySidebarNotebookTitle.bind(
      this
    );
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id && id !== "new") {
      this.loadNoteData(id);
    } else {
      this.loadNotebookList();
      this.setState({ pending: false, isNew: true });
    }
    window.addEventListener("click", this.removeIsInput);
    window.addEventListener("touchend", this.removeIsInput);

    // console.log("this.state.notebookId", this.state.notebookId);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.removeIsInput);
    window.removeEventListener("touchend", this.removeIsInput);
  }

  removeIsInput() {
    this.setState({ isInput: false });
  }

  makeIsInput(e) {
    e.stopPropagation();
    this.setState({ isInput: true }, () => {
      this.titleInputRef.current.focus();
    });
  }

  loadNotebookList() {
    Api.fetchNotebooks({}).then(response => {
      console.log(response.data);
      const notebookOptions = response.data.map(notebook => {
        return {
          value: notebook._id,
          label: notebook.title
        };
      });
      const selectedNotebook = notebookOptions[0];
      this.setState({
        notebookList: response.data,
        notebookOptions,
        selectedNotebook
      });
    });
  }

  loadNoteData(noteId) {
    Api.fetchNote(noteId).then(
      response => {
        console.log("response.data.notebookId", response.data);
        this.retrieveNotebook(response.data.notebookId);
        this.setState({
          pending: false,
          title: response.data.title,
          body: response.data.body || ""
        });
      },
      error => {
        console.log(error.response.data);
        this.setState({ error: error.response.data, pending: false });
      }
    );
  }

  retrieveNotebook(notebookId) {
    return Api.fetchNotebook(notebookId).then(response => {
      console.log("response.data", response.data);
      this.setState({
        notebook: response.data
      });
    });
  }

  handleNotebookChange(selectedNotebook) {
    this.setState({ selectedNotebook });
  }

  displaySidebarNotebookTitle() {
    if (
      this.state.isNew ||
      !this.state.notebook ||
      !this.state.notebook.title
    ) {
      return null;
    }
    return <span>{this.state.notebook.title}:</span>;
  }

  displayNotebookTitle() {
    if (this.state.isNew) {
      if (!this.state.notebookList) {
        return null;
      }

      return (
        <Select
          className="notebook-select"
          value={this.state.selectedNotebook}
          onChange={this.handleNotebookChange}
          options={this.state.notebookOptions}
        />
      );
    } else {
      if (!this.state.notebook) {
        return null;
      }
      return <span>{this.state.notebook.title}:</span>;
    }
  }

  displayNotesInNotebook() {
    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }

    let crtNoteId = this.props.match.params.id;

    let notes = this.state.notebook.notes.map(note => {
      if (crtNoteId === note._id) {
        return null;
      }

      return (
        <div className="note-list-content" key={note._id}>
          <h5 className="note-list-title">{note.title}</h5>
          <p
            className="note-list-body"
            dangerouslySetInnerHTML={{ __html: note.body }}
          />
        </div>
      );
    });
    return notes;
  }

  handleEditorChange(body) {
    this.setState({
      body: body
    });
  }

  saveNoteDetails() {
    this.setState({ isSaving: true });

    if (this.state.isNew) {
      const noteData = {
        title: this.state.title,
        body: this.state.body,
        notebookId: this.state.selectedNotebook.value
      };
      Api.addNote(noteData).then(response => {
        this.retrieveNotebook(response.data.notebookId).then(() => {
          this.setState({ isNew: false }, () => {
            this.props.history.push(`/notes/${response.data._id}`);
          });
        });
      });
    } else {
      setTimeout(() => {
        Api.patchNoteContent(this.props.match.params.id, {
          title: this.state.title,
          body: this.state.body
        }).then(
          response => {
            this.setState({
              title: response.data.title,
              isInput: false,
              isSaving: false
            });
          },
          error => {
            this.setState({
              error: error.response.data,
              isSaving: false
            });
          }
        );
      }, 500);
    }
  }

  saveInputValue(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  displayTitle() {
    if (this.state.isInput) {
      return (
        <>
          <input
            className="input-title"
            type="text"
            ref={this.titleInputRef}
            value={this.state.title}
            onChange={this.saveInputValue}
            onClick={e => e.stopPropagation}
          />
        </>
      );
    } else {
      return (
        <>
          <h3 className="note-title" onClick={this.makeIsInput}>
            {this.state.title}
          </h3>
        </>
      );
    }
  }

  displaySaveButton() {
    return (
      <div className="save-button-container">
        <Button
          type="primary"
          label={this.state.isSaving ? "Saving..." : "Save"}
          className={`save-note ${
            this.state.isSaving ? "is-saving" : "is-not-saving"
          }`}
          onClick={this.saveNoteDetails}
        />
      </div>
    );
  }

  displayNoteList() {
    if (this.state.isNew) {
      return null;
    }
    return (
      <div className="note-list-container">
        <h3 className="note-list-container-title">
          {this.displaySidebarNotebookTitle()}
        </h3>
        <div className="notelist-divider" />
        {this.displayNotesInNotebook()}
      </div>
    );
  }

  displayNoteDetails() {
    return (
      <div className="note-details">
        {this.displaySaveButton()}
        <div className="notebook-title">
          Notebook: {this.displayNotebookTitle()}
        </div>
        <div className="note-header">{this.displayTitle()}</div>
        <div className="note-editor">
          <Editor
            value={this.state.body}
            onEditorChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.pending) {
      return <Preloader />;
    }

    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }

    return (
      <div className="note-container">
        <div className="note-content">
          {this.displayNoteDetails()}
          {this.displayNoteList()}
        </div>
      </div>
    );
  }
}
export default withRouter(NoteContainer);
