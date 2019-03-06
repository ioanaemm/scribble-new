import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import * as Api from "Api/Api";
import * as ApiConnector from "Api/Api";

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
      notebookId: ""
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.editContent = this.editContent.bind(this);
    this.retrieveNotebook = this.retrieveNotebook.bind(this);
    this.displayNotebookTitle = this.displayNotebookTitle.bind(this);
  }

  componentDidMount() {
    console.log("this.state", this.state);
    Api.fetchNote(this.props.match.params.id).then(
      // debugger();
      response => {
        console.log("response.data.notebookId", response.data.notebookId);
        this.setState({
          pending: false,
          title: response.data.title,
          body: response.data.body || "",
          notebookId: response.data.notebookId,
          notebook: null
        });
      },
      error => {
        console.log(error.response.data);
        this.setState({ error: error.response.data, pending: false });
      }
    );
    this.retrieveNotebook();
    console.log("this.state.notebookId", this.state.notebookId);
  }

  retrieveNotebook() {
    Api.fetchNotebook(this.state.notebookId).then(response => {
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
    let notebookTitle = this.state.notebook.map(notebook => {
      return <span key={notebook._id}>{notebook.title}</span>;
    });

    return notebookTitle;
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
        <div className="note-list">Welcome Notebook</div>
        <div className="note-content">
          <p class="notebook-title">Notebook: {this.displayNotebookTitle()}</p>
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
