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
      <>
        <Title content="Tags" />
        <Button type="secondary" label={notebook.tags} />
      </>
    );
  }

  render() {
    const { notebook } = this.props;
    return (
      <div className={`notebook-item notebook-item-${notebook._id}`}>
        <p onClick={() => this.props.removeNotebook(notebook._id)}>Delete</p>
        <p className="notebook-total">
          Notes in Notebook:
          <span> {notebook.noteCount}</span>
        </p>
        <span className="notebook-title">
          <Link to={`/notebooks/${notebook._id}`}>{notebook.title}</Link>
        </span>
        {this.displayTags(notebook)}
      </div>
    );
  }
}
