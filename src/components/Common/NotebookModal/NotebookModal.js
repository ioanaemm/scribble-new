import React, { Component } from "react";
import "components/Common/NotebookModal/NotebookModal.scss";
import Button from "components/Common/Button/Button";
import Title from "components/Common/Title/Title";

import closebutton from "icons/close.png";

export default class NotebookModal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      tags: ""
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.onSubmit({ title: this.state.title, tags: this.state.tags });
    this.setState({
      title: "",
      tags: ""
    });
  }

  render() {
    return (
      <div className="backdrop">
        <div className="modal">
          <Title content="Add a new notebook" />
          <div className="body">
            <button className="close-btn" onClick={this.props.onClose}>
              <img className="icon" src={closebutton} alt="close" />
            </button>
            <label>Title</label>
            <input
              className="new-notebook-title"
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
            <label>Tags</label>
            <input
              className="new-notebook-tags"
              type="text"
              value={this.state.tags}
              onChange={e => this.setState({ tags: e.target.value })}
            />
          </div>
          <div className="footer">
            <Button
              className="newnotebook-btn"
              type="primary"
              onClick={this.submit}
              label="Submit"
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="modal-overlay" />
      </div>
    );
  }
}
