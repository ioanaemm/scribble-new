import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import * as Api from "api/Api";
import * as ApiConnector from "api/Api";

import Button from "components/Common/Button/Button";
import "components/NotePage/NoteContainer/NoteContainer.scss";
export class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      error: null,
      title: "",
      body: "",
      notebook: null
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.editContent = this.editContent.bind(this);
    this.retrieveNotebook = this.retrieveNotebook.bind(this);
    this.displayNotebookTitle = this.displayNotebookTitle.bind(this);
    this.displayNotesInNotebook = this.displayNotesInNotebook.bind(this);
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

  editContent() {
    ApiConnector.patchNoteContent(this.props.match.params.id, {
      body: this.state.body
    }).then(
      response => {},
      error => {
        this.setState({
          error: error.response.data
        });
      }
    );
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
            <h3 className="title">{this.state.title}</h3>
            <div className="btn-container">
              <Button
                type="secondary"
                label="Share"
                onClick={this.editContent}
              />
              <Button type="primary" label="Save" onClick={this.editContent} />
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
