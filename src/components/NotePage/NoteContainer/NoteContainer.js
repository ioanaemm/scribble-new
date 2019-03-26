import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import * as Api from "Api/Api";

import Button from "components/Common/Button/Button";
import "components/NotePage/NoteContainer/NoteContainer.scss";
export class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      error: null,
      title: "",
      isInput: false,
      body: "",
      notebook: null,
      isSaving: false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.saveNoteDetails = this.saveNoteDetails.bind(this);
    this.retrieveNotebook = this.retrieveNotebook.bind(this);
    this.displayNotebookTitle = this.displayNotebookTitle.bind(this);
    this.displayNotesInNotebook = this.displayNotesInNotebook.bind(this);
    this.displayUpdatedTitle = this.displayUpdatedTitle.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
  }

  componentDidMount() {
    Api.fetchNote(this.props.match.params.id).then(
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

    // console.log("this.state.notebookId", this.state.notebookId);
  }

  retrieveNotebook(notebookId) {
    Api.fetchNotebook(notebookId).then(response => {
      console.log("response.data", response.data);
      this.setState({
        notebook: response.data
      });
    });
  }

  displayNotebookTitle() {
    if (!this.state.notebook) {
      return null;
    }

    return <span>{this.state.notebook.title}</span>;
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

  saveInputValue(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }

  displayUpdatedTitle() {
    // return <h3 className="title">{this.state.title}</h3>;
    if (this.state.isInput) {
      return (
        <>
          <input
            type="text"
            value={this.state.title}
            onChange={this.saveInputValue}
          />
          <Button type="primary" label="Save" onClick={this.saveNoteDetails} />
        </>
      );
    } else {
      return (
        <>
          <h3
            className="title"
            onClick={() => this.setState({ isInput: true })}
          >
            {this.state.title}
          </h3>
        </>
      );
    }
  }

  render() {
    if (this.state.pending) {
      return <p>Loading...</p>;
    }

    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }

    return (
      <div className="note-container">
        <div className="note-list-container">
          <h3 className="note-list-container-title">
            {this.displayNotebookTitle()} Notebook
          </h3>
          <div className="notelist-divider" />
          {this.displayNotesInNotebook()}
        </div>
        <div className="note-content">
          <p className="notebook-title">
            Notebook: {this.displayNotebookTitle()}
          </p>
          <div className="note-header">
            {this.displayUpdatedTitle()}
            <div className="btn-container">
              <Button
                type="secondary"
                label="Share"
                onClick={this.saveNoteDetails}
              />
              <Button
                type="primary"
                label={this.state.isSaving ? "Saving..." : "Save"}
                className={`save-note ${
                  this.state.isSaving ? "is-saving" : "is-not-saving"
                }`}
                onClick={this.saveNoteDetails}
              />
            </div>
          </div>
          <div className="note-editor">
            <Editor
              value={this.state.body}
              onEditorChange={this.handleEditorChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(NoteContainer);
