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
  }

  componentDidMount() {
    console.log("this.state", this.state);
    Api.fetchNote(this.props.match.params.id).then(
      // debugger();
      response => {
        console.log("response.data.notebookId", response.data);
        this.setState({
          pending: false,
          title: response.data.title,
          body: response.data.body || "",
          notebookId: response.data.notebookId
        });
      },
      error => {
        console.log(error.response.data);
        this.setState({ error: error.response.data, pending: false });
      }
    );
    console.log("this.state", this.state);

    // Api.fetchNotebook(this.props.match.params.id).then(response => {
    //   console.log(response.data);
    // });
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
