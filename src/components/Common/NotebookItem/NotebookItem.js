import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "components/Common/Button/Button";
import Title from "components/Common/Title/Title.js";

export default class NotebookItem extends Component {
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

  render() {
    const { notebook } = this.props;
    return (
      <Link
        className="notebook-item-container"
        to={`/notebooks/${notebook._id}`}
      >
        <div className={`notebook-item notebook-item-${notebook._id}`}>
          <button
            className="delete"
            onClick={() => this.props.removeNotebook(notebook._id)}
          >
            <i className="fa fa-trash-alt" />
          </button>
          <p className="notebook-total">
            Notes in Notebook:{" "}
            <span className="notebook-count">{notebook.noteCount}</span>
          </p>
          <span className="notebook-title">{notebook.title}</span>
          {this.displayTags(notebook)}
        </div>
      </Link>
    );
  }
}
