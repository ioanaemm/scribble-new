import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "components/Common/Button/Button";
import Title from "components/Common/Title/Title.js";

import "./NotebookItem.scss";

export class NotebookItem extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onContainerClick = this.onContainerClick.bind(this);
  }

  displayTags(notebook) {
    if (!notebook.tags) {
      return null;
    }
    return (
      <div className="tags-container">
        <Title content="Tags" />
        <Button className="tags" type="secondary" label={notebook.tags} />
      </div>
    );
  }

  onDeleteClick(e) {
    e.stopPropagation();
    this.props.removeNotebook(this.props.notebook._id);
  }

  onContainerClick() {
    this.props.history.push(`/notebooks/${this.props.notebook._id}`);
  }

  render() {
    const { notebook } = this.props;
    return (
      <div className="notebook-item-container" onClick={this.onContainerClick}>
        <div className={`notebook-item notebook-item-${notebook._id}`}>
          <button className="delete" onClick={this.onDeleteClick}>
            <i className="fa fa-trash-alt" />
          </button>
          <p className="notebook-total">
            Notes in Notebook:{" "}
            <span className="notebook-count">{notebook.noteCount}</span>
          </p>
          <span className="notebook-title">{notebook.title}</span>
          {this.displayTags(notebook)}
        </div>
      </div>
    );
  }
}

export default withRouter(NotebookItem);
