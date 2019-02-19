import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import * as Api from "Api/Api";
import * as ApiConnector from "Api/Api";

import Button from "components/Common/Button/Button";
export class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      pending: true,
      error: null,
      title: "",
      body: ""
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.editContent = this.editContent.bind(this);
  }

  componentDidMount() {
    console.log("this.state", this.state);
    Api.fetchNote(this.props.match.params.id).then(
      response => {
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
      <div className="noteContainer">
        <h3>{this.state.title}</h3>
        <Button label="Save" onClick={this.editContent} />
        <Editor
          value={this.state.body}
          onEditorChange={this.handleEditorChange}
        />
      </div>
    );
  }
}
export default withRouter(NoteContainer);
