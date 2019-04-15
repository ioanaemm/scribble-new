import React, { Component } from "react";
import Title from "components/Common/Title/Title";

import "./NotebookModal.scss";

export default class NotebookModal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      tags: ""
    };

    this.titleInputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.titleInputRef.current) {
      this.titleInputRef.current.focus();
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit({ title: this.state.title, tags: this.state.tags });
    this.setState({
      title: "",
      tags: ""
    });
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal modal-notebook form-container">
          <Title content="Add a new notebook" />
          <form onSubmit={this.onSubmit} className="body">
            <button className="close-btn" onClick={this.props.onClose}>
              <i className="fa fa-times icon" />
            </button>

            <div className="input-group">
              <input
                ref={this.titleInputRef}
                className="new-notebook-title"
                value={this.state.title}
                placeholder=" "
                onChange={e => this.setState({ title: e.target.value })}
              />
              <span className="label"> Title</span>
              <span className="border" />
            </div>

            <div className="input-group">
              <input
                className="new-notebook-tags"
                value={this.state.tags}
                placeholder=" "
                onChange={e => this.setState({ tags: e.target.value })}
              />
              <span className="label"> Tags</span>
              <span className="border" />
            </div>

            <div className="footer">
              <button className="newnotebook-btn" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
        <div className="modal-overlay" />
      </div>
    );
  }
}
