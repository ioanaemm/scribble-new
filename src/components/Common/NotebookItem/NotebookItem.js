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
      <div className={`notebook-item notebook-item-${notebook._id}`}>
        <button
          className="delete"
          onClick={() => this.props.removeNotebook(notebook._id)}
        >
          Delete
        </button>
        <p className="notebook-total">
          Notes in Notebook:{" "}
          <span className="notebook-count">{notebook.noteCount}</span>
        </p>
        <span className="notebook-title">
          <Link
            className="notebook-link-title"
            to={`/notebooks/${notebook._id}`}
          >
            {notebook.title}
          </Link>
        </span>
        {this.displayTags(notebook)}
      </div>
    );
  }
}
